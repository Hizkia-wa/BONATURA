package handler

import (
	"net/http"
	"strconv"

	"bonatura-backend/internal/service"
	"bonatura-backend/pkg/response"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CultureHandler struct {
	svc service.CultureService
}

func NewCultureHandler(svc service.CultureService) *CultureHandler {
	return &CultureHandler{svc: svc}
}

// GetCategories godoc
// GET /api/v1/culture/categories
func (h *CultureHandler) GetCategories(c *gin.Context) {
	categories, err := h.svc.GetCategories(c.Request.Context())
	if err != nil {
		response.InternalServerError(c, "Gagal memuat kategori budaya", err.Error())
		return
	}
	response.Success(c, http.StatusOK, "Berhasil mengambil kategori budaya", categories)
}

// GetCategoryBySlug godoc
// GET /api/v1/culture/categories/:slug
func (h *CultureHandler) GetCategoryBySlug(c *gin.Context) {
	slug := c.Param("slug")
	cat, err := h.svc.GetCategoryBySlug(c.Request.Context(), slug)
	if err != nil {
		response.NotFound(c, "Kategori budaya tidak ditemukan")
		return
	}
	response.Success(c, http.StatusOK, "Berhasil mengambil detail kategori", cat)
}

// GetElements godoc
// GET /api/v1/culture/elements?category=pakaian-adat&search=ulos&page=1&per_page=12
func (h *CultureHandler) GetElements(c *gin.Context) {
	category := c.Query("category")
	search := c.Query("search")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	perPage, _ := strconv.Atoi(c.DefaultQuery("per_page", "12"))

	elements, total, err := h.svc.GetElements(c.Request.Context(), category, search, page, perPage)
	if err != nil {
		response.InternalServerError(c, "Gagal memuat elemen budaya", err.Error())
		return
	}

	totalPages := (total + perPage - 1) / perPage
	response.Success(c, http.StatusOK, "Berhasil mengambil data budaya", response.PaginatedData{
		Items:      elements,
		Total:      total,
		Page:       page,
		PerPage:    perPage,
		TotalPages: totalPages,
	})
}

// GetElementBySlug godoc
// GET /api/v1/culture/elements/:slug
func (h *CultureHandler) GetElementBySlug(c *gin.Context) {
	slug := c.Param("slug")
	elem, err := h.svc.GetElementBySlug(c.Request.Context(), slug)
	if err != nil {
		response.NotFound(c, "Elemen budaya tidak ditemukan")
		return
	}
	response.Success(c, http.StatusOK, "Berhasil mengambil detail budaya", elem)
}

// GetKnowledgeGraph godoc
// GET /api/v1/culture/elements/:slug/graph
func (h *CultureHandler) GetKnowledgeGraph(c *gin.Context) {
	param := c.Param("slug")
	elementID, err := uuid.Parse(param)
	if err != nil {
		// If not UUID, look up element by slug
		elem, err := h.svc.GetElementBySlug(c.Request.Context(), param)
		if err != nil {
			response.NotFound(c, "Elemen budaya tidak ditemukan")
			return
		}
		elementID = elem.ID
	}

	relations, err := h.svc.GetKnowledgeGraph(c.Request.Context(), elementID)
	if err != nil {
		response.InternalServerError(c, "Gagal memuat graf pengetahuan budaya", err.Error())
		return
	}
	response.Success(c, http.StatusOK, "Berhasil mengambil graf hubungan budaya", relations)
}
