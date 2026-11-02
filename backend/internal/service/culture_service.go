package service

import (
	"context"
	"errors"
	"strings"

	"bonatura-backend/internal/domain"
	"bonatura-backend/internal/repository"

	"github.com/google/uuid"
)

type CultureService interface {
	GetCategories(ctx context.Context) ([]domain.CulturalCategory, error)
	GetCategoryBySlug(ctx context.Context, slug string) (*domain.CulturalCategory, error)
	GetElements(ctx context.Context, categorySlug, search string, page, perPage int) ([]domain.CulturalElement, int, error)
	GetElementBySlug(ctx context.Context, slug string) (*domain.CulturalElement, error)
	GetKnowledgeGraph(ctx context.Context, elementID uuid.UUID) ([]domain.CulturalRelation, error)
}

type cultureService struct {
	repo repository.CultureRepository
}

func NewCultureService(repo repository.CultureRepository) CultureService {
	return &cultureService{repo: repo}
}

func (s *cultureService) GetCategories(ctx context.Context) ([]domain.CulturalCategory, error) {
	return s.repo.GetCategories(ctx)
}

func (s *cultureService) GetCategoryBySlug(ctx context.Context, slug string) (*domain.CulturalCategory, error) {
	slug = strings.TrimSpace(slug)
	if slug == "" {
		return nil, errors.New("slug kategori tidak boleh kosong")
	}
	return s.repo.GetCategoryBySlug(ctx, slug)
}

func (s *cultureService) GetElements(ctx context.Context, categorySlug, search string, page, perPage int) ([]domain.CulturalElement, int, error) {
	if page < 1 {
		page = 1
	}
	if perPage < 1 || perPage > 100 {
		perPage = 12
	}
	offset := (page - 1) * perPage

	return s.repo.GetElements(ctx, strings.TrimSpace(categorySlug), strings.TrimSpace(search), perPage, offset)
}

func (s *cultureService) GetElementBySlug(ctx context.Context, slug string) (*domain.CulturalElement, error) {
	slug = strings.TrimSpace(slug)
	if slug == "" {
		return nil, errors.New("slug budaya tidak boleh kosong")
	}
	return s.repo.GetElementBySlug(ctx, slug)
}

func (s *cultureService) GetKnowledgeGraph(ctx context.Context, elementID uuid.UUID) ([]domain.CulturalRelation, error) {
	if elementID == uuid.Nil {
		return nil, errors.New("element ID tidak valid")
	}
	return s.repo.GetCulturalGraph(ctx, elementID)
}
