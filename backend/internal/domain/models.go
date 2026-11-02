package domain

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

// ==========================================
// ENUMS
// ==========================================

type Role string

const (
	RoleContributor Role = "contributor"
	RoleAdmin       Role = "admin"
)

type CommunityStatus string

const (
	CommunityStatusPending  CommunityStatus = "pending"
	CommunityStatusVerified CommunityStatus = "verified"
	CommunityStatusRejected CommunityStatus = "rejected"
)

type MemberRole string

const (
	MemberRoleOwner  MemberRole = "owner"
	MemberRoleMember MemberRole = "member"
)

type VerificationStatus string

const (
	VerificationStatusDraft    VerificationStatus = "draft"
	VerificationStatusVerified VerificationStatus = "verified"
	VerificationStatusRejected VerificationStatus = "rejected"
)

type PublicationStatus string

const (
	PublicationStatusDraft     PublicationStatus = "draft"
	PublicationStatusPublished PublicationStatus = "published"
	PublicationStatusArchived  PublicationStatus = "archived"
)

type SourceType string

const (
	SourceTypeBook      SourceType = "book"
	SourceTypeArticle   SourceType = "article"
	SourceTypeWebsite   SourceType = "website"
	SourceTypeInterview SourceType = "interview"
	SourceTypeDocument  SourceType = "document"
	SourceTypeOther     SourceType = "other"
)

type ActivityStatus string

const (
	ActivityStatusDraft     ActivityStatus = "draft"
	ActivityStatusPublished ActivityStatus = "published"
	ActivityStatusInactive  ActivityStatus = "inactive"
)

type SubmissionContentType string

const (
	SubmissionContentCulture     SubmissionContentType = "culture"
	SubmissionContentDestination SubmissionContentType = "destination"
	SubmissionContentActivity    SubmissionContentType = "activity"
)

type SubmissionStatus string

const (
	SubmissionStatusPending  SubmissionStatus = "pending"
	SubmissionStatusApproved SubmissionStatus = "approved"
	SubmissionStatusRejected SubmissionStatus = "rejected"
)

type SubmissionReviewAction string

const (
	SubmissionActionApproved          SubmissionReviewAction = "approved"
	SubmissionActionRejected          SubmissionReviewAction = "rejected"
	SubmissionActionRequestedRevision SubmissionReviewAction = "requested_revision"
)

type RelationVerificationStatus string

const (
	RelationPending  RelationVerificationStatus = "pending"
	RelationVerified RelationVerificationStatus = "verified"
	RelationRejected RelationVerificationStatus = "rejected"
)

type MediaType string

const (
	MediaTypeImage MediaType = "image"
	MediaTypeVideo MediaType = "video"
	MediaTypeAudio MediaType = "audio"
)

// ==========================================
// 1. USER MANAGEMENT
// ==========================================

// Profile (Table: profiles)
type Profile struct {
	ID          uuid.UUID `json:"id"`
	FullName    string    `json:"full_name"`
	Email       string    `json:"email"`
	AvatarURL   *string   `json:"avatar_url,omitempty"`
	Role        Role      `json:"role"`
	Bio         *string   `json:"bio,omitempty"`
	PhoneNumber *string   `json:"phone_number,omitempty"`
	IsActive    bool      `json:"is_active"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// Community (Table: communities)
type Community struct {
	ID           uuid.UUID       `json:"id"`
	Name         string          `json:"name"`
	Slug         string          `json:"slug"`
	Description  *string         `json:"description,omitempty"`
	Location     *string         `json:"location,omitempty"`
	Address      *string         `json:"address,omitempty"`
	ContactEmail *string         `json:"contact_email,omitempty"`
	ContactPhone *string         `json:"contact_phone,omitempty"`
	ImageURL     *string         `json:"image_url,omitempty"`
	Status       CommunityStatus `json:"status"`
	CreatedBy    *uuid.UUID      `json:"created_by,omitempty"`
	CreatedAt    time.Time       `json:"created_at"`
	UpdatedAt    time.Time       `json:"updated_at"`

	// Joined fields
	CreatorName *string `json:"creator_name,omitempty"`
}

// CommunityMember (Table: community_members)
type CommunityMember struct {
	ID          uuid.UUID  `json:"id"`
	CommunityID uuid.UUID  `json:"community_id"`
	ProfileID   uuid.UUID  `json:"profile_id"`
	MemberRole  MemberRole `json:"member_role"`
	JoinedAt    time.Time  `json:"joined_at"`

	// Joined fields
	Profile *Profile `json:"profile,omitempty"`
}

// ==========================================
// 2. CULTURAL CONTENT
// ==========================================

// CulturalCategory (Table: cultural_categories)
type CulturalCategory struct {
	ID          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Slug        string    `json:"slug"`
	Description *string   `json:"description,omitempty"`
	IconName    *string   `json:"icon_name,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
}

