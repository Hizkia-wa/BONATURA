package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port         string
	AppEnv       string
	DatabaseURL  string
	SupabaseURL  string
	SupabaseKey  string
	JWTSecret    string
	FrontendURL  string
}

func LoadConfig() *Config {
	// Load .env if present
	_ = godotenv.Load()
	_ = godotenv.Load("../.env")

	port := getEnv("PORT", "8080")
	env := getEnv("APP_ENV", "development")
	dbURL := getEnv("DATABASE_URL", "postgres://postgres:postgres@localhost:5432/bonatura?sslmode=disable")
	supabaseURL := getEnv("SUPABASE_URL", "")
	supabaseKey := getEnv("SUPABASE_ANON_KEY", "")
	jwtSecret := getEnv("JWT_SECRET", "super-secret-bonatura-key")
	frontendURL := getEnv("FRONTEND_URL", "http://localhost:3000")

	log.Printf("[Config] Loaded environment: %s, Server port: %s", env, port)

	return &Config{
		Port:        port,
		AppEnv:      env,
		DatabaseURL: dbURL,
		SupabaseURL: supabaseURL,
		SupabaseKey: supabaseKey,
		JWTSecret:   jwtSecret,
		FrontendURL: frontendURL,
	}
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
