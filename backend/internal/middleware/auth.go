package middleware

import (
	"strings"

	"bonatura-backend/internal/domain"
	"bonatura-backend/pkg/response"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

const (
	ContextUserID   = "userID"
	ContextUserRole = "userRole"
)

// AuthOptional extracts user info if present, but does not block guests (Explorers)
func AuthOptional() gin.HandlerFunc {
	return func(c *gin.Context) {
		extractUserContext(c)
		c.Next()
	}
}

// RequireAuth ensures that the request is from an authenticated user (Contributor or Admin)
func RequireAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, ok := extractUserContext(c)
		if !ok || userID == uuid.Nil {
			response.Unauthorized(c, "Autentikasi diperlukan. Silakan login terlebih dahulu.")
			c.Abort()
			return
		}
		c.Next()
	}
}

// RequireRole enforces specific roles (e.g. Admin only, or Contributor/Admin)
func RequireRole(allowedRoles ...domain.Role) gin.HandlerFunc {
	return func(c *gin.Context) {
		roleVal, exists := c.Get(ContextUserRole)
		if !exists {
			response.Unauthorized(c, "Akses ditolak: identitas peran tidak ditemukan.")
			c.Abort()
			return
		}

		userRole := domain.Role(roleVal.(string))
		isAllowed := false
		for _, allowed := range allowedRoles {
			if userRole == allowed {
				isAllowed = true
				break
			}
		}

		if !isAllowed {
			response.Forbidden(c, "Akses ditolak: Anda tidak memiliki izin untuk tindakan ini.")
			c.Abort()
			return
		}

		c.Next()
	}
}

// Helper to extract user identity from Authorization header or Dev headers
func extractUserContext(c *gin.Context) (uuid.UUID, bool) {
	// 1. Direct header for fast dev/testing (e.g. Postman / Next.js server actions)
	devUserID := c.GetHeader("X-User-Id")
	devUserRole := c.GetHeader("X-User-Role")

	if devUserID != "" {
		parsedID, err := uuid.Parse(devUserID)
		if err == nil {
			c.Set(ContextUserID, parsedID)
			if devUserRole != "" {
				c.Set(ContextUserRole, devUserRole)
			} else {
				c.Set(ContextUserRole, string(domain.RoleContributor))
			}
			return parsedID, true
		}
	}

	// 2. Authorization Bearer token parsing
	authHeader := c.GetHeader("Authorization")
	if authHeader != "" && strings.HasPrefix(authHeader, "Bearer ") {
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		// In a full Supabase JWT environment, token claims are verified.
		// For our flexible MVP, if token is a valid UUID, parse directly
		if parsedID, err := uuid.Parse(tokenString); err == nil {
			c.Set(ContextUserID, parsedID)
			c.Set(ContextUserRole, string(domain.RoleContributor))
			return parsedID, true
		}
	}

	return uuid.Nil, false
}
