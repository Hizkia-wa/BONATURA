package service

import (
	"context"
	"errors"
	"strings"

	"bonatura-backend/internal/domain"
	"bonatura-backend/internal/repository"

	"github.com/google/uuid"
)

type SubmissionService interface {
	CreateSubmission(ctx context.Context, sub *domain.Submission) error
	GetSubmissions(ctx context.Context, status domain.SubmissionStatus, submittedBy *uuid.UUID, page, perPage int) ([]domain.Submission, int, error)
	GetSubmissionByID(ctx context.Context, id uuid.UUID) (*domain.Submission, error)
	ReviewSubmission(ctx context.Context, submissionID uuid.UUID, reviewerID uuid.UUID, action domain.SubmissionReviewAction, note string) error
}

type submissionService struct {
	repo repository.SubmissionRepository
}

func NewSubmissionService(repo repository.SubmissionRepository) SubmissionService {
	return &submissionService{repo: repo}
}

func (s *submissionService) CreateSubmission(ctx context.Context, sub *domain.Submission) error {
	if strings.TrimSpace(sub.Title) == "" {
		return errors.New("judul pengajuan tidak boleh kosong")
	}
	if len(sub.ProposedData) == 0 {
		return errors.New("data usulan (proposed_data) tidak boleh kosong")
	}
	if sub.SubmittedBy == uuid.Nil {
		return errors.New("identitas pengaju (submitted_by) tidak valid")
	}

	sub.Status = domain.SubmissionStatusPending
	return s.repo.CreateSubmission(ctx, sub)
}

func (s *submissionService) GetSubmissions(ctx context.Context, status domain.SubmissionStatus, submittedBy *uuid.UUID, page, perPage int) ([]domain.Submission, int, error) {
	if page < 1 {
		page = 1
	}
	if perPage < 1 || perPage > 100 {
		perPage = 10
	}
	offset := (page - 1) * perPage

	return s.repo.GetSubmissions(ctx, status, submittedBy, perPage, offset)
}

func (s *submissionService) GetSubmissionByID(ctx context.Context, id uuid.UUID) (*domain.Submission, error) {
	if id == uuid.Nil {
		return nil, errors.New("submission ID tidak valid")
	}
	return s.repo.GetSubmissionByID(ctx, id)
}

func (s *submissionService) ReviewSubmission(ctx context.Context, submissionID uuid.UUID, reviewerID uuid.UUID, action domain.SubmissionReviewAction, note string) error {
	if submissionID == uuid.Nil || reviewerID == uuid.Nil {
		return errors.New("parameter ID pengajuan atau reviewer tidak valid")
	}

	sub, err := s.repo.GetSubmissionByID(ctx, submissionID)
	if err != nil {
		return err
	}

	// Rule: Contributor cannot review or approve their own submission!
	if sub.SubmittedBy == reviewerID {
		return errors.New("aturan integritas: kontributor tidak boleh menyetujui pengajuannya sendiri")
	}

	var newStatus domain.SubmissionStatus
	switch action {
	case domain.SubmissionActionApproved:
		newStatus = domain.SubmissionStatusApproved
	case domain.SubmissionActionRejected:
		newStatus = domain.SubmissionStatusRejected
	case domain.SubmissionActionRequestedRevision:
		newStatus = domain.SubmissionStatusPending
	default:
		return errors.New("tindakan pemeriksaan (action) tidak valid")
	}

	review := &domain.SubmissionReview{
		SubmissionID: submissionID,
		ReviewerID:   reviewerID,
		Action:       action,
		ReviewNote:   &note,
	}

	return s.repo.ReviewSubmission(ctx, review, newStatus)
}
