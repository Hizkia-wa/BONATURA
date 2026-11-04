package service

import (
	"context"
	"fmt"
	"net/url"
	"strings"
	"time"

	"bonatura-backend/internal/domain"
	"bonatura-backend/internal/repository"
)

type JourneyService interface {
	SaveJourney(ctx context.Context, j *domain.Journey) (*domain.Journey, error)
	GetJourneys(ctx context.Context) ([]domain.Journey, error)
	GetJourneyByID(ctx context.Context, id string) (*domain.Journey, error)
	ExportJourney(ctx context.Context, req *domain.ExportJourneyRequest) (*domain.ExportJourneyResponse, error)
}

type journeyService struct {
	repo repository.JourneyRepository
}

func NewJourneyService(repo repository.JourneyRepository) JourneyService {
	return &journeyService{repo: repo}
}

func (s *journeyService) BuildFormattedSummary(title string, durationDays int, region string, totalCost int, days []domain.JourneyDay) string {
	var b strings.Builder

	b.WriteString("🏛️ *BONATURA — PERSONALIZED CULTURAL JOURNEY*\n")
	b.WriteString(fmt.Sprintf("📍 *%s*\n", title))
	b.WriteString(fmt.Sprintf("⏱️ *Durasi:* %d Hari (%d Hari Perjalanan Budaya)\n", durationDays, durationDays))
	if region != "" && region != "Semua" {
		b.WriteString(fmt.Sprintf("🗺️ *Fokus Wilayah:* %s\n", region))
	} else {
		b.WriteString("🗺️ *Fokus Wilayah:* Kawasan Danau Toba & Batak Nusantara\n")
	}
	if totalCost > 0 {
		b.WriteString(fmt.Sprintf("💰 *Estimasi Total Biaya:* Rp %d\n", totalCost))
	}
	b.WriteString("────────────────────────────\n\n")

	for _, day := range days {
		b.WriteString(fmt.Sprintf("📅 *%s*\n", day.ThemeTitle))
		if day.DaySummary != "" {
			b.WriteString(fmt.Sprintf("_%s_\n", day.DaySummary))
		}
		b.WriteString("\n")

		for _, stop := range day.Stops {
			b.WriteString(fmt.Sprintf("  %d. [%s] *%s* (%s)\n", stop.StepNumber, stop.TimeSlot, stop.DestinationName, stop.Area))
			b.WriteString(fmt.Sprintf("     • *Aktivitas:* %s\n", stop.ActivityTitle))
			if stop.EstimatedCost != "" {
				b.WriteString(fmt.Sprintf("     • *Estimasi Tiket/Aktivitas:* %s\n", stop.EstimatedCost))
			}
			if stop.CulturalEtiquette != "" {
				b.WriteString(fmt.Sprintf("     • *Etika Adat:* %s\n", stop.CulturalEtiquette))
			}
			if stop.TransferNote != "" {
				b.WriteString(fmt.Sprintf("     ↳ _Perjalanan: %s_\n", stop.TransferNote))
			}
			b.WriteString("\n")
		}
		b.WriteString("────────────────────────────\n\n")
	}

	b.WriteString("🌿 *Prinsip Pelestarian Budaya:*\n")
	b.WriteString("Selalu hargai kearifan lokal masyarakat adat Batak, hormati situs megalitikum & makam leluhur, serta dukung perajin tenun & pemandu lokal.\n\n")
	b.WriteString("📲 Disusun secara cerdas melalui Platform Budaya *BONATURA*\n")

	return b.String()
}

func (s *journeyService) BuildWhatsAppURL(targetPhone string, messageText string) string {
	escapedText := url.QueryEscape(messageText)
	if targetPhone != "" {
		// Clean phone number
		cleanPhone := strings.ReplaceAll(targetPhone, " ", "")
		cleanPhone = strings.ReplaceAll(cleanPhone, "-", "")
		cleanPhone = strings.ReplaceAll(cleanPhone, "+", "")
		return fmt.Sprintf("https://api.whatsapp.com/send?phone=%s&text=%s", cleanPhone, escapedText)
	}
	return fmt.Sprintf("https://api.whatsapp.com/send?text=%s", escapedText)
}

func (s *journeyService) SaveJourney(ctx context.Context, j *domain.Journey) (*domain.Journey, error) {
	if j.Title == "" {
		j.Title = fmt.Sprintf("Rencana Perjalanan Budaya Toba (%d Hari)", j.DurationDays)
	}
	if j.DurationDays <= 0 {
		j.DurationDays = len(j.ItineraryDays)
	}
	if j.DurationDays <= 0 {
		j.DurationDays = 1
	}

	totalStops := 0
	totalCost := 0
	for _, d := range j.ItineraryDays {
		totalStops += len(d.Stops)
		for _, st := range d.Stops {
			totalCost += st.CostAmount
		}
	}
	j.StopsCount = totalStops
	if j.EstimatedTotalCost <= 0 {
		j.EstimatedTotalCost = totalCost
	}

	formatted := s.BuildFormattedSummary(j.Title, j.DurationDays, j.RegionFocus, j.EstimatedTotalCost, j.ItineraryDays)
	j.FormattedText = formatted
	j.WhatsAppURL = s.BuildWhatsAppURL("", formatted)

	return s.repo.Save(ctx, j)
}

func (s *journeyService) GetJourneys(ctx context.Context) ([]domain.Journey, error) {
	return s.repo.FindAll(ctx)
}

func (s *journeyService) GetJourneyByID(ctx context.Context, id string) (*domain.Journey, error) {
	return s.repo.FindByID(ctx, id)
}

func (s *journeyService) ExportJourney(ctx context.Context, req *domain.ExportJourneyRequest) (*domain.ExportJourneyResponse, error) {
	title := req.Title
	if title == "" {
		title = fmt.Sprintf("Rencana Perjalanan Budaya Toba (%d Hari)", req.DurationDays)
	}

	formattedText := s.BuildFormattedSummary(title, req.DurationDays, req.RegionFocus, req.EstimatedTotalCost, req.ItineraryDays)
	whatsappURL := s.BuildWhatsAppURL(req.TargetPhoneNumber, formattedText)

	// Build downloadable document content (clean plain text/markdown)
	safeTitle := strings.ReplaceAll(title, " ", "-")
	safeTitle = strings.ReplaceAll(safeTitle, "/", "-")
	fileName := fmt.Sprintf("BONATURA-%s-%s.txt", safeTitle, time.Now().Format("20060102"))

	return &domain.ExportJourneyResponse{
		Title:            title,
		FormattedText:    formattedText,
		WhatsAppURL:      whatsappURL,
		DownloadFileName: fileName,
		DownloadContent:  formattedText,
	}, nil
}