// CulturalElement (Table: cultural_elements)
type CulturalElement struct {
	ID                 uuid.UUID          `json:"id"`
	CategoryID         uuid.UUID          `json:"category_id"`
	Name               string             `json:"name"`
	Slug               string             `json:"slug"`
	ShortDescription   *string            `json:"short_description,omitempty"`
	Description        *string            `json:"description,omitempty"`
	History            *string            `json:"history,omitempty"`
	Philosophy         *string            `json:"philosophy,omitempty"`
	CulturalContext    *string            `json:"cultural_context,omitempty"`
	Region             *string            `json:"region,omitempty"`
	CoverImageURL      *string            `json:"cover_image_url,omitempty"`
	VerificationStatus VerificationStatus `json:"verification_status"`
	PublicationStatus  PublicationStatus  `json:"publication_status"`
	CreatedBy          *uuid.UUID         `json:"created_by,omitempty"`
	VerifiedBy         *uuid.UUID         `json:"verified_by,omitempty"`
	VerifiedAt         *time.Time         `json:"verified_at,omitempty"`
	CreatedAt          time.Time          `json:"created_at"`
	UpdatedAt          time.Time          `json:"updated_at"`

	// Relational extras
	Category     *CulturalCategory   `json:"category,omitempty"`
	Sources      []SourceWithNote    `json:"sources,omitempty"`
	Relations    []CulturalRelation  `json:"relations,omitempty"`
	Destinations []DestinationSimple `json:"destinations,omitempty"`
}

// Source (Table: sources)
type Source struct {
	ID          uuid.UUID  `json:"id"`
	Title       string     `json:"title"`
	SourceType  SourceType `json:"source_type"`
	Publisher   *string    `json:"publisher,omitempty"`
	Author      *string    `json:"author,omitempty"`
	URL         *string    `json:"url,omitempty"`
	PublishedAt *string    `json:"published_at,omitempty"`
	AccessedAt  *time.Time `json:"accessed_at,omitempty"`
	Notes       *string    `json:"notes,omitempty"`
	CreatedAt   time.Time  `json:"created_at"`
}

// CulturalElementSource (Table: cultural_element_sources)
type CulturalElementSource struct {
	ID                uuid.UUID `json:"id"`
	CulturalElementID uuid.UUID `json:"cultural_element_id"`
	SourceID          uuid.UUID `json:"source_id"`
	Note              *string   `json:"note,omitempty"`
	CreatedAt         time.Time `json:"created_at"`
}

type SourceWithNote struct {
	Source
	Note *string `json:"note,omitempty"`
}

// ==========================================
// 3. DESTINATIONS & ACTIVITIES
// ==========================================

// Destination (Table: destinations)
type Destination struct {
	ID                uuid.UUID         `json:"id"`
	Name              string            `json:"name"`
	Slug              string            `json:"slug"`
	ShortDescription  *string           `json:"short_description,omitempty"`
	Description       *string           `json:"description,omitempty"`
	Address           *string           `json:"address,omitempty"`
	Village           *string           `json:"village,omitempty"`
	District          *string           `json:"district,omitempty"`
	Regency           *string           `json:"regency,omitempty"`
	Province          *string           `json:"province,omitempty"`
	Latitude          float64           `json:"latitude"`
	Longitude         float64           `json:"longitude"`
	OpeningHours      json.RawMessage   `json:"opening_hours,omitempty"`
	TicketPrice       *float64          `json:"ticket_price,omitempty"`
	CoverImageURL     *string           `json:"cover_image_url,omitempty"`
	PublicationStatus PublicationStatus `json:"publication_status"`
	CreatedBy         *uuid.UUID        `json:"created_by,omitempty"`
	CreatedAt         time.Time         `json:"created_at"`
	UpdatedAt         time.Time         `json:"updated_at"`

	// Relational extras
	CulturalElements []CulturalElementSimple `json:"cultural_elements,omitempty"`
	Activities       []Activity              `json:"activities,omitempty"`
}

type DestinationSimple struct {
	ID               uuid.UUID `json:"id"`
	Name             string    `json:"name"`
	Slug             string    `json:"slug"`
	CoverImageURL    *string   `json:"cover_image_url,omitempty"`
	Regency          *string   `json:"regency,omitempty"`
	Latitude         float64   `json:"latitude"`
	Longitude        float64   `json:"longitude"`
	RelationshipNote *string   `json:"relationship_note,omitempty"`
}

type CulturalElementSimple struct {
	ID               uuid.UUID `json:"id"`
	Name             string    `json:"name"`
	Slug             string    `json:"slug"`
	CoverImageURL    *string   `json:"cover_image_url,omitempty"`
	CategoryName     string    `json:"category_name"`
	RelationshipNote *string   `json:"relationship_note,omitempty"`
}

