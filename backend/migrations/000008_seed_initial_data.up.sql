-- 000008_seed_initial_data.up.sql
-- Seed initial Batak Toba categories and sample verified cultural knowledge

-- 1. Cultural Categories
INSERT INTO cultural_categories (id, name, slug, description, icon_name) VALUES
('11111111-1111-1111-1111-111111111001', 'Pakaian Adat', 'pakaian-adat', 'Busana dan kain tradisional warisan leluhur Batak', 'shirt'),
('11111111-1111-1111-1111-111111111002', 'Rumah Adat', 'rumah-adat', 'Arsitektur tradisional Batak yang sarat filosofi kosmik', 'home'),
('11111111-1111-1111-1111-111111111003', 'Tarian Tradisional', 'tarian-tradisional', 'Gerak tari sakral dan penghormatan adat Batak', 'activity'),
('11111111-1111-1111-1111-111111111004', 'Musik Tradisional', 'musik-tradisional', 'Ansambel musik ritmis pengiring upacara adat', 'music'),
('11111111-1111-1111-1111-111111111005', 'Tradisi dan Adat', 'tradisi-dan-adat', 'Tata cara upacara, falsafah Dalihan Na Tolu, dan ritus kehidupan', 'heart'),
('11111111-1111-1111-1111-111111111006', 'Kerajinan', 'kerajinan', 'Keterampilan tenun, ukir gorga, dan pahat kayu khas Batak', 'tool'),
('11111111-1111-1111-1111-111111111007', 'Kuliner Tradisional', 'kuliner-tradisional', 'Kekayaan cita rasa pangan khas rempah andaliman', 'coffee'),
('11111111-1111-1111-1111-111111111008', 'Sejarah dan Peninggalan', 'sejarah-dan-peninggalan', 'Situs megalitikum, prasasti, dan jejak peradaban Danau Toba', 'compass')
ON CONFLICT (slug) DO NOTHING;

-- 2. Cultural Elements (Ulos, Rumah Bolon, Tortor)
INSERT INTO cultural_elements (
    id, category_id, name, slug, short_description, description, history, philosophy, cultural_context, region, cover_image_url, verification_status, publication_status
) VALUES
(
    '22222222-2222-2222-2222-222222222001',
    '11111111-1111-1111-1111-111111111001',
    'Ulos',
    'ulos',
    'Kain tenun tradisional Batak yang melambangkan kehangatan kasih sayang dan ikatan kekeluargaan.',
    'Ulos adalah kain tenun tradisional masyarakat Batak di Sumatera Utara. Dibuat dengan alat tenun bukan mesin (gedogan) melalui proses yang memakan waktu berhari-hari hingga berbulan-bulan.',
    'Secara historis, nenek moyang orang Batak tinggal di dataran tinggi yang dingin. Ulos awalnya diciptakan sebagai sumber kehangatan fisik, melengkapi matahari dan api, sebelum berkembang menjadi simbol kehangatan spiritual.',
    'Ulos bermakna selimut yang memberi kehangatan hidup (Ijuk pangihot ni hodong, Ulos pangihot ni holong). Setiap motif, warna (merah, hitam, putih), dan ragam hias melambangkan status sosial, restu, dan doa.',
    'Digunakan dalam berbagai upacara adat kehidupan (siklus kelahiran, pernikahan, hingga kematian) melalui prosesi sakral Mangulosi.',
    'Kawasan Danau Toba (Samosir, Toba, Tapanuli Utara)',
    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=80',
    'verified',
    'published'
),
(
    '22222222-2222-2222-2222-222222222002',
    '11111111-1111-1111-1111-111111111002',
    'Rumah Bolon',
    'rumah-bolon',
    'Rumah panggung tradisional Batak dengan atap melengkung menyerupai perahu dan hiasan ukiran Gorga.',
    'Rumah Bolon (Jabu Bolon) adalah rumah adat Batak Toba yang berkonstruksi pasak kayu tanpa paku, dihiasi ukiran gorga dengan warna khas tiga benang (Triwarna Batak: merah, putih, hitam).',
    'Dahulu Rumah Bolon merupakan tempat tinggal para raja dan keluarganya. Struktur panggungnya dirancang tahan gempa dan adaptif terhadap iklim danau.',
    'Konstruksi tiga tingkat melambangkan kosmologi Batak: Banua Ginjang (dunia atas), Banua Tonga (dunia tengah tempat manusia hidup), dan Banua Toru (dunia bawah). Gorga melambangkan perlindungan spiritual dan kemakmuran.',
    'Pusat pertemuan musyawarah huta, upacara adat raja, dan persemayaman pusaka leluhur.',
    'Kawasan Danau Toba (Samosir & Simalungun)',
    'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    'verified',
    'published'
),
(
    '22222222-2222-2222-2222-222222222003',
    '11111111-1111-1111-1111-111111111003',
    'Tari Tortor',
    'tari-tortor',
    'Tarian sakral dan seremonial masyarakat Batak Toba yang diiringi tabuhan ansambel Gondang Sabangunan.',
    'Tortor bukan sekadar tarian hiburan, melainkan media komunikasi spiritual dan penghormatan adat kepada Tuhan (Debata Mulajadi Na Bolon), leluhur, serta kerabat Dalihan Na Tolu.',
    'Ditarikan turun-temurun sejak era megalitikum, awalnya erat kaitannya dengan upacara ritual persembahan sebelum berkembang menjadi tarian sukacita dan penyambutan tamu terhormat.',
    'Gerakan tangan membuka dan menutup melambangkan penerimaan berkat, kerendahan hati, dan doa permohonan kesejahteraan bagi seluruh masyarakat.',
    'Selalu dibawakan bersamaan dengan pemakaian kain Ulos dan alunan musik Gondang dalam pesta adat.',
    'Kawasan Danau Toba',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    'verified',
    'published'
)
ON CONFLICT (slug) DO NOTHING;

