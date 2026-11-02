package repository

import (
	"context"
	"database/sql"
	"fmt"

	"bonatura-backend/internal/domain"

	"github.com/google/uuid"
)

type CommunityRepository interface {
	GetCommunities(ctx context.Context, status domain.CommunityStatus, limit, offset int) ([]domain.Community, int, error)
	GetCommunityBySlug(ctx context.Context, slug string) (*domain.Community, error)
	GetMembers(ctx context.Context, communityID uuid.UUID) ([]domain.CommunityMember, error)
	CreateCommunity(ctx context.Context, c *domain.Community) error
	AddMember(ctx context.Context, m *domain.CommunityMember) error
}

type communityRepository struct {
	db *sql.DB
}

func NewCommunityRepository(db *sql.DB) CommunityRepository {
	return &communityRepository{db: db}
}

func (r *communityRepository) GetCommunities(ctx context.Context, status domain.CommunityStatus, limit, offset int) ([]domain.Community, int, error) {
	baseQuery := `FROM communities c LEFT JOIN profiles p ON c.created_by = p.id WHERE 1=1`
	args := []interface{}{}
	argIdx := 1

	if status != "" {
		baseQuery += fmt.Sprintf(" AND c.status = $%d", argIdx)
		args = append(args, status)
		argIdx++
	} else {
		baseQuery += fmt.Sprintf(" AND c.status = 'verified'")
	}

	countQuery := "SELECT COUNT(*) " + baseQuery
	var total int
	if err := r.db.QueryRowContext(ctx, countQuery, args...).Scan(&total); err != nil {
		return nil, 0, err
	}

	selectQuery := `
		SELECT 
			c.id, c.name, c.slug, c.description, c.location, c.address,
			c.contact_email, c.contact_phone, c.image_url, c.status,
			c.created_by, c.created_at, c.updated_at,
			p.full_name
	` + baseQuery + fmt.Sprintf(" ORDER BY c.name ASC LIMIT $%d OFFSET $%d", argIdx, argIdx+1)

	args = append(args, limit, offset)

	rows, err := r.db.QueryContext(ctx, selectQuery, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var list []domain.Community
	for rows.Next() {
		var item domain.Community
		var creatorName sql.NullString
		err := rows.Scan(
			&item.ID, &item.Name, &item.Slug, &item.Description, &item.Location, &item.Address,
			&item.ContactEmail, &item.ContactPhone, &item.ImageURL, &item.Status,
			&item.CreatedBy, &item.CreatedAt, &item.UpdatedAt,
			&creatorName,
		)
		if err != nil {
			return nil, 0, err
		}
		if creatorName.Valid {
			item.CreatorName = &creatorName.String
		}
		list = append(list, item)
	}

	return list, total, nil
}

func (r *communityRepository) GetCommunityBySlug(ctx context.Context, slug string) (*domain.Community, error) {
	query := `
		SELECT 
			c.id, c.name, c.slug, c.description, c.location, c.address,
			c.contact_email, c.contact_phone, c.image_url, c.status,
			c.created_by, c.created_at, c.updated_at,
			p.full_name
		FROM communities c
		LEFT JOIN profiles p ON c.created_by = p.id
		WHERE c.slug = $1
	`
	var item domain.Community
	var creatorName sql.NullString
	err := r.db.QueryRowContext(ctx, query, slug).Scan(
		&item.ID, &item.Name, &item.Slug, &item.Description, &item.Location, &item.Address,
		&item.ContactEmail, &item.ContactPhone, &item.ImageURL, &item.Status,
		&item.CreatedBy, &item.CreatedAt, &item.UpdatedAt,
		&creatorName,
	)
	if err != nil {
		return nil, err
	}
	if creatorName.Valid {
		item.CreatorName = &creatorName.String
	}
	return &item, nil
}

func (r *communityRepository) GetMembers(ctx context.Context, communityID uuid.UUID) ([]domain.CommunityMember, error) {
	query := `
		SELECT 
			cm.id, cm.community_id, cm.profile_id, cm.member_role, cm.joined_at,
			p.full_name, p.email, p.avatar_url, p.role
		FROM community_members cm
		JOIN profiles p ON cm.profile_id = p.id
		WHERE cm.community_id = $1
		ORDER BY cm.member_role ASC, cm.joined_at ASC
	`
	rows, err := r.db.QueryContext(ctx, query, communityID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var members []domain.CommunityMember
	for rows.Next() {
		var m domain.CommunityMember
		var p domain.Profile
		err := rows.Scan(
			&m.ID, &m.CommunityID, &m.ProfileID, &m.MemberRole, &m.JoinedAt,
			&p.FullName, &p.Email, &p.AvatarURL, &p.Role,
		)
		if err != nil {
			return nil, err
		}
		p.ID = m.ProfileID
		m.Profile = &p
		members = append(members, m)
	}
	return members, nil
}

func (r *communityRepository) CreateCommunity(ctx context.Context, c *domain.Community) error {
	query := `
		INSERT INTO communities (
			name, slug, description, location, address, contact_email,
			contact_phone, image_url, status, created_by
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
		RETURNING id, created_at, updated_at
	`
	return r.db.QueryRowContext(
		ctx, query,
		c.Name, c.Slug, c.Description, c.Location, c.Address, c.ContactEmail,
		c.ContactPhone, c.ImageURL, c.Status, c.CreatedBy,
	).Scan(&c.ID, &c.CreatedAt, &c.UpdatedAt)
}

func (r *communityRepository) AddMember(ctx context.Context, m *domain.CommunityMember) error {
	query := `
		INSERT INTO community_members (community_id, profile_id, member_role)
		VALUES ($1, $2, $3)
		RETURNING id, joined_at
	`
	return r.db.QueryRowContext(ctx, query, m.CommunityID, m.ProfileID, m.MemberRole).Scan(&m.ID, &m.JoinedAt)
}
