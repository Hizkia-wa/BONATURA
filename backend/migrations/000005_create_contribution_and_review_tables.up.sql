-- 000005_create_contribution_and_review_tables.up.sql
-- Community Contribution & Verification: submissions, submission_reviews

-- 11. Table submissions
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submitted_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    community_id UUID REFERENCES communities(id) ON DELETE SET NULL,
    content_type submission_content_type_enum NOT NULL,
    title VARCHAR(200) NOT NULL,
    proposed_data JSONB NOT NULL,
    status submission_status_enum NOT NULL DEFAULT 'pending',
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    review_note TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Table submission_reviews
CREATE TABLE IF NOT EXISTS submission_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    action submission_review_action_enum NOT NULL,
    review_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
