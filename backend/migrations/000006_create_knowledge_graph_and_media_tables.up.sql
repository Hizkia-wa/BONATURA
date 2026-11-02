-- 000006_create_knowledge_graph_and_media_tables.up.sql
-- Cultural Knowledge Graph & Media Assets: cultural_relations, media_assets

-- 13. Table cultural_relations
CREATE TABLE IF NOT EXISTS cultural_relations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_element_id UUID NOT NULL REFERENCES cultural_elements(id) ON DELETE CASCADE,
    target_element_id UUID NOT NULL REFERENCES cultural_elements(id) ON DELETE CASCADE,
    relation_type VARCHAR(100) NOT NULL,
    description TEXT,
    source_id UUID REFERENCES sources(id) ON DELETE SET NULL,
    verification_status relation_verification_status_enum NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Table media_assets
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name VARCHAR(255) NOT NULL,
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    media_type media_type_enum NOT NULL DEFAULT 'image',
    mime_type VARCHAR(100),
    alt_text TEXT,
    caption TEXT,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
