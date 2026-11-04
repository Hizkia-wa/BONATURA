package handler

import (
	"net/http"

	"bonatura-backend/internal/domain"
	"bonatura-backend/internal/service"
	"bonatura-backend/pkg/response"

	"github.com/gin-gonic/gin"
)

type JourneyHandler struct {
	svc service.JourneyService
}

func NewJourneyHandler(svc service.JourneyService) *JourneyHandler {
	return &JourneyHandler{svc: svc}
}

func (h *JourneyHandler) SaveJourney(c *gin.Context) {
	var j domain.Journey
	if err := c.ShouldBindJSON(&j); err != nil {
		response.BadRequest(c, "Invalid journey payload", err.Error())
		return
	}

	saved, err := h.svc.SaveJourney(c.Request.Context(), &j)
	if err != nil {
		response.InternalServerError(c, "Failed to save journey", err.Error())
		return
	}

	response.Success(c, http.StatusCreated, "Journey successfully saved to backend", saved)
}

func (h *JourneyHandler) GetJourneys(c *gin.Context) {
	list, err := h.svc.GetJourneys(c.Request.Context())
	if err != nil {
		response.InternalServerError(c, "Failed to fetch journeys", err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Journeys retrieved successfully", gin.H{
		"items": list,
		"total": len(list),
	})
}

func (h *JourneyHandler) GetJourneyByID(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		response.BadRequest(c, "Journey ID is required", nil)
		return
	}

	j, err := h.svc.GetJourneyByID(c.Request.Context(), id)
	if err != nil {
		response.NotFound(c, "Journey not found")
		return
	}

	response.Success(c, http.StatusOK, "Journey details retrieved successfully", j)
}

func (h *JourneyHandler) ExportJourney(c *gin.Context) {
	var req domain.ExportJourneyRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid export journey payload", err.Error())
		return
	}

	res, err := h.svc.ExportJourney(c.Request.Context(), &req)
	if err != nil {
		response.InternalServerError(c, "Failed to export journey", err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Journey formatted and exported successfully", res)
}

