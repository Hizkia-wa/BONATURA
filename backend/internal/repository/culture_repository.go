package repository

import (
	"context"
	"database/sql"
	"fmt"

	"bonatura-backend/internal/domain"

	"github.com/google/uuid"
)

type CultureRepository interface {
	GetCategories(ctx context.Context) ([]domain.CulturalCategory, error)
	GetCategoryBySlug(ctx context.Context, slug string) (*domain.CulturalCategory, error)
	GetElements(ctx context.Context, categorySlug string, search string, limit, offset int) ([]domain.CulturalElement, int, error)
	GetElementBySlug(ctx context.Context, slug string) (*domain.CulturalElement, error)
	GetCulturalGraph(ctx context.Context, elementID uuid.UUID) ([]domain.CulturalRelation, error)
	GetSourcesByElementID(ctx context.Context, elementID uuid.UUID) ([]domain.SourceWithNote, error)
	GetDestinationsByElementID(ctx context.Context, elementID uuid.UUID) ([]domain.DestinationSimple, error)
	CreateElement(ctx context.Context, elem *domain.CulturalElement) error
	UpdateVerificationStatus(ctx context.Context, id uuid.UUID, verifiedBy uuid.UUID, vStatus domain.VerificationStatus, pStatus domain.PublicationStatus) error
}

type cultureRepository struct {
	db *sql.DB
}

func NewCultureRepository(db *sql.DB) CultureRepository {
	return &cultureRepository{db: db}
}

func (r *cultureRepository) GetCategories(ctx context.Context) ([]domain.CulturalCategory, error) {
	query := `
		SELECT id, name, slug, description, icon_name, created_at
		FROM cultural_categories
		ORDER BY name ASC
	`
	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []domain.CulturalCategory
	for rows.Next() {
		var c domain.CulturalCategory
		if err := rows.Scan(&c.ID, &c.Name, &c.Slug, &c.Description, &c.IconName, &c.CreatedAt); err != nil {
			return nil, err
		}
		categories = append(categories, c)
	}
	return categories, nil
}

func (r *cultureRepository) GetCategoryBySlug(ctx context.Context, slug string) (*domain.CulturalCategory, error) {
	query := `
		SELECT id, name, slug, description, icon_name, created_at
		FROM cultural_categories
		WHERE slug = $1
	`
	var c domain.CulturalCategory
	err := r.db.QueryRowContext(ctx, query, slug).Scan(
		&c.ID, &c.Name, &c.Slug, &c.Description, &c.IconName, &c.CreatedAt,
	)
	if err != nil {
		return nil, err
	}
	return &c, nil
}

