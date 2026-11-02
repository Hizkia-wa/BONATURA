package handler

import (
	"net/http"
	"strconv"

	"bonatura-backend/internal/service"
	"bonatura-backend/pkg/response"

	"github.com/gin-gonic/gin"
)

type DestinationHandler struct {
	svc service.DestinationService
}

func NewDestinationHandler(svc service.DestinationService) *DestinationHandler {
	return &DestinationHandler{svc: svc}
}

// GetDestinations godoc
// GET /api/v1/destinations?regency=Samosir&search=Huta&page=1&per_page=12
func (h *DestinationHandler) GetDestinations(c *gin.Context) {
	regency := c.Query("regency")
	search := c.Query("search")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	perPage, _ := strconv.Atoi(c.DefaultQuery("per_page", "12"))

	dests, total, err := h.svc.GetDestinations(c.Request.Context(), regency, search, page, perPage)
	if err != nil {
		response.InternalServerError(c, "Gagal memuat destinasi wisata", err.Error())
		return
	}

	totalPages := (total + perPage - 1) / perPage
	response.Success(c, http.StatusOK, "Berhasil mengambil data destinasi", response.PaginatedData{
		Items:      dests,
		Total:      total,
		Page:       page,
		PerPage:    perPage,
		TotalPages: totalPages,
	})
}

// GetDestinationBySlug godoc
// GET /api/v1/destinations/:slug
func (h *DestinationHandler) GetDestinationBySlug(c *gin.Context) {
	slug := c.Param("slug")
	dest, err := h.svc.GetDestinationBySlug(c.Request.Context(), slug)
	if err != nil {
		response.NotFound(c, "Destinasi tidak ditemukan")
		return
	}
	response.Success(c, http.StatusOK, "Berhasil mengambil detail destinasi", dest)
}

// GetActivities godoc
// GET /api/v1/activities?destination=kampung-ulos-hutaraja&page=1&per_page=12
func (h *DestinationHandler) GetActivities(c *gin.Context) {
	destSlug := c.Query("destination")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	perPage, _ := strconv.Atoi(c.DefaultQuery("per_page", "12"))

	acts, total, err := h.svc.GetActivities(c.Request.Context(), destSlug, page, perPage)
	if err != nil {
		response.InternalServerError(c, "Gagal memuat aktivitas budaya", err.Error())
		return
	}

	totalPages := (total + perPage - 1) / perPage
	response.Success(c, http.StatusOK, "Berhasil mengambil data aktivitas", response.PaginatedData{
		Items:      acts,
		Total:      total,
		Page:       page,
		PerPage:    perPage,
		TotalPages: totalPages,
	})
}

// GetActivityBySlug godoc
// GET /api/v1/activities/:slug
func (h *DestinationHandler) GetActivityBySlug(c *gin.Context) {
	slug := c.Param("slug")
	act, err := h.svc.GetActivityBySlug(c.Request.Context(), slug)
	if err != nil {
		response.NotFound(c, "Aktivitas tidak ditemukan")
		return
	}
	response.Success(c, http.StatusOK, "Berhasil mengambil detail aktivitas", act)
}
