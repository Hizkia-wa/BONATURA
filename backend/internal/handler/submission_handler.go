package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"bonatura-backend/internal/domain"
	"bonatura-backend/internal/middleware"
	"bonatura-backend/internal/service"
	"bonatura-backend/pkg/response"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type SubmissionHandler struct {
	svc service.SubmissionService
}

func NewSubmissionHandler(svc service.SubmissionService) *SubmissionHandler {
	return &SubmissionHandler{svc: svc}
}

type CreateSubmissionRequest struct {
	CommunityID *uuid.UUID                   `json:"community_id,omitempty"`
	ContentType domain.SubmissionContentType `json:"content_type" binding:"required"`
	Title       string                       `json:"title" binding:"required"`
	ProposedData gin.H                       `json:"proposed_data" binding:"required"`
}

type ReviewSubmissionRequest struct {
	Action domain.SubmissionReviewAction `json:"action" binding:"required"`
	Note   string                        `json:"note"`
}

// CreateSubmission godoc
// POST /api/v1/submissions
func (h *SubmissionHandler) CreateSubmission(c *gin.Context) {
	userIDVal, exists := c.Get(middleware.ContextUserID)
	if !exists {
		response.Unauthorized(c, "Identitas pengguna diperlukan")
		return
	}
	userID := userIDVal.(uuid.UUID)

	var req CreateSubmissionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Payload pengajuan tidak valid", err.Error())
		return
	}

	proposedJSON, err := json.Marshal(req.ProposedData)
	if err != nil {
		response.BadRequest(c, "Format proposed_data tidak valid", err.Error())
		return
	}

	sub := domain.Submission{
		SubmittedBy:  userID,
		CommunityID:  req.CommunityID,
		ContentType:  req.ContentType,
		Title:        req.Title,
		ProposedData: proposedJSON,
	}

	if err := h.svc.CreateSubmission(c.Request.Context(), &sub); err != nil {
		response.BadRequest(c, "Gagal membuat pengajuan kontribusi", err.Error())
		return
	}

	response.Success(c, http.StatusCreated, "Pengajuan berhasil dikirim untuk diperiksa oleh Administrator", sub)
}

// GetSubmissions godoc
// GET /api/v1/submissions?status=pending&page=1&per_page=10
func (h *SubmissionHandler) GetSubmissions(c *gin.Context) {
	roleVal, _ := c.Get(middleware.ContextUserRole)
	userIDVal, _ := c.Get(middleware.ContextUserID)

	userRole := domain.Role(roleVal.(string))
	userID := userIDVal.(uuid.UUID)

	status := domain.SubmissionStatus(c.Query("status"))
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	perPage, _ := strconv.Atoi(c.DefaultQuery("per_page", "10"))

	var filterUser *uuid.UUID
	// If contributor, filter strictly to their own submissions
	if userRole != domain.RoleAdmin {
		filterUser = &userID
	}

	subs, total, err := h.svc.GetSubmissions(c.Request.Context(), status, filterUser, page, perPage)
	if err != nil {
		response.InternalServerError(c, "Gagal mengambil daftar pengajuan", err.Error())
		return
	}

	totalPages := (total + perPage - 1) / perPage
	response.Success(c, http.StatusOK, "Berhasil mengambil data pengajuan", response.PaginatedData{
		Items:      subs,
		Total:      total,
		Page:       page,
		PerPage:    perPage,
		TotalPages: totalPages,
	})
}

// GetSubmissionByID godoc
// GET /api/v1/submissions/:id
func (h *SubmissionHandler) GetSubmissionByID(c *gin.Context) {
	idStr := c.Param("id")
	subID, err := uuid.Parse(idStr)
	if err != nil {
		response.BadRequest(c, "ID pengajuan tidak valid", err.Error())
		return
	}

	sub, err := h.svc.GetSubmissionByID(c.Request.Context(), subID)
	if err != nil {
		response.NotFound(c, "Pengajuan tidak ditemukan")
		return
	}

	// Security check: Contributor can only see their own submission
	roleVal, _ := c.Get(middleware.ContextUserRole)
	userIDVal, _ := c.Get(middleware.ContextUserID)
	if domain.Role(roleVal.(string)) != domain.RoleAdmin && sub.SubmittedBy != userIDVal.(uuid.UUID) {
		response.Forbidden(c, "Anda tidak memiliki akses ke pengajuan ini")
		return
	}

	response.Success(c, http.StatusOK, "Berhasil mengambil detail pengajuan", sub)
}

// ReviewSubmission godoc
// POST /api/v1/submissions/:id/review (Admin Only)
func (h *SubmissionHandler) ReviewSubmission(c *gin.Context) {
	idStr := c.Param("id")
	subID, err := uuid.Parse(idStr)
	if err != nil {
		response.BadRequest(c, "ID pengajuan tidak valid", err.Error())
		return
	}

	reviewerIDVal, _ := c.Get(middleware.ContextUserID)
	reviewerID := reviewerIDVal.(uuid.UUID)

	var req ReviewSubmissionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Payload pemeriksaan tidak valid", err.Error())
		return
	}

	if err := h.svc.ReviewSubmission(c.Request.Context(), subID, reviewerID, req.Action, req.Note); err != nil {
		response.BadRequest(c, "Gagal memproses pemeriksaan", err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Pemeriksaan pengajuan berhasil disimpan", gin.H{
		"submission_id": subID,
		"action":        req.Action,
	})
}