func (r *cultureRepository) GetElements(ctx context.Context, categorySlug string, search string, limit, offset int) ([]domain.CulturalElement, int, error) {
	baseQuery := `
		FROM cultural_elements ce
		JOIN cultural_categories cc ON ce.category_id = cc.id
		WHERE ce.publication_status = 'published'
	`
	args := []interface{}{}
	argIdx := 1

	if categorySlug != "" {
		baseQuery += fmt.Sprintf(" AND cc.slug = $%d", argIdx)
		args = append(args, categorySlug)
		argIdx++
	}

	if search != "" {
		baseQuery += fmt.Sprintf(" AND (ce.name ILIKE $%d OR ce.short_description ILIKE $%d OR ce.region ILIKE $%d)", argIdx, argIdx, argIdx)
		args = append(args, "%"+search+"%")
		argIdx++
	}

	// Count total
	countQuery := "SELECT COUNT(*) " + baseQuery
	var total int
	if err := r.db.QueryRowContext(ctx, countQuery, args...).Scan(&total); err != nil {
		return nil, 0, err
	}

	// Select rows
	selectQuery := `
		SELECT 
			ce.id, ce.category_id, ce.name, ce.slug, ce.short_description, 
			ce.description, ce.history, ce.philosophy, ce.cultural_context, 
			ce.region, ce.cover_image_url, ce.verification_status, ce.publication_status,
			ce.created_by, ce.verified_by, ce.verified_at, ce.created_at, ce.updated_at,
			cc.name, cc.slug, cc.icon_name
	` + baseQuery + fmt.Sprintf(" ORDER BY ce.name ASC LIMIT $%d OFFSET $%d", argIdx, argIdx+1)

	args = append(args, limit, offset)

	rows, err := r.db.QueryContext(ctx, selectQuery, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var elements []domain.CulturalElement
	for rows.Next() {
		var e domain.CulturalElement
		var cat domain.CulturalCategory
		err := rows.Scan(
			&e.ID, &e.CategoryID, &e.Name, &e.Slug, &e.ShortDescription,
			&e.Description, &e.History, &e.Philosophy, &e.CulturalContext,
			&e.Region, &e.CoverImageURL, &e.VerificationStatus, &e.PublicationStatus,
			&e.CreatedBy, &e.VerifiedBy, &e.VerifiedAt, &e.CreatedAt, &e.UpdatedAt,
			&cat.Name, &cat.Slug, &cat.IconName,
		)
		if err != nil {
			return nil, 0, err
		}
		cat.ID = e.CategoryID
		e.Category = &cat
		elements = append(elements, e)
	}

	return elements, total, nil
}

func (r *cultureRepository) GetElementBySlug(ctx context.Context, slug string) (*domain.CulturalElement, error) {
	query := `
		SELECT 
			ce.id, ce.category_id, ce.name, ce.slug, ce.short_description, 
			ce.description, ce.history, ce.philosophy, ce.cultural_context, 
			ce.region, ce.cover_image_url, ce.verification_status, ce.publication_status,
			ce.created_by, ce.verified_by, ce.verified_at, ce.created_at, ce.updated_at,
			cc.id, cc.name, cc.slug, cc.description, cc.icon_name, cc.created_at
		FROM cultural_elements ce
		JOIN cultural_categories cc ON ce.category_id = cc.id
		WHERE ce.slug = $1
	`
	var e domain.CulturalElement
	var cat domain.CulturalCategory
	err := r.db.QueryRowContext(ctx, query, slug).Scan(
		&e.ID, &e.CategoryID, &e.Name, &e.Slug, &e.ShortDescription,
		&e.Description, &e.History, &e.Philosophy, &e.CulturalContext,
		&e.Region, &e.CoverImageURL, &e.VerificationStatus, &e.PublicationStatus,
		&e.CreatedBy, &e.VerifiedBy, &e.VerifiedAt, &e.CreatedAt, &e.UpdatedAt,
		&cat.ID, &cat.Name, &cat.Slug, &cat.Description, &cat.IconName, &cat.CreatedAt,
	)
	if err != nil {
		return nil, err
	}
	e.Category = &cat

	// Fetch relations
	relations, err := r.GetCulturalGraph(ctx, e.ID)
	if err == nil {
		e.Relations = relations
	}

	// Fetch sources
	sources, err := r.GetSourcesByElementID(ctx, e.ID)
	if err == nil {
		e.Sources = sources
	}

	// Fetch destinations
	dests, err := r.GetDestinationsByElementID(ctx, e.ID)
	if err == nil {
		e.Destinations = dests
	}

	return &e, nil
}

func (r *cultureRepository) GetCulturalGraph(ctx context.Context, elementID uuid.UUID) ([]domain.CulturalRelation, error) {
	query := `
		SELECT 
			cr.id, cr.source_element_id, cr.target_element_id, cr.relation_type, 
			cr.description, cr.source_id, cr.verification_status, cr.created_at,
			ce.name, ce.slug, ce.cover_image_url,
			s.title
		FROM cultural_relations cr
		JOIN cultural_elements ce ON cr.target_element_id = ce.id
		LEFT JOIN sources s ON cr.source_id = s.id
		WHERE cr.source_element_id = $1 AND cr.verification_status = 'verified'
	`
	rows, err := r.db.QueryContext(ctx, query, elementID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var relations []domain.CulturalRelation
	for rows.Next() {
		var rel domain.CulturalRelation
		err := rows.Scan(
			&rel.ID, &rel.SourceElementID, &rel.TargetElementID, &rel.RelationType,
			&rel.Description, &rel.SourceID, &rel.VerificationStatus, &rel.CreatedAt,
			&rel.TargetElementName, &rel.TargetElementSlug, &rel.TargetCoverImage,
			&rel.SourceTitle,
		)
		if err != nil {
			return nil, err
		}
		relations = append(relations, rel)
	}
	return relations, nil
}

func (r *cultureRepository) GetSourcesByElementID(ctx context.Context, elementID uuid.UUID) ([]domain.SourceWithNote, error) {
	query := `
		SELECT 
			s.id, s.title, s.source_type, s.publisher, s.author, s.url, s.published_at, s.accessed_at, s.notes, s.created_at,
			ces.note
		FROM cultural_element_sources ces
		JOIN sources s ON ces.source_id = s.id
		WHERE ces.cultural_element_id = $1
		ORDER BY s.title ASC
	`
	rows, err := r.db.QueryContext(ctx, query, elementID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var sources []domain.SourceWithNote
	for rows.Next() {
		var item domain.SourceWithNote
		err := rows.Scan(
			&item.ID, &item.Title, &item.SourceType, &item.Publisher, &item.Author,
			&item.URL, &item.PublishedAt, &item.AccessedAt, &item.Notes, &item.CreatedAt,
			&item.Note,
		)
		if err != nil {
			return nil, err
		}
		sources = append(sources, item)
	}
	return sources, nil
}

func (r *cultureRepository) GetDestinationsByElementID(ctx context.Context, elementID uuid.UUID) ([]domain.DestinationSimple, error) {
	query := `
		SELECT 
			d.id, d.name, d.slug, d.cover_image_url, d.regency, d.latitude, d.longitude,
			dce.relationship_note
		FROM destination_cultural_elements dce
		JOIN destinations d ON dce.destination_id = d.id
		WHERE dce.cultural_element_id = $1 AND d.publication_status = 'published'
		ORDER BY d.name ASC
	`
	rows, err := r.db.QueryContext(ctx, query, elementID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var dests []domain.DestinationSimple
	for rows.Next() {
		var d domain.DestinationSimple
		err := rows.Scan(
			&d.ID, &d.Name, &d.Slug, &d.CoverImageURL, &d.Regency, &d.Latitude, &d.Longitude,
			&d.RelationshipNote,
		)
		if err != nil {
			return nil, err
		}
		dests = append(dests, d)
	}
	return dests, nil
}

func (r *cultureRepository) CreateElement(ctx context.Context, elem *domain.CulturalElement) error {
	query := `
		INSERT INTO cultural_elements (
			category_id, name, slug, short_description, description, history, philosophy,
			cultural_context, region, cover_image_url, verification_status, publication_status, created_by
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
		RETURNING id, created_at, updated_at
	`
	return r.db.QueryRowContext(
		ctx, query,
		elem.CategoryID, elem.Name, elem.Slug, elem.ShortDescription, elem.Description, elem.History,
		elem.Philosophy, elem.CulturalContext, elem.Region, elem.CoverImageURL, elem.VerificationStatus,
		elem.PublicationStatus, elem.CreatedBy,
	).Scan(&elem.ID, &elem.CreatedAt, &elem.UpdatedAt)
}

func (r *cultureRepository) UpdateVerificationStatus(ctx context.Context, id uuid.UUID, verifiedBy uuid.UUID, vStatus domain.VerificationStatus, pStatus domain.PublicationStatus) error {
	query := `
		UPDATE cultural_elements
		SET verification_status = $1, publication_status = $2, verified_by = $3, verified_at = NOW()
		WHERE id = $4
	`
	_, err := r.db.ExecContext(ctx, query, vStatus, pStatus, verifiedBy, id)
	return err
}
