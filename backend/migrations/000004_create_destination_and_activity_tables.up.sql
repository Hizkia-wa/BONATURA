-- 000004_create_destination_and_activity_tables.up.sql
-- Destination & Activities: destinations, destination_cultural_elements, activities

-- 8. Table destinations
CREATE TABLE IF NOT EXISTS destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    address TEXT,
    village VARCHAR(150),
    district VARCHAR(150),
    regency VARCHAR(150),
    province VARCHAR(150),
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    opening_hours JSONB,
    ticket_price DECIMAL(12, 2),
    cover_image_url TEXT,
    publication_status publication_status_enum NOT NULL DEFAULT 'draft',
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Table destination_cultural_elements
CREATE TABLE IF NOT EXISTS destination_cultural_elements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    cultural_element_id UUID NOT NULL REFERENCES cultural_elements(id) ON DELETE CASCADE,
    relationship_note TEXT,
    CONSTRAINT uq_destination_cultural_element UNIQUE (destination_id, cultural_element_id)
);

-- 10. Table activities
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    community_id UUID REFERENCES communities(id) ON DELETE SET NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    description TEXT,
    activity_type VARCHAR(100),
    price DECIMAL(12, 2),
    duration_minutes INTEGER,
    schedule_info TEXT,
    contact VARCHAR(100),
    status activity_status_enum NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