-- 3. Sources
INSERT INTO sources (id, title, source_type, publisher, author, url, notes) VALUES
('33333333-3333-3333-3333-333333333001', 'Ulos Batak: Sejarah, Makna, dan Tata Cara Penggunaannya', 'book', 'Balai Pustaka / LIPI', 'Pardede, R.', 'https://kebudayaan.kemdikbud.go.id/ulos', 'Dokumentasi etnografi tekstil Nusantara'),
('33333333-3333-3333-3333-333333333002', 'Arsitektur Tradisional Batak Toba dan Kosmologi Gorga', 'article', 'Jurnal Kebudayaan Sumatera Utara', 'Simanjuntak, T.', 'https://kemdikbud.go.id/jabu-bolon', 'Kajian struktur pasak tahan gempa dan ukiran gorga')
ON CONFLICT DO NOTHING;

-- Connect elements to sources
INSERT INTO cultural_element_sources (id, cultural_element_id, source_id, note) VALUES
('44444444-4444-4444-4444-444444444001', '22222222-2222-2222-2222-222222222001', '33333333-3333-3333-3333-333333333001', 'Rujukan ragam motif Ragi Hotang dan Sibolang')
ON CONFLICT (cultural_element_id, source_id) DO NOTHING;

-- 4. Sample Destinations (Huta Siallagan, Kampung Ulos Hutaraja)
INSERT INTO destinations (
    id, name, slug, short_description, description, address, village, district, regency, province, latitude, longitude, ticket_price, cover_image_url, publication_status
) VALUES
(
    '55555555-5555-5555-5555-555555555001',
    'Huta Siallagan',
    'huta-siallagan',
    'Desa kuno berpagar batu dengan Batu Persidangan dan deretan Rumah Bolon yang megah.',
    'Huta Siallagan adalah perkampungan kuno suku Batak yang terkenal dengan peninggalan megalitikum berupa kursi batu persidangan Raja Siallagan serta pohon hariara sakral.',
    'Desa Ambarita, Pulau Samosir',
    'Ambarita',
    'Simanindo',
    'Samosir',
    'Sumatera Utara',
    2.6713890,
    98.8322220,
    15000.00,
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    'published'
),
(
    '55555555-5555-5555-5555-555555555002',
    'Kampung Ulos Hutaraja',
    'kampung-ulos-hutaraja',
    'Sentra penenun kain Ulos tradisional yang masih mempertahankan teknik gedogan di teras Rumah Bolon.',
    'Kampung Ulos Hutaraja di Lumban Suhi Suhi Toruan merupakan pusat pelestarian tenun Ulos Batak. Wisatawan dapat menyaksikan para ibu menenun Ulos helai demi helai.',
    'Lumban Suhi Suhi Toruan, Pulau Samosir',
    'Lumban Suhi Suhi Toruan',
    'Pangururan',
    'Samosir',
    'Sumatera Utara',
    2.6072220,
    98.7119440,
    10000.00,
    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=80',
    'published'
)
ON CONFLICT (slug) DO NOTHING;

