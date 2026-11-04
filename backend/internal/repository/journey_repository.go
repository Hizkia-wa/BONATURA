package repository

import (
	"context"
	"database/sql"
	"fmt"
	"sync"
	"time"

	"bonatura-backend/internal/domain"

	"github.com/google/uuid"
)

type JourneyRepository interface {
	Save(ctx context.Context, j *domain.Journey) (*domain.Journey, error)
	FindAll(ctx context.Context) ([]domain.Journey, error)
	FindByID(ctx context.Context, id string) (*domain.Journey, error)
}

type journeyRepository struct {
	db      *sql.DB
	mu      sync.RWMutex
	storage map[string]domain.Journey
}

func NewJourneyRepository(db *sql.DB) JourneyRepository {
	return &journeyRepository{
		db:      db,
		storage: make(map[string]domain.Journey),
	}
}

func (r *journeyRepository) Save(ctx context.Context, j *domain.Journey) (*domain.Journey, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	if j.ID == "" {
		j.ID = "journey-" + uuid.New().String()
	}
	if j.CreatedAt.IsZero() {
		j.CreatedAt = time.Now()
	}

	r.storage[j.ID] = *j
	return j, nil
}

func (r *journeyRepository) FindAll(ctx context.Context) ([]domain.Journey, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	list := make([]domain.Journey, 0, len(r.storage))
	for _, j := range r.storage {
		list = append(list, j)
	}
	return list, nil
}

func (r *journeyRepository) FindByID(ctx context.Context, id string) (*domain.Journey, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	j, ok := r.storage[id]
	if !ok {
		return nil, fmt.Errorf("journey with id %s not found", id)
	}
	return &j, nil
}

