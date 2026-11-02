package repository

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"bonatura-backend/internal/domain"

	"github.com/google/uuid"
)

type SubmissionRepository interface {
	CreateSubmission(ctx context.Context, s *domain.Submission) error
	GetSubmissions(ctx context.Context, status domain.SubmissionStatus, submittedBy *uuid.UUID, limit, offset int) ([]domain.Submission, int, error)
	GetSubmissionByID(ctx context.Context, id uuid.UUID) (*domain.Submission, error)
	GetReviewsBySubmissionID(ctx context.Context, submissionID uuid.UUID) ([]domain.SubmissionReview, error)
	ReviewSubmission(ctx context.Context, review *domain.SubmissionReview, newStatus domain.SubmissionStatus) error
}

type submissionRepository struct {
	db *sql.DB
}

func NewSubmissionRepository(db *sql.DB) SubmissionRepository {
	return &submissionRepository{db: db}
}

func (r *submissionRepository) CreateSubmission(ctx context.Context, s *domain.Submission) error {
	query := `
		INSERT INTO submissions (
			submitted_by, community_id, content_type, title, proposed_data, status
		) VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id, created_at, updated_at
	`
	return r.db.QueryRowContext(
		ctx, query,
		s.SubmittedBy, s.CommunityID, s.ContentType, s.Title, s.ProposedData, s.Status,
	).Scan(&s.ID, &s.CreatedAt, &s.UpdatedAt)
}

func (r *submissionRepository) GetSubmissions(ctx context.Context, status domain.SubmissionStatus, submittedBy *uuid.UUID, limit, offset int) ([]domain.Submission, int, error) {
	baseQuery := `
		FROM submissions s
		JOIN profiles p ON s.submitted_by = p.id
		LEFT JOIN communities c ON s.community_id = c.id
		WHERE 1=1
	`
	args := []interface{}{}
	argIdx := 1

	if status != "" {
		baseQuery += fmt.Sprintf(" AND s.status = $%d", argIdx)
		args = append(args, status)
		argIdx++
	}

	if submittedBy != nil && *submittedBy != uuid.Nil {
		baseQuery += fmt.Sprintf(" AND s.submitted_by = $%d", argIdx)
		args = append(args, *submittedBy)
		argIdx++
	}

	countQuery := "SELECT COUNT(*) " + baseQuery
	var total int
	if err := r.db.QueryRowContext(ctx, countQuery, args...).Scan(&total); err != nil {
		return nil, 0, err
	}

	selectQuery := `
		SELECT 
			s.id, s.submitted_by, s.community_id, s.content_type, s.title,
			s.proposed_data, s.status, s.reviewed_by, s.review_note, s.reviewed_at,
			s.created_at, s.updated_at,
			p.full_name, c.name
	` + baseQuery + fmt.Sprintf(" ORDER BY s.created_at DESC LIMIT $%d OFFSET $%d", argIdx, argIdx+1)

	args = append(args, limit, offset)

	rows, err := r.db.QueryContext(ctx, selectQuery, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var submissions []domain.Submission
	for rows.Next() {
		var s domain.Submission
		var submitterName string
		var commName sql.NullString
		err := rows.Scan(
			&s.ID, &s.SubmittedBy, &s.CommunityID, &s.ContentType, &s.Title,
			&s.ProposedData, &s.Status, &s.ReviewedBy, &s.ReviewNote, &s.ReviewedAt,
			&s.CreatedAt, &s.UpdatedAt,
			&submitterName, &commName,
		)
		if err != nil {
			return nil, 0, err
		}
		s.SubmitterName = &submitterName
		if commName.Valid {
			s.CommunityName = &commName.String
		}
		submissions = append(submissions, s)
	}

	return submissions, total, nil
}

func (r *submissionRepository) GetSubmissionByID(ctx context.Context, id uuid.UUID) (*domain.Submission, error) {
	query := `
		SELECT 
			s.id, s.submitted_by, s.community_id, s.content_type, s.title,
			s.proposed_data, s.status, s.reviewed_by, s.review_note, s.reviewed_at,
			s.created_at, s.updated_at,
			p.full_name, c.name
		FROM submissions s
		JOIN profiles p ON s.submitted_by = p.id
		LEFT JOIN communities c ON s.community_id = c.id
		WHERE s.id = $1
	`
	var s domain.Submission
	var submitterName string
	var commName sql.NullString
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&s.ID, &s.SubmittedBy, &s.CommunityID, &s.ContentType, &s.Title,
		&s.ProposedData, &s.Status, &s.ReviewedBy, &s.ReviewNote, &s.ReviewedAt,
		&s.CreatedAt, &s.UpdatedAt,
		&submitterName, &commName,
	)
	if err != nil {
		return nil, err
	}
	s.SubmitterName = &submitterName
	if commName.Valid {
		s.CommunityName = &commName.String
	}

	reviews, err := r.GetReviewsBySubmissionID(ctx, s.ID)
	if err == nil {
		s.Reviews = reviews
	}

	return &s, nil
}

func (r *submissionRepository) GetReviewsBySubmissionID(ctx context.Context, submissionID uuid.UUID) ([]domain.SubmissionReview, error) {
	query := `
		SELECT 
			sr.id, sr.submission_id, sr.reviewer_id, sr.action, sr.review_note, sr.created_at,
			p.full_name
		FROM submission_reviews sr
		JOIN profiles p ON sr.reviewer_id = p.id
		WHERE sr.submission_id = $1
		ORDER BY sr.created_at DESC
	`
	rows, err := r.db.QueryContext(ctx, query, submissionID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reviews []domain.SubmissionReview
	for rows.Next() {
		var rev domain.SubmissionReview
		var reviewerName string
		err := rows.Scan(
			&rev.ID, &rev.SubmissionID, &rev.ReviewerID, &rev.Action, &rev.ReviewNote, &rev.CreatedAt,
			&reviewerName,
		)
		if err != nil {
			return nil, err
		}
		rev.ReviewerName = &reviewerName
		reviews = append(reviews, rev)
	}
	return reviews, nil
}

func (r *submissionRepository) ReviewSubmission(ctx context.Context, review *domain.SubmissionReview, newStatus domain.SubmissionStatus) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	// 1. Insert review history
	insertReviewQuery := `
		INSERT INTO submission_reviews (submission_id, reviewer_id, action, review_note)
		VALUES ($1, $2, $3, $4)
		RETURNING id, created_at
	`
	if err := tx.QueryRowContext(ctx, insertReviewQuery, review.SubmissionID, review.ReviewerID, review.Action, review.ReviewNote).Scan(&review.ID, &review.CreatedAt); err != nil {
		return err
	}

	// 2. Update submission state
	now := time.Now()
	updateSubQuery := `
		UPDATE submissions
		SET status = $1, reviewed_by = $2, review_note = $3, reviewed_at = $4
		WHERE id = $5
	`
	if _, err := tx.ExecContext(ctx, updateSubQuery, newStatus, review.ReviewerID, review.ReviewNote, now, review.SubmissionID); err != nil {
		return err
	}

	return tx.Commit()
}