-- Connect Destinations to Cultural Elements
INSERT INTO destination_cultural_elements (id, destination_id, cultural_element_id, relationship_note) VALUES
('66666666-6666-6666-6666-666666666001', '55555555-5555-5555-5555-555555555001', '22222222-2222-2222-2222-222222222002', 'Objek Rumah Bolon asli peninggalan Raja Siallagan'),
('66666666-6666-6666-6666-666666666002', '55555555-5555-5555-5555-555555555001', '22222222-2222-2222-2222-222222222003', 'Tempat pertunjukan tari Tortor dan Sigale-gale'),
('66666666-6666-6666-6666-666666666003', '55555555-5555-5555-5555-555555555002', '22222222-2222-2222-2222-222222222001', 'Pusat pengrajin tenun tangan Ulos gedogan')
ON CONFLICT (destination_id, cultural_element_id) DO NOTHING;

-- 5. Sample Activities
INSERT INTO activities (
    id, destination_id, name, slug, description, activity_type, price, duration_minutes, schedule_info, contact, status
) VALUES
(
    '77777777-7777-7777-7777-777777777001',
    '55555555-5555-5555-5555-555555555002',
    'Workshop Belajar Menenun Ulos Dasar',
    'workshop-belajar-menenun-ulos-dasar',
    'Belajar langsung cara mengoperasikan alat tenun gedogan dan memahami makna benang tenun bersama penenun lokal.',
    'Workshop & Edukasi Budaya',
    75000.00,
    90,
    'Setiap hari pkl 09.00 - 16.00 WIB (Reservasi disarankan)',
    '+6281234567890',
    'published'
),
(
    '77777777-7777-7777-7777-777777777002',
    '55555555-5555-5555-5555-555555555001',
    'Edukasi Sejarah Peradilan Adat & Tortor Huta Siallagan',
    'edukasi-sejarah-peradilan-adat-tortor',
    'Tur terpandu mengenai sejarah persidangan adat Batak kuno dan ikut manortor bersama warga.',
    'Tur Budaya',
    35000.00,
    60,
    'Sesi pagi 10.00 & Sesi siang 14.00 WIB',
    '+6281298765432',
    'published'
)
ON CONFLICT (slug) DO NOTHING;

-- 6. Cultural Relations (Knowledge Graph sample)
INSERT INTO cultural_relations (
    id, source_element_id, target_element_id, relation_type, description, verification_status
) VALUES
(
    '88888888-8888-8888-8888-888888888001',
    '22222222-2222-2222-2222-222222222001',
    '22222222-2222-2222-2222-222222222003',
    'Dikenakan saat prosesi',
    'Ulos disematkan pada bahu dan tubuh para penari manortor saat upacara adat berlangsung.',
    'verified'
),
(
    '88888888-8888-8888-8888-888888888002',
    '22222222-2222-2222-2222-222222222003',
    '22222222-2222-2222-2222-222222222002',
    'Ditarikan di pelataran',
    'Pentas tari Tortor dilaksanakan di pelataran muka Rumah Bolon sebagai bentuk penghormatan adat.',
    'verified'
)
ON CONFLICT DO NOTHING;