// DestinationCulturalElement (Table: destination_cultural_elements)
type DestinationCulturalElement struct {
	ID                uuid.UUID `json:"id"`
	DestinationID     uuid.UUID `json:"destination_id"`
	CulturalElementID uuid.UUID `json:"cultural_element_id"`
	RelationshipNote  *string   `json:"relationship_note,omitempty"`
}

// Activity (Table: activities)
type Activity struct {
	ID              uuid.UUID      `json:"id"`
	DestinationID   uuid.UUID      `json:"destination_id"`
	CommunityID     *uuid.UUID     `json:"community_id,omitempty"`
	Name            string         `json:"name"`
	Slug            string         `json:"slug"`
	Description     *string        `json:"description,omitempty"`
	ActivityType    *string        `json:"activity_type,omitempty"`
	Price           *float64       `json:"price,omitempty"`
	DurationMinutes *int           `json:"duration_minutes,omitempty"`
	ScheduleInfo    *string        `json:"schedule_info,omitempty"`
	Contact         *string        `json:"contact,omitempty"`
	Status          ActivityStatus `json:"status"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`

	// Extras
	DestinationName *string `json:"destination_name,omitempty"`
	CommunityName   *string `json:"community_name,omitempty"`
}

// ==========================================
// 4. SUBMISSIONS & REVIEWS
// ==========================================

// Submission (Table: submissions)
type Submission struct {
	ID           uuid.UUID             `json:"id"`
	SubmittedBy  uuid.UUID             `json:"submitted_by"`
	CommunityID  *uuid.UUID            `json:"community_id,omitempty"`
	ContentType  SubmissionContentType `json:"content_type"`
	Title        string                `json:"title"`
	ProposedData json.RawMessage       `json:"proposed_data"`
	Status       SubmissionStatus      `json:"status"`
	ReviewedBy   *uuid.UUID            `json:"reviewed_by,omitempty"`
	ReviewNote   *string               `json:"review_note,omitempty"`
	ReviewedAt   *time.Time            `json:"reviewed_at,omitempty"`
	CreatedAt    time.Time             `json:"created_at"`
	UpdatedAt    time.Time             `json:"updated_at"`

	// Relational extras
	SubmitterName *string            `json:"submitter_name,omitempty"`
	CommunityName *string            `json:"community_name,omitempty"`
	Reviews       []SubmissionReview `json:"reviews,omitempty"`
}

// SubmissionReview (Table: submission_reviews)
type SubmissionReview struct {
	ID           uuid.UUID              `json:"id"`
	SubmissionID uuid.UUID              `json:"submission_id"`
	ReviewerID   uuid.UUID              `json:"reviewer_id"`
	Action       SubmissionReviewAction `json:"action"`
	ReviewNote   *string                `json:"review_note,omitempty"`
	CreatedAt    time.Time              `json:"created_at"`

	// Extras
	ReviewerName *string `json:"reviewer_name,omitempty"`
}

// ==========================================
// 5. CULTURAL KNOWLEDGE GRAPH
// ==========================================

// CulturalRelation (Table: cultural_relations)
type CulturalRelation struct {
	ID                 uuid.UUID                  `json:"id"`
	SourceElementID    uuid.UUID                  `json:"source_element_id"`
	TargetElementID    uuid.UUID                  `json:"target_element_id"`
	RelationType       string                     `json:"relation_type"`
	Description        *string                    `json:"description,omitempty"`
	SourceID           *uuid.UUID                 `json:"source_id,omitempty"`
	VerificationStatus RelationVerificationStatus `json:"verification_status"`
	CreatedAt          time.Time                  `json:"created_at"`

	// Extras
	TargetElementName  *string `json:"target_element_name,omitempty"`
	TargetElementSlug  *string `json:"target_element_slug,omitempty"`
	TargetCoverImage   *string `json:"target_cover_image,omitempty"`
	SourceTitle        *string `json:"source_title,omitempty"`
}

// ==========================================
// 6. MEDIA ASSETS
// ==========================================

// MediaAsset (Table: media_assets)
type MediaAsset struct {
	ID          uuid.UUID  `json:"id"`
	FileName    string     `json:"file_name"`
	StoragePath string     `json:"storage_path"`
	PublicURL   string     `json:"public_url"`
	MediaType   MediaType  `json:"media_type"`
	MimeType    *string    `json:"mime_type,omitempty"`
	AltText     *string    `json:"alt_text,omitempty"`
	Caption     *string    `json:"caption,omitempty"`
	UploadedBy  *uuid.UUID `json:"uploaded_by,omitempty"`
	CreatedAt   time.Time  `json:"created_at"`
}
