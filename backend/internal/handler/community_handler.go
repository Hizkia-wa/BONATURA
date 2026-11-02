package handler

import (
	"net/http"
	"strconv"

	"bonatura-backend/internal/domain"
	"bonatura-backend/internal/middleware"
	"bonatura-backend/internal/service"
	"bonatura-backend/pkg/response"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CommunityHandler struct {
	svc service.CommunityService
}

func NewCommunityHandler(svc service.CommunityService) *CommunityHandler {
	return &CommunityHandler{svc: svc}
}

// GetCommunities godoc
// GET /api/v1/communities?page=1&per_page=12
func (h *CommunityHandler) GetCommunities(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	perPage, _ := strconv.Atoi(c.DefaultQuery("per_page", "12"))

	list, total, err := h.svc.GetCommunities(c.Request.Context(), page, perPage)
	if err != nil {
		response.InternalServerError(c, "Gagal memuat daftar komunitas", err.Error())
		return
	}

	totalPages := (total + perPage - 1) / perPage
	response.Success(c, http.StatusOK, "Berhasil mengambil data komunitas", response.PaginatedData{
		Items:      list,
		Total:      total,
		Page:       page,
		PerPage:    perPage,
		TotalPages: totalPages,
	})
}

// GetCommunityBySlug godoc
// GET /api/v1/communities/:slug
func (h *CommunityHandler) GetCommunityBySlug(c *gin.Context) {
	slug := c.Param("slug")
	comm, members, err := h.svc.GetCommunityBySlug(c.Request.Context(), slug)
	if err != nil {
		response.NotFound(c, "Komunitas tidak ditemukan")
		return
	}

	type CommunityDetailResponse struct {
		*domain.Community
		Members []domain.CommunityMember `json:"members"`
	}

	response.Success(c, http.StatusOK, "Berhasil mengambil detail komunitas", CommunityDetailResponse{
		Community: comm,
		Members:   members,
	})
}

// CreateCommunity godoc
// POST /api/v1/communities
func (h *CommunityHandler) CreateCommunity(c *gin.Context) {
	userIDVal, exists := c.Get(middleware.ContextUserID)
	if !exists {
		response.Unauthorized(c, "Identitas pengguna diperlukan")
		return
	}
	userID := userIDVal.(uuid.UUID)

	var req domain.Community
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Payload data komunitas tidak valid", err.Error())
		return
	}

	if err := h.svc.CreateCommunity(c.Request.Context(), &req, userID); err != nil {
		response.BadRequest(c, "Gagal mendaftarkan komunitas", err.Error())
		return
	}

	response.Success(c, http.StatusCreated, "Komunitas berhasil didaftarkan (status: pending verifikasi)", req)
}
