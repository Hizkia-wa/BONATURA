package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"bonatura-backend/internal/config"
	"bonatura-backend/internal/database"
	"bonatura-backend/internal/domain"
	"bonatura-backend/internal/handler"
	"bonatura-backend/internal/middleware"
	"bonatura-backend/internal/repository"
	"bonatura-backend/internal/service"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1. Load Configurations
	cfg := config.LoadConfig()

	if cfg.AppEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// 2. Initialize Database Connection
	db, err := database.NewPostgresDB(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("Failed to initialize database connection: %v", err)
	}
	defer db.Close()

	// 3. Initialize Repositories
	cultureRepo := repository.NewCultureRepository(db)
	destRepo := repository.NewDestinationRepository(db)
	commRepo := repository.NewCommunityRepository(db)
	subRepo := repository.NewSubmissionRepository(db)

	// 4. Initialize Services
	cultureSvc := service.NewCultureService(cultureRepo)
	destSvc := service.NewDestinationService(destRepo)
	commSvc := service.NewCommunityService(commRepo)
	subSvc := service.NewSubmissionService(subRepo)

	// 5. Initialize Handlers
	healthHandler := handler.NewHealthHandler(db)
	cultureHandler := handler.NewCultureHandler(cultureSvc)
	destHandler := handler.NewDestinationHandler(destSvc)
	commHandler := handler.NewCommunityHandler(commSvc)
	subHandler := handler.NewSubmissionHandler(subSvc)

	// 6. Router Setup
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(middleware.CORSMiddleware(cfg.FrontendURL))

	// 7. Register Routes
	v1 := r.Group("/api/v1")
	{
		// Health & Info
		v1.GET("/health", healthHandler.HealthCheck)

		// Public Routes (Explorer Access - No Login Required)
		cultureGroup := v1.Group("/culture")
		{
			cultureGroup.GET("/categories", cultureHandler.GetCategories)
			cultureGroup.GET("/categories/:slug", cultureHandler.GetCategoryBySlug)
			cultureGroup.GET("/elements", cultureHandler.GetElements)
			cultureGroup.GET("/elements/:slug", cultureHandler.GetElementBySlug)
			cultureGroup.GET("/elements/:id/graph", cultureHandler.GetKnowledgeGraph)
		}

		destGroup := v1.Group("/destinations")
		{
			destGroup.GET("", destHandler.GetDestinations)
			destGroup.GET("/:slug", destHandler.GetDestinationBySlug)
		}

		actGroup := v1.Group("/activities")
		{
			actGroup.GET("", destHandler.GetActivities)
			actGroup.GET("/:slug", destHandler.GetActivityBySlug)
		}

		commGroup := v1.Group("/communities")
		{
			commGroup.GET("", commHandler.GetCommunities)
			commGroup.GET("/:slug", commHandler.GetCommunityBySlug)
		}

		// Authenticated Routes (Contributor & Admin)
		authGroup := v1.Group("")
		authGroup.Use(middleware.RequireAuth())
		{
			// Community creation
			authGroup.POST("/communities", middleware.RequireRole(domain.RoleContributor, domain.RoleAdmin), commHandler.CreateCommunity)

			// Submissions
			authGroup.POST("/submissions", middleware.RequireRole(domain.RoleContributor, domain.RoleAdmin), subHandler.CreateSubmission)
			authGroup.GET("/submissions", middleware.RequireRole(domain.RoleContributor, domain.RoleAdmin), subHandler.GetSubmissions)
			authGroup.GET("/submissions/:id", middleware.RequireRole(domain.RoleContributor, domain.RoleAdmin), subHandler.GetSubmissionByID)

			// Admin Only: Review & Verify Submissions
			authGroup.POST("/submissions/:id/review", middleware.RequireRole(domain.RoleAdmin), subHandler.ReviewSubmission)
		}
	}

	// 8. Start HTTP Server with Graceful Shutdown
	srv := &http.Server{
		Addr:    ":" + cfg.Port,
		Handler: r,
	}

	go func() {
		log.Printf("======================================================")
		log.Printf("🚀 BONATURA Backend API running on port %s", cfg.Port)
		log.Printf("📡 Health Check: http://localhost:%s/api/v1/health", cfg.Port)
		log.Printf("======================================================")
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server error: %s\n", err)
		}
	}()

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down BONATURA server gracefully...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("BONATURA server exited cleanly.")
}
