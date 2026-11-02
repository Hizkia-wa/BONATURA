package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strconv"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main() {
	// Try loading .env from current directory, or one level up
	_ = godotenv.Load()
	_ = godotenv.Load("../.env")

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		// Default local development fallback if not set
		dbURL = "postgres://postgres:postgres@localhost:5432/bonatura?sslmode=disable"
		log.Printf("DATABASE_URL is not set in environment or .env, using default: %s", dbURL)
	}

	migrationsPath := os.Getenv("MIGRATIONS_PATH")
	if migrationsPath == "" {
		// Detect migrations path relative to working dir
		if _, err := os.Stat("migrations"); err == nil {
			migrationsPath = "migrations"
		} else if _, err := os.Stat("../migrations"); err == nil {
			migrationsPath = "../migrations"
		} else {
			migrationsPath = "migrations"
		}
	}

	absPath, err := filepath.Abs(migrationsPath)
	if err != nil {
		log.Fatalf("Failed to resolve migrations path: %v", err)
	}

	// Connect to postgres
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("Failed to open database connection: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Printf("Warning: Database ping failed (%v). Ensure Postgres is running.", err)
	}

	driver, err := postgres.WithInstance(db, &postgres.Config{
		DatabaseName: "bonatura",
	})
	if err != nil {
		log.Fatalf("Failed to create postgres driver: %v", err)
	}

	sourceURL := fmt.Sprintf("file://%s", filepath.ToSlash(absPath))
	m, err := migrate.NewWithDatabaseInstance(sourceURL, "postgres", driver)
	if err != nil {
		log.Fatalf("Failed to initialize migrate: %v", err)
	}

	flag.Parse()
	args := flag.Args()
	if len(args) == 0 {
		printUsage()
		return
	}

	command := args[0]
	switch command {
	case "up":
		log.Println("Running migrations UP...")
		if err := m.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Migration UP failed: %v", err)
		}
		log.Println("✓ Migrations applied successfully!")
		printVersion(m)

	case "down":
		steps := 1
		if len(args) > 1 {
			if parsed, err := strconv.Atoi(args[1]); err == nil && parsed > 0 {
				steps = parsed
			}
		}
		log.Printf("Rolling back %d migration step(s) DOWN...\n", steps)
		if err := m.Steps(-steps); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Migration DOWN failed: %v", err)
		}
		log.Println("✓ Rollback completed successfully!")
		printVersion(m)

	case "version":
		printVersion(m)

	case "force":
		if len(args) < 2 {
			log.Fatal("Error: force command requires a version argument (e.g. force 1)")
		}
		v, err := strconv.Atoi(args[1])
		if err != nil {
			log.Fatalf("Invalid version '%s': %v", args[1], err)
		}
		if err := m.Force(v); err != nil {
			log.Fatalf("Migration FORCE failed: %v", err)
		}
		log.Printf("✓ Migration forced to version %d", v)

	default:
		printUsage()
	}
}

func printVersion(m *migrate.Migrate) {
	v, dirty, err := m.Version()
	if err != nil {
		if err == migrate.ErrNilVersion {
			fmt.Println("Current migration version: 0 (No migrations applied yet)")
			return
		}
		fmt.Printf("Unable to get current version: %v\n", err)
		return
	}
	fmt.Printf("Current migration version: %d (dirty: %t)\n", v, dirty)
}

func printUsage() {
	fmt.Println("BONATURA Database Migration CLI")
	fmt.Println("Usage:")
	fmt.Println("  go run cmd/migrate/main.go up            # Apply all pending migrations")
	fmt.Println("  go run cmd/migrate/main.go down [steps]  # Rollback 1 or N migrations")
	fmt.Println("  go run cmd/migrate/main.go version       # Print current migration version")
	fmt.Println("  go run cmd/migrate/main.go force <ver>   # Clear dirty state to specific version")
}
