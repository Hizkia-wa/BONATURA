package service

import (
	"context"
	"errors"
	"strings"

	"bonatura-backend/internal/domain"
	"bonatura-backend/internal/repository"
)

type DestinationService interface {
	GetDestinations(ctx context.Context, regency, search string, page, perPage int) ([]domain.Destination, int, error)
	GetDestinationBySlug(ctx context.Context, slug string) (*domain.Destination, error)
	GetActivities(ctx context.Context, destinationSlug string, page, perPage int) ([]domain.Activity, int, error)
	GetActivityBySlug(ctx context.Context, slug string) (*domain.Activity, error)
}

type destinationService struct {
	repo repository.DestinationRepository
}

func NewDestinationService(repo repository.DestinationRepository) DestinationService {
	return &destinationService{repo: repo}
}

func (s *destinationService) GetDestinations(ctx context.Context, regency, search string, page, perPage int) ([]domain.Destination, int, error) {
	if page < 1 {
		page = 1
	}
	if perPage < 1 || perPage > 100 {
		perPage = 12
	}
	offset := (page - 1) * perPage

	return s.repo.GetDestinations(ctx, strings.TrimSpace(regency), strings.TrimSpace(search), perPage, offset)
}

func (s *destinationService) GetDestinationBySlug(ctx context.Context, slug string) (*domain.Destination, error) {
	slug = strings.TrimSpace(slug)
	if slug == "" {
		return nil, errors.New("slug destinasi tidak boleh kosong")
	}
	return s.repo.GetDestinationBySlug(ctx, slug)
}

func (s *destinationService) GetActivities(ctx context.Context, destinationSlug string, page, perPage int) ([]domain.Activity, int, error) {
	if page < 1 {
		page = 1
	}
	if perPage < 1 || perPage > 100 {
		perPage = 12
	}
	offset := (page - 1) * perPage

	return s.repo.GetActivities(ctx, strings.TrimSpace(destinationSlug), domain.ActivityStatusPublished, perPage, offset)
}

func (s *destinationService) GetActivityBySlug(ctx context.Context, slug string) (*domain.Activity, error) {
	slug = strings.TrimSpace(slug)
	if slug == "" {
		return nil, errors.New("slug aktivitas tidak boleh kosong")
	}
	return s.repo.GetActivityBySlug(ctx, slug)
}
