-- 000007_create_indexes_and_triggers.up.sql
-- Indexes and automated updated_at triggers for BONATURA

-- ========================================================
-- 1. INDEXES
-- ========================================================

-- profiles
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON profiles(is_active);

-- communities
CREATE INDEX IF NOT EXISTS idx_communities_status ON communities(status);
CREATE INDEX IF NOT EXISTS idx_communities_created_by ON communities(created_by);

-- community_members
CREATE INDEX IF NOT EXISTS idx_community_members_profile_id ON community_members(profile_id);
CREATE INDEX IF NOT EXISTS idx_community_members_community_id ON community_members(community_id);

-- cultural_elements
CREATE INDEX IF NOT EXISTS idx_cultural_elements_category_id ON cultural_elements(category_id);
CREATE INDEX IF NOT EXISTS idx_cultural_elements_publication_status ON cultural_elements(publication_status);
CREATE INDEX IF NOT EXISTS idx_cultural_elements_verification_status ON cultural_elements(verification_status);

-- destinations
CREATE INDEX IF NOT EXISTS idx_destinations_regency_province ON destinations(regency, province);
CREATE INDEX IF NOT EXISTS idx_destinations_publication_status ON destinations(publication_status);
CREATE INDEX IF NOT EXISTS idx_destinations_coordinates ON destinations(latitude, longitude);

-- destination_cultural_elements
CREATE INDEX IF NOT EXISTS idx_dest_cult_destination ON destination_cultural_elements(destination_id);
CREATE INDEX IF NOT EXISTS idx_dest_cult_cultural_element ON destination_cultural_elements(cultural_element_id);

-- activities
CREATE INDEX IF NOT EXISTS idx_activities_destination_id ON activities(destination_id);
CREATE INDEX IF NOT EXISTS idx_activities_community_id ON activities(community_id);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);

-- sources
CREATE INDEX IF NOT EXISTS idx_sources_source_type ON sources(source_type);

-- cultural_element_sources
CREATE INDEX IF NOT EXISTS idx_cult_src_element ON cultural_element_sources(cultural_element_id);
CREATE INDEX IF NOT EXISTS idx_cult_src_source ON cultural_element_sources(source_id);

-- submissions
CREATE INDEX IF NOT EXISTS idx_submissions_submitted_by ON submissions(submitted_by);
CREATE INDEX IF NOT EXISTS idx_submissions_status_created ON submissions(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_community ON submissions(community_id);

-- submission_reviews
CREATE INDEX IF NOT EXISTS idx_submission_reviews_submission ON submission_reviews(submission_id);
CREATE INDEX IF NOT EXISTS idx_submission_reviews_reviewer ON submission_reviews(reviewer_id);

-- cultural_relations
CREATE INDEX IF NOT EXISTS idx_cultural_relations_source ON cultural_relations(source_element_id);
CREATE INDEX IF NOT EXISTS idx_cultural_relations_target ON cultural_relations(target_element_id);
CREATE INDEX IF NOT EXISTS idx_cultural_relations_type ON cultural_relations(relation_type);

-- media_assets
CREATE INDEX IF NOT EXISTS idx_media_assets_uploaded_by ON media_assets(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_media_assets_media_type ON media_assets(media_type);


-- ========================================================
-- 2. AUTOMATIC updated_at TRIGGER FUNCTION
-- ========================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON profiles;
CREATE TRIGGER trg_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_communities_updated_at ON communities;
CREATE TRIGGER trg_communities_updated_at
BEFORE UPDATE ON communities
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_cultural_elements_updated_at ON cultural_elements;
CREATE TRIGGER trg_cultural_elements_updated_at
BEFORE UPDATE ON cultural_elements
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_destinations_updated_at ON destinations;
CREATE TRIGGER trg_destinations_updated_at
BEFORE UPDATE ON destinations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_activities_updated_at ON activities;
CREATE TRIGGER trg_activities_updated_at
BEFORE UPDATE ON activities
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_submissions_updated_at ON submissions;
CREATE TRIGGER trg_submissions_updated_at
BEFORE UPDATE ON submissions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
