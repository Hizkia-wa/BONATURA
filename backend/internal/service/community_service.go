package service

import (
	"context"
	"errors"
	"strings"

	"bonatura-backend/internal/domain"
	"bonatura-backend/internal/repository"

	"github.com/google/uuid"
)

type CommunityService interface {
	GetCommunities(ctx context.Context, page, perPage int) ([]domain.Community, int, error)
	GetCommunityBySlug(ctx context.Context, slug string) (*domain.Community, []domain.CommunityMember, error)
	CreateCommunity(ctx context.Context, comm *domain.Community, creatorID uuid.UUID) error
}

type communityService struct {
	repo repository.CommunityRepository
}

func NewCommunityService(repo repository.CommunityRepository) CommunityService {
	return &communityService{repo: repo}
}

func (s *communityService) GetCommunities(ctx context.Context, page, perPage int) ([]domain.Community, int, error) {
	if page < 1 {
		page = 1
	}
	if perPage < 1 || perPage > 100 {
		perPage = 12
	}
	offset := (page - 1) * perPage

	return s.repo.GetCommunities(ctx, domain.CommunityStatusVerified, perPage, offset)
}

func (s *communityService) GetCommunityBySlug(ctx context.Context, slug string) (*domain.Community, []domain.CommunityMember, error) {
	slug = strings.TrimSpace(slug)
	if slug == "" {
		return nil, nil, errors.New("slug komunitas tidak boleh kosong")
	}

	comm, err := s.repo.GetCommunityBySlug(ctx, slug)
	if err != nil {
		return nil, nil, err
	}

	members, err := s.repo.GetMembers(ctx, comm.ID)
	if err != nil {
		return comm, nil, nil
	}

	return comm, members, nil
}

func (s *communityService) CreateCommunity(ctx context.Context, comm *domain.Community, creatorID uuid.UUID) error {
	if strings.TrimSpace(comm.Name) == "" {
		return errors.New("nama komunitas tidak boleh kosong")
	}
	if strings.TrimSpace(comm.Slug) == "" {
		return errors.New("slug komunitas tidak boleh kosong")
	}

	comm.CreatedBy = &creatorID
	comm.Status = domain.CommunityStatusPending // Community requires verification by default

	if err := s.repo.CreateCommunity(ctx, comm); err != nil {
		return err
	}

	// Add creator as owner
	member := &domain.CommunityMember{
		CommunityID: comm.ID,
		ProfileID:   creatorID,
		MemberRole:  domain.MemberRoleOwner,
	}
	return s.repo.AddMember(ctx, member)
}
