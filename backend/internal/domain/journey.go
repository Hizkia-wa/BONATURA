package domain

import (
	"time"
)

type JourneyStop struct {
	ID                  string `json:"id"`
	StepNumber          int    `json:"step_number"`
	TimeSlot            string `json:"time_slot"`
	TimePeriod          string `json:"time_period"`
	DestinationName     string `json:"destination_name"`
	DestinationID       string `json:"destination_id"`
	Area                string `json:"area"`
	ActivityTitle       string `json:"activity_title"`
	ActivityDescription string `json:"activity_description"`
	CulturalPillar      string `json:"cultural_pillar"`
	DurationMinutes     int    `json:"duration_minutes"`
	DurationText        string `json:"duration_text"`
	EstimatedCost       string `json:"estimated_cost"`
	CostAmount          int    `json:"cost_amount"`
	CulturalEtiquette   string `json:"cultural_etiquette"`
	TransferNote        string `json:"transfer_note,omitempty"`
	ImageURL            string `json:"image_url,omitempty"`
}

type JourneyDay struct {
	DayNumber  int           `json:"day_number"`
	ThemeTitle string        `json:"theme_title"`
	DaySummary string        `json:"day_summary"`
	Stops      []JourneyStop `json:"stops"`
}

type Journey struct {
	ID                 string       `json:"id"`
	Title              string       `json:"title"`
	CreatedAt          time.Time    `json:"created_at"`
	DurationDays       int          `json:"duration_days"`
	SelectedInterests  []string     `json:"selected_interests"`
	RegionFocus        string       `json:"region_focus"`
	Pace               string       `json:"pace"`
	StopsCount         int          `json:"stops_count"`
	EstimatedTotalCost int          `json:"estimated_total_cost"`
	ItineraryDays      []JourneyDay `json:"itinerary_days"`
	WhatsAppURL        string       `json:"whatsapp_url,omitempty"`
	FormattedText      string       `json:"formatted_text,omitempty"`
}

type ExportJourneyRequest struct {
	Title              string       `json:"title"`
	DurationDays       int          `json:"duration_days"`
	SelectedInterests  []string     `json:"selected_interests"`
	RegionFocus        string       `json:"region_focus"`
	Pace               string       `json:"pace"`
	EstimatedTotalCost int          `json:"estimated_total_cost"`
	ItineraryDays      []JourneyDay `json:"itinerary_days"`
	TargetPhoneNumber  string       `json:"target_phone_number,omitempty"`
}

type ExportJourneyResponse struct {
	Title            string `json:"title"`
	FormattedText    string `json:"formatted_text"`
	WhatsAppURL      string `json:"whatsapp_url"`
	DownloadFileName string `json:"download_file_name"`
	DownloadContent  string `json:"download_content"`
}

