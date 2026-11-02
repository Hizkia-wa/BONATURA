package repository

import (
	"context"
	"database/sql"
	"fmt"

	"bonatura-backend/internal/domain"

	"github.com/google/uuid"
)

type DestinationRepository interface {
	GetDestinations(ctx context.Context, regency string, search string, limit, offset int) ([]domain.Destination, int, error)
	GetDestinationBySlug(ctx context.Context, slug string) (*domain.Destination, error)
	GetCulturalElementsByDestinationID(ctx context.Context, destinationID uuid.UUID) ([]domain.CulturalElementSimple, error)
	GetActivities(ctx context.Context, destinationSlug string, status domain.ActivityStatus, limit, offset int) ([]domain.Activity, int, error)
	GetActivityBySlug(ctx context.Context, slug string) (*domain.Activity, error)
	CreateDestination(ctx context.Context, d *domain.Destination) error
	CreateActivity(ctx context.Context, a *domain.Activity) error
}

type destinationRepository struct {
	db *sql.DB
}

func NewDestinationRepository(db *sql.DB) DestinationRepository {
	return &destinationRepository{db: db}
}

func (r *destinationRepository) GetDestinations(ctx context.Context, regency string, search string, limit, offset int) ([]domain.Destination, int, error) {
	baseQuery := `
		FROM destinations d
		WHERE d.publication_status = 'published'
	`
	args := []interface{}{}
	argIdx := 1

	if regency != "" {
		baseQuery += fmt.Sprintf(" AND d.regency ILIKE $%d", argIdx)
		args = append(args, "%"+regency+"%")
		argIdx++
	}

	if search != "" {
		baseQuery += fmt.Sprintf(" AND (d.name ILIKE $%d OR d.short_description ILIKE $%d OR d.village ILIKE $%d OR d.district ILIKE $%d)", argIdx, argIdx, argIdx, argIdx)
		args = append(args, "%"+search+"%")
		argIdx++
	}

	// Count total
	countQuery := "SELECT COUNT(*) " + baseQuery
	var total int
	if err := r.db.QueryRowContext(ctx, countQuery, args...).Scan(&total); err != nil {
		return nil, 0, err
	}

	selectQuery := `
		SELECT 
			d.id, d.name, d.slug, d.short_description, d.description, d.address,
			d.village, d.district, d.regency, d.province, d.latitude, d.longitude,
			d.opening_hours, d.ticket_price, d.cover_image_url, d.publication_status,
			d.created_by, d.created_at, d.updated_at
	` + baseQuery + fmt.Sprintf(" ORDER BY d.name ASC LIMIT $%d OFFSET $%d", argIdx, argIdx+1)

	args = append(args, limit, offset)

	rows, err := r.db.QueryContext(ctx, selectQuery, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var dests []domain.Destination
	for rows.Next() {
		var d domain.Destination
		err := rows.Scan(
			&d.ID, &d.Name, &d.Slug, &d.ShortDescription, &d.Description, &d.Address,
			&d.Village, &d.District, &d.Regency, &d.Province, &d.Latitude, &d.Longitude,
			&d.OpeningHours, &d.TicketPrice, &d.CoverImageURL, &d.PublicationStatus,
			&d.CreatedBy, &d.CreatedAt, &d.UpdatedAt,
		)
		if err != nil {
			return nil, 0, err
		}
		dests = append(dests, d)
	}

	return dests, total, nil
}

func (r *destinationRepository) GetDestinationBySlug(ctx context.Context, slug string) (*domain.Destination, error) {
	query := `
		SELECT 
			d.id, d.name, d.slug, d.short_description, d.description, d.address,
			d.village, d.district, d.regency, d.province, d.latitude, d.longitude,
			d.opening_hours, d.ticket_price, d.cover_image_url, d.publication_status,
			d.created_by, d.created_at, d.updated_at
		FROM destinations d
		WHERE d.slug = $1
	`
	var d domain.Destination
	err := r.db.QueryRowContext(ctx, query, slug).Scan(
		&d.ID, &d.Name, &d.Slug, &d.ShortDescription, &d.Description, &d.Address,
		&d.Village, &d.District, &d.Regency, &d.Province, &d.Latitude, &d.Longitude,
		&d.OpeningHours, &d.TicketPrice, &d.CoverImageURL, &d.PublicationStatus,
		&d.CreatedBy, &d.CreatedAt, &d.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	// Fetch cultural elements connected to destination
	elements, err := r.GetCulturalElementsByDestinationID(ctx, d.ID)
	if err == nil {
		d.CulturalElements = elements
	}

	// Fetch activities hosted at destination
	acts, _, err := r.GetActivities(ctx, d.Slug, domain.ActivityStatusPublished, 50, 0)
	if err == nil {
		d.Activities = acts
	}

	return &d, nil
}

func (r *destinationRepository) GetCulturalElementsByDestinationID(ctx context.Context, destinationID uuid.UUID) ([]domain.CulturalElementSimple, error) {
	query := `
		SELECT 
			ce.id, ce.name, ce.slug, ce.cover_image_url, cc.name, dce.relationship_note
		FROM destination_cultural_elements dce
		JOIN cultural_elements ce ON dce.cultural_element_id = ce.id
		JOIN cultural_categories cc ON ce.category_id = cc.id
		WHERE dce.destination_id = $1 AND ce.publication_status = 'published'
		ORDER BY ce.name ASC
	`
	rows, err := r.db.QueryContext(ctx, query, destinationID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var elements []domain.CulturalElementSimple
	for rows.Next() {
		var el domain.CulturalElementSimple
		err := rows.Scan(
			&el.ID, &el.Name, &el.Slug, &el.CoverImageURL, &el.CategoryName, &el.RelationshipNote,
		)
		if err != nil {
			return nil, err
		}
		elements = append(elements, el)
	}
	return elements, nil
}

func (r *destinationRepository) GetActivities(ctx context.Context, destinationSlug string, status domain.ActivityStatus, limit, offset int) ([]domain.Activity, int, error) {
	baseQuery := `
		FROM activities a
		JOIN destinations d ON a.destination_id = d.id
		LEFT JOIN communities c ON a.community_id = c.id
		WHERE 1=1
	`
	args := []interface{}{}
	argIdx := 1

	if status != "" {
		baseQuery += fmt.Sprintf(" AND a.status = $%d", argIdx)
		args = append(args, status)
		argIdx++
	} else {
		baseQuery += fmt.Sprintf(" AND a.status = 'published'")
	}

	if destinationSlug != "" {
		baseQuery += fmt.Sprintf(" AND d.slug = $%d", argIdx)
		args = append(args, destinationSlug)
		argIdx++
	}

	countQuery := "SELECT COUNT(*) " + baseQuery
	var total int
	if err := r.db.QueryRowContext(ctx, countQuery, args...).Scan(&total); err != nil {
		return nil, 0, err
	}

	selectQuery := `
		SELECT 
			a.id, a.destination_id, a.community_id, a.name, a.slug, a.description,
			a.activity_type, a.price, a.duration_minutes, a.schedule_info, a.contact,
			a.status, a.created_at, a.updated_at,
			d.name, c.name
	` + baseQuery + fmt.Sprintf(" ORDER BY a.name ASC LIMIT $%d OFFSET $%d", argIdx, argIdx+1)

	args = append(args, limit, offset)

	rows, err := r.db.QueryContext(ctx, selectQuery, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var activities []domain.Activity
	for rows.Next() {
		var a domain.Activity
		var destName sql.NullString
		var commName sql.NullString
		err := rows.Scan(
			&a.ID, &a.DestinationID, &a.CommunityID, &a.Name, &a.Slug, &a.Description,
			&a.ActivityType, &a.Price, &a.DurationMinutes, &a.ScheduleInfo, &a.Contact,
			&a.Status, &a.CreatedAt, &a.UpdatedAt,
			&destName, &commName,
		)
		if err != nil {
			return nil, 0, err
		}
		if destName.Valid {
			a.DestinationName = &destName.String
		}
		if commName.Valid {
			a.CommunityName = &commName.String
		}
		activities = append(activities, a)
	}

	return activities, total, nil
}

func (r *destinationRepository) GetActivityBySlug(ctx context.Context, slug string) (*domain.Activity, error) {
	query := `
		SELECT 
			a.id, a.destination_id, a.community_id, a.name, a.slug, a.description,
			a.activity_type, a.price, a.duration_minutes, a.schedule_info, a.contact,
			a.status, a.created_at, a.updated_at,
			d.name, c.name
		FROM activities a
		JOIN destinations d ON a.destination_id = d.id
		LEFT JOIN communities c ON a.community_id = c.id
		WHERE a.slug = $1
	`
	var a domain.Activity
	var destName sql.NullString
	var commName sql.NullString
	err := r.db.QueryRowContext(ctx, query, slug).Scan(
		&a.ID, &a.DestinationID, &a.CommunityID, &a.Name, &a.Slug, &a.Description,
		&a.ActivityType, &a.Price, &a.DurationMinutes, &a.ScheduleInfo, &a.Contact,
		&a.Status, &a.CreatedAt, &a.UpdatedAt,
		&destName, &commName,
	)
	if err != nil {
		return nil, err
	}
	if destName.Valid {
		a.DestinationName = &destName.String
	}
	if commName.Valid {
		a.CommunityName = &commName.String
	}
	return &a, nil
}

func (r *destinationRepository) CreateDestination(ctx context.Context, d *domain.Destination) error {
	query := `
		INSERT INTO destinations (
			name, slug, short_description, description, address, village, district,
			regency, province, latitude, longitude, opening_hours, ticket_price,
			cover_image_url, publication_status, created_by
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
		RETURNING id, created_at, updated_at
	`
	return r.db.QueryRowContext(
		ctx, query,
		d.Name, d.Slug, d.ShortDescription, d.Description, d.Address, d.Village, d.District,
		d.Regency, d.Province, d.Latitude, d.Longitude, d.OpeningHours, d.TicketPrice,
		d.CoverImageURL, d.PublicationStatus, d.CreatedBy,
	).Scan(&d.ID, &d.CreatedAt, &d.UpdatedAt)
}

func (r *destinationRepository) CreateActivity(ctx context.Context, a *domain.Activity) error {
	query := `
		INSERT INTO activities (
			destination_id, community_id, name, slug, description, activity_type,
			price, duration_minutes, schedule_info, contact, status
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
		RETURNING id, created_at, updated_at
	`
	return r.db.QueryRowContext(
		ctx, query,
		a.DestinationID, a.CommunityID, a.Name, a.Slug, a.Description, a.ActivityType,
		a.Price, a.DurationMinutes, a.ScheduleInfo, a.Contact, a.Status,
	).Scan(&a.ID, &a.CreatedAt, &a.UpdatedAt)
}
