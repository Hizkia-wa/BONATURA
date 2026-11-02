# BONATURA Backend (Golang + PostgreSQL Migrations)

Backend RESTful API untuk **BONATURA** (*Discover Culture, Experience Heritage*) yang dibangun dengan arsitektur bersih menggunakan **Golang (Gin)** dan manajemen skema database menggunakan **golang-migrate** (PostgreSQL / Supabase).

---

## 📁 Struktur Direktori

```text
backend/
├── cmd/
│   ├── api/
│   │   └── main.go                 # Entry point server REST API
│   └── migrate/
│       └── main.go                 # CLI runner untuk migrasi database
├── migrations/                     # File migrasi SQL murni (Up & Down)
│   ├── 000001_create_extensions_and_enums.up.sql / .down.sql
│   ├── 000002_create_user_and_community_tables.up.sql / .down.sql
│   ├── 000003_create_cultural_content_tables.up.sql / .down.sql
│   ├── 000004_create_destination_and_activity_tables.up.sql / .down.sql
│   ├── 000005_create_contribution_and_review_tables.up.sql / .down.sql
│   ├── 000006_create_knowledge_graph_and_media_tables.up.sql / .down.sql
│   ├── 000007_create_indexes_and_triggers.up.sql / .down.sql
│   └── 000008_seed_initial_data.up.sql / .down.sql
├── internal/
│   ├── config/                     # Konfigurasi aplikasi & env loader
│   ├── database/                   # Koneksi pool PostgreSQL (pgx)
│   ├── domain/                     # Entity models & enums (14 tabel)
│   ├── handler/                    # HTTP Handlers (Culture, Destination, Community, Submissions)
│   ├── middleware/                 # CORS, Auth & Role-Based Access Control
│   ├── repository/                 # Database Query & Transactions
│   └── service/                    # Business Logic & Integrity Rules
├── pkg/
│   └── response/                   # Standard JSON API envelope
├── .env.example
├── go.mod
└── go.sum
```

---

## 🛠️ 1. Konfigurasi Lingkungan (`.env`)

Salin file `.env.example` menjadi `.env` di dalam folder `backend/`:

```bash
cp .env.example .env
```

Sesuaikan nilai `DATABASE_URL` dengan database Anda (baik PostgreSQL lokal maupun koneksi Supabase):

```env
PORT=8080
APP_ENV=development

# PostgreSQL Lokal:
DATABASE_URL=postgres://postgres:password@localhost:5432/bonatura?sslmode=disable

# Atau Supabase (Direct / Connection Pooler):
# DATABASE_URL=postgres://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?sslmode=require

FRONTEND_URL=http://localhost:3000
```

---

## 🐘 2. Menjalankan Database Migrations

Tool migrasi telah dibuat mandiri (*self-contained*) di `cmd/migrate/main.go`, sehingga Anda **tidak perlu menginstal CLI eksternal**:

### A. Terapkan Semua Migrasi (UP)
```bash
go run cmd/migrate/main.go up
```
*Perintah ini akan membuat ekstensi UUID, 12 Enum kustom, 14 tabel lengkap, foreign keys, index performa, auto-update trigger, dan seed data awal Batak Toba (Ulos, Rumah Bolon, Tortor, Huta Siallagan).*

### B. Rollback Migrasi (DOWN)
```bash
# Rollback 1 langkah migrasi terakhir:
go run cmd/migrate/main.go down

# Rollback N langkah:
go run cmd/migrate/main.go down 2
```

### C. Cek Status Versi Migrasi
```bash
go run cmd/migrate/main.go version
```

### D. Perbaiki Status Dirty (Jika Terjadi Interupsi)
```bash
go run cmd/migrate/main.go force <nomor_versi>
```

---

## 🚀 3. Menjalankan API Server

Jalankan server backend:
```bash
go run cmd/api/main.go
```
Atau menggunakan binary yang sudah dikompilasi:
```bash
./bin/api.exe
```

Server akan aktif di `http://localhost:8080`.

---

## 📡 4. Daftar Endpoint API

### A. Health & Status
| Method | Endpoint | Keterangan | Akses |
|---|---|---|---|
| `GET` | `/api/v1/health` | Status API & koneksi database | Publik |

### B. Cultural Discovery & Knowledge Graph
| Method | Endpoint | Keterangan | Akses |
|---|---|---|---|
| `GET` | `/api/v1/culture/categories` | Daftar kategori budaya | Explorer (Publik) |
| `GET` | `/api/v1/culture/categories/:slug` | Detail kategori budaya | Explorer (Publik) |
| `GET` | `/api/v1/culture/elements` | Katalog budaya (filter kategori, search, pagination) | Explorer (Publik) |
| `GET` | `/api/v1/culture/elements/:slug` | Detail lengkap budaya (filosofi, sumber, destinasi terkait) | Explorer (Publik) |
| `GET` | `/api/v1/culture/elements/:id/graph` | Hubungan relasi **Cultural Knowledge Graph** | Explorer (Publik) |

### C. Destinations & Activities (Peta & Wisata Budaya)
| Method | Endpoint | Keterangan | Akses |
|---|---|---|---|
| `GET` | `/api/v1/destinations` | Daftar destinasi (filter kabupaten, pencarian koordinat peta) | Explorer (Publik) |
| `GET` | `/api/v1/destinations/:slug` | Detail destinasi beserta elemen budaya & aktivitasnya | Explorer (Publik) |
| `GET` | `/api/v1/activities` | Daftar aktivitas budaya (misal: belajar tenun, manortor) | Explorer (Publik) |
| `GET` | `/api/v1/activities/:slug` | Detail aktivitas | Explorer (Publik) |

### D. Community & Local Contributor
| Method | Endpoint | Keterangan | Akses |
|---|---|---|---|
| `GET` | `/api/v1/communities` | Daftar komunitas lokal terverifikasi | Explorer (Publik) |
| `GET` | `/api/v1/communities/:slug` | Detail profil komunitas beserta daftar anggota | Explorer (Publik) |
| `POST` | `/api/v1/communities` | Daftarkan komunitas baru | Contributor / Admin |

### E. Community Submissions & Verification Workflow
| Method | Endpoint | Keterangan | Akses |
|---|---|---|---|
| `POST` | `/api/v1/submissions` | Mengirim usulan data budaya / destinasi / aktivitas | Contributor / Admin |
| `GET` | `/api/v1/submissions` | Daftar pengajuan (Contributor: milik sendiri; Admin: semua) | Contributor / Admin |
| `GET` | `/api/v1/submissions/:id` | Detail pengajuan beserta riwayat review | Contributor / Admin |
| `POST` | `/api/v1/submissions/:id/review` | Memeriksa & memverifikasi pengajuan (`approved`/`rejected`/`requested_revision`) | **Admin Only** |

---

## 🔒 5. Hak Akses & Role-Based Access Control (RBAC)

1. **Explorer**: Tidak perlu login. Dapat mengakses semua konten publik yang berstatus `published` dan `verified`.
2. **Contributor**: Wajib login. Dapat mendaftarkan komunitas dan mengirim pengajuan kontribusi informasi budaya. *Tidak dapat menyetujui pengajuannya sendiri.*
3. **Administrator**: Memiliki hak penuh untuk memeriksa riwayat pengajuan, memberikan catatan verifikasi, dan mempublikasikan data ke katalog resmi BONATURA.
