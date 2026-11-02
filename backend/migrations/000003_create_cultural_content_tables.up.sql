-- 000003_create_cultural_content_tables.up.sql
-- Cultural Content: cultural_categories, cultural_elements, sources, cultural_element_sources

-- 4. Table cultural_categories
CREATE TABLE IF NOT EXISTS cultural_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    icon_name VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Table cultural_elements
CREATE TABLE IF NOT EXISTS cultural_elements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES cultural_categories(id) ON DELETE RESTRICT,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    history TEXT,
    philosophy TEXT,
    cultural_context TEXT,
    region VARCHAR(150),
    cover_image_url TEXT,
    verification_status verification_status_enum NOT NULL DEFAULT 'draft',
    publication_status publication_status_enum NOT NULL DEFAULT 'draft',
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    verified_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Table sources
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    source_type source_type_enum NOT NULL,
    publisher VARCHAR(200),
    author VARCHAR(200),
    url TEXT,
    published_at DATE,
    accessed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Table cultural_element_sources
CREATE TABLE IF NOT EXISTS cultural_element_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cultural_element_id UUID NOT NULL REFERENCES cultural_elements(id) ON DELETE CASCADE,
    source_id UUID NOT NULL REFERENCES sources(id) ON DELETE RESTRICT,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_cultural_element_source UNIQUE (cultural_element_id, source_id)
);
