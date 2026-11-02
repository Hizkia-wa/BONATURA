package handler

import (
	"database/sql"
	"net/http"
	"time"

	"bonatura-backend/pkg/response"

	"github.com/gin-gonic/gin"
)

type HealthHandler struct {
	db *sql.DB
}

func NewHealthHandler(db *sql.DB) *HealthHandler {
	return &HealthHandler{db: db}
}

func (h *HealthHandler) HealthCheck(c *gin.Context) {
	dbStatus := "connected"
	if err := h.db.Ping(); err != nil {
		dbStatus = "disconnected"
	}

	response.Success(c, http.StatusOK, "BONATURA Backend API Service is active", gin.H{
		"service":   "BONATURA API",
		"version":   "1.0.0-mvp",
		"status":    "healthy",
		"database":  dbStatus,
		"timestamp": time.Now().UTC().Format(time.RFC3339),
	})
}
