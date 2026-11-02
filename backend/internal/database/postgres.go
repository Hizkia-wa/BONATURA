package database

import (
	"database/sql"
	"log"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func NewPostgresDB(databaseURL string) (*sql.DB, error) {
	db, err := sql.Open("pgx", databaseURL)
	if err != nil {
		return nil, err
	}

	// Connection Pool Settings
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(10)
	db.SetConnMaxLifetime(15 * time.Minute)
	db.SetConnMaxIdleTime(5 * time.Minute)

	// Verify connection
	if err := db.Ping(); err != nil {
		log.Printf("[Database] Initial ping failed: %v (Backend will keep running, check Postgres connection)", err)
		return db, nil
	}

	log.Println("[Database] Connected successfully to PostgreSQL via pgx!")
	return db, nil
}
