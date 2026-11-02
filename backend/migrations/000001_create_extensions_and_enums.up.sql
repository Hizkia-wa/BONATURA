-- 000001_create_extensions_and_enums.up.sql
-- BONATURA: AI-Powered Cultural Discovery & Tourism Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Role Enum
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_enum') THEN
        CREATE TYPE role_enum AS ENUM ('contributor', 'admin');
    END IF;
END $$;

-- 2. Community Status Enum
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'community_status_enum') THEN
        CREATE TYPE community_status_enum AS ENUM ('pending', 'verified', 'rejected');
    END IF;
END $$;

-- 3. Community Member Role Enum
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'member_role_enum') THEN
        CREATE TYPE member_role_enum AS ENUM ('owner', 'member');
    END IF;
END $$;

-- 4. Verification Status Enum (Content)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'verification_status_enum') THEN
        CREATE TYPE verification_status_enum AS ENUM ('draft', 'verified', 'rejected');
    END IF;
END $$;

-- 5. Publication Status Enum
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'publication_status_enum') THEN
        CREATE TYPE publication_status_enum AS ENUM ('draft', 'published', 'archived');
    END IF;
END $$;

-- 6. Source Type Enum
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'source_type_enum') THEN
        CREATE TYPE source_type_enum AS ENUM ('book', 'article', 'website', 'interview', 'document', 'other');
    END IF;
END $$;

-- 7. Activity Status Enum
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'activity_status_enum') THEN
        CREATE TYPE activity_status_enum AS ENUM ('draft', 'published', 'inactive');
    END IF;
END $$;

-- 8. Submission Content Type Enum
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'submission_content_type_enum') THEN
        CREATE TYPE submission_content_type_enum AS ENUM ('culture', 'destination', 'activity');
    END IF;
END $$;

-- 9. Submission Status Enum
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'submission_status_enum') THEN
        CREATE TYPE submission_status_enum AS ENUM ('pending', 'approved', 'rejected');
    END IF;
END $$;

-- 10. Submission Review Action Enum
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'submission_review_action_enum') THEN
        CREATE TYPE submission_review_action_enum AS ENUM ('approved', 'rejected', 'requested_revision');
    END IF;
END $$;

-- 11. Relation Verification Status Enum
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'relation_verification_status_enum') THEN
        CREATE TYPE relation_verification_status_enum AS ENUM ('pending', 'verified', 'rejected');
    END IF;
END $$;

-- 12. Media Type Enum
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'media_type_enum') THEN
        CREATE TYPE media_type_enum AS ENUM ('image', 'video', 'audio');
    END IF;
END $$;
