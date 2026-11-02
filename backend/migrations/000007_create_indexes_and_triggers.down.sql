-- 000007_create_indexes_and_triggers.down.sql

DROP TRIGGER IF EXISTS trg_submissions_updated_at ON submissions;
DROP TRIGGER IF EXISTS trg_activities_updated_at ON activities;
DROP TRIGGER IF EXISTS trg_destinations_updated_at ON destinations;
DROP TRIGGER IF EXISTS trg_cultural_elements_updated_at ON cultural_elements;
DROP TRIGGER IF EXISTS trg_communities_updated_at ON communities;
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON profiles;

DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop indexes
DROP INDEX IF EXISTS idx_media_assets_media_type;
DROP INDEX IF EXISTS idx_media_assets_uploaded_by;
DROP INDEX IF EXISTS idx_cultural_relations_type;
DROP INDEX IF EXISTS idx_cultural_relations_target;
DROP INDEX IF EXISTS idx_cultural_relations_source;
DROP INDEX IF EXISTS idx_submission_reviews_reviewer;
DROP INDEX IF EXISTS idx_submission_reviews_submission;
DROP INDEX IF EXISTS idx_submissions_community;
DROP INDEX IF EXISTS idx_submissions_status_created;
DROP INDEX IF EXISTS idx_submissions_submitted_by;
DROP INDEX IF EXISTS idx_cult_src_source;
DROP INDEX IF EXISTS idx_cult_src_element;
DROP INDEX IF EXISTS idx_sources_source_type;
DROP INDEX IF EXISTS idx_activities_status;
DROP INDEX IF EXISTS idx_activities_community_id;
DROP INDEX IF EXISTS idx_activities_destination_id;
DROP INDEX IF EXISTS idx_dest_cult_cultural_element;
DROP INDEX IF EXISTS idx_dest_cult_destination;
DROP INDEX IF EXISTS idx_destinations_coordinates;
DROP INDEX IF EXISTS idx_destinations_publication_status;
DROP INDEX IF EXISTS idx_destinations_regency_province;
DROP INDEX IF EXISTS idx_cultural_elements_verification_status;
DROP INDEX IF EXISTS idx_cultural_elements_publication_status;
DROP INDEX IF EXISTS idx_cultural_elements_category_id;
DROP INDEX IF EXISTS idx_community_members_community_id;
DROP INDEX IF EXISTS idx_community_members_profile_id;
DROP INDEX IF EXISTS idx_communities_created_by;
DROP INDEX IF EXISTS idx_communities_status;
DROP INDEX IF EXISTS idx_profiles_is_active;
DROP INDEX IF EXISTS idx_profiles_role;
