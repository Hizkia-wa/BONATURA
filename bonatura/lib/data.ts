export interface CulturalElement {
  id: string;
  name: string;
  slug: string;
  category: string;
  region: string;
  subRegion: string;
  imageUrl: string;
  shortDesc: string;
  description: string;
  history: string;
  philosophy: string;
  culturalContext: string;
  sources: string[];
  relatedElements: { id: string; name: string; region: string }[];
  verificationStatus: "VERIFIED" | "PENDING";
  publicationStatus: "PUBLISHED" | "DRAFT";
}

// Category item tailored for Toba Heritage
export interface TobaCategoryItem {
  id: string;
  name: string;
  shortDesc: string;
  iconName: string;
  imageUrl: string;
}

export const TOBA_CATEGORIES: TobaCategoryItem[] = [
  {
    id: "Traditional Architecture",
    name: "Traditional Architecture",
    shortDesc: "Rumah Bolon, Sopo, dan ornamen ukiran Gorga tiga warna",
    iconName: "Home",
    imageUrl: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "Traditional Textiles",
    name: "Traditional Textiles",
    shortDesc: "Kain tenun Ulos sakral, benang gedogan, dan pewarna alami salaon",
    iconName: "Scissors",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "Music & Dance",
    name: "Music & Dance",
    shortDesc: "Tarian Tortor penghormatan dan tabuhan ensembel Gondang Bolon",
    iconName: "Music",
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "Traditional Ceremonies",
    name: "Traditional Ceremonies",
    shortDesc: "Ritual sakral Mangulosi, pesta horja, dan Mangongkal Holi",
    iconName: "Sparkles",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "Social Values",
    name: "Social Values",
    shortDesc: "Falsafah kekerabatan Dalihan Na Tolu dan kearifan musyawarah adat",
    iconName: "Compass",
    imageUrl: "https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "Oral Heritage",
    name: "Oral Heritage",
    shortDesc: "Turiturian Si Raja Batak, legenda putri ikan, dan naskah Pustaha Laklak",
    iconName: "BookOpen",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "Traditional Crafts",
    name: "Traditional Crafts",
    shortDesc: "Kriya pahat kayu tongkat Tunggal Panaluan dan ukiran Gorga",
    iconName: "Layers",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
];

// Section 1: 4 Cards of Get to Know Toba
export interface GetToKnowCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullStory: string;
  badge: string;
  imageUrl: string;
  highlights: string[];
}

export const GET_TO_KNOW_TOBA: GetToKnowCard[] = [
  {
    id: "geological-heritage",
    title: "Geological Heritage",
    tagline: "Keajaiban Supervulkan Tertua Dunia",
    description:
      "Kaldera vulkanik terbesar di dunia seluas 1.130 km² yang terbentuk dari letusan supervolcano mahadasyat 74.000 tahun silam.",
    fullStory:
      "Danau Toba adalah hasil dari peristiwa geologis katastropik terkuat di bumi dalam 2,5 juta tahun terakhir. Letusan supervulkan Toba purba memuntahkan 2.800 km³ material piroklastik, mengubah iklim global (volcanic winter), dan menciptakan kawah kaldera raksasa yang terisi air. Ditetapkan sebagai UNESCO Global Geopark pada 2 Juli 2020, kawasan ini membuktikan bagaimana kehancuran geologis purba kini melahirkan bentang alam luar biasa yang subur bagi peradaban masyarakat Batak.",
    badge: "UNESCO Global Geopark 2020",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Letusan kaldera 74.000 tahun lalu",
      "Kedalaman air danau mencapai 505 meter",
      "Situs warisan bumi UNESCO Global Geopark",
    ],
  },
  {
    id: "samosir-island",
    title: "Samosir Island",
    tagline: "Pulau di Tengah Danau Megah",
    description:
      "Pulau vulkanik seluas 630 km² di tengah Danau Toba yang menjadi jantung spiritual dan pemukiman huta tradisional tertua.",
    fullStory:
      "Pulau Samosir terangkat pasca letusan melalui proses resurgent doming di dasar kaldera. Pulau ini hampir sebesar negara Singapura dan menjadi rahim kelahiran peradaban suku Batak di kaki gunung suci Pusuk Buhit. Di pulau ini, tradisi megalitikum seperti makam batu Raja Sidabutar, perkampungan adat Huta Siallagan dengan batu persidangannya, serta sentra tenun Huta Raja masih lestari secara utuh dan dihuni langsung oleh masyarakat adat.",
    badge: "Pusat Peradaban Batak",
    imageUrl: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Pusuk Buhit: Gunung asal mula orang Batak",
      "Situs megalitikum batu persidangan Huta Siallagan",
      "Sentra tenun ulos tertua di pesisir Huta Raja",
    ],
  },
  {
    id: "batak-heritage",
    title: "Batak Heritage",
    tagline: "Peradaban Adat Berusia Ribuan Tahun",
    description:
      "Sistem marga, aksara surat Batak kuno, arsitektur kayu tanpa paku, dan kearifan musyawarah yang kokoh menyeberangi zaman.",
    fullStory:
      "Peradaban Batak memiliki keistimewaan tersendiri dalam kebudayaan Nusantara: memiliki aksara tulisan kuno sendiri (Surat Batak) yang ditulis pada kulit kayu alim (Pustaha Laklak), sistem garis keturunan patrilineal dengan silsilah tarombo yang terjaga berabad-abad, serta sistem hukum adat dan kepemimpinan niniak-raja yang sangat demokratis melalui rembug bale parsaoran.",
    badge: "Aksara & Silsilah Luhur",
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Aksara Surat Batak & Pustaha Laklak",
      "Silsilah marga Tarombo lintas generasi",
      "Konstruksi arsitektur vernakular Rumah Bolon",
    ],
  },
  {
    id: "living-traditions",
    title: "Living Traditions",
    tagline: "Ritual & Adat yang Bernapas Setiap Hari",
    description:
      "Bukan sekadar peninggalan museum: ulos terus ditenun, tortor ditarikan, dan gondang sabangunan tetap ditabuh mengiringi kehidupan.",
    fullStory:
      "Kekuatan utama budaya Toba terletak pada sifatnya yang masih hidup (living heritage). Setiap siklus kehidupan manusia Batak—mulai dari kelahiran (mambosuri), pernikahan adat (marunjuk), peresmian rumah baru (mamongoti jabu), hingga ritual penghormatan arwah leluhur (mangongkal holi)—selalu dijalankan dengan mengindahkan norma Dalihan Na Tolu dan penyematan kain ulos.",
    badge: "Living Heritage Nusantara",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Ritual Mangulosi dalam setiap siklus hidup",
      "Pertunjukan Tortor & Gondang Sabangunan",
      "Musyawarah mufakat berbasis Dalihan Na Tolu",
    ],
  },
];

// Section 3: Dalihan Na Tolu Values
export interface DalihanNaToluValue {
  number: string;
  name: string;
  aphorism: string;
  meaning: string;
  description: string;
  practiceExample: string;
}

export const DALIHAN_NA_TOLU_VALUES: DalihanNaToluValue[] = [
  {
    number: "01",
    name: "Hula-hula",
    aphorism: "Somba Marhula-hula",
    meaning: "Hormat dan takzim kepada pihak keluarga pemberi istri",
    description:
      "Hula-hula adalah kelompok marga asal pihak istri atau ibu. Dalam kosmologi adat Batak, Hula-hula diposisikan sebagai sumber mata air keberkahan dan perantara berkat spiritual (Pasu-pasu) dari Sang Pencipta.",
    practiceExample:
      "Dalam upacara adat, Hula-hula menempati tempat duduk kehormatan tertinggi, disajikan bagian daging kehormatan (tudu-tudu ni sipanganon), dan merupakan satu-satunya pihak yang berhak menyematkan kain ulos restu.",
  },
  {
    number: "02",
    name: "Dongan Tubu",
    aphorism: "Manat Mardongan Tubu",
    meaning: "Bersikap hati-hati, santun, dan saling menjaga kehormatan saudara semarga",
    description:
      "Dongan Tubu (atau Dongan Sabutuha) adalah saudara kandung, saudara sepupu, dan kaum pria yang memiliki satu marga atau satu leluhur. Relasi sesama marga rentan terjadi gesekan perebutan hak waris atau kepemimpinan.",
    practiceExample:
      "Prinsip 'Manat' menuntut kehati-hatian dalam bertutur kata dan bersikap agar tidak melukai harga diri saudara sendiri. Saling menopang beban biaya adat dan saling membela kehormatan marga saat menghadapi pihak luar.",
  },
  {
    number: "03",
    name: "Boru",
    aphorism: "Elek Marboru",
    meaning: "Menyayangi, mengayomi, dan membimbing pihak perempuan serta penerima istri",
    description:
      "Boru adalah anak perempuan, saudari kandung, atau pihak marga yang mengambil istri dari pihak kita. Boru merupakan ujung tombak pekerja keras dan penanggung jawab teknis dalam setiap hajatan pesta adat.",
    practiceExample:
      "Meskipun pihak Boru bertugas melayani di dapur dan mempersiapkan jamuan pesta, pihak Hula-hula wajib memperlakukan mereka dengan penuh kelembutan (elek), kasih sayang, serta tidak boleh bertindak sewenang-wenang.",
  },
];

// Section 4: Stories of Toba
export interface TobaStory {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  historicalContext: string;
  summary: string;
  oralTraditionNote: string;
  imageUrl: string;
  sources: string[];
}

export const TOBA_STORIES: TobaStory[] = [
  {
    id: "story-sigale-gale",
    title: "The Story of Sigale-gale",
    subtitle: "Tangisan Kayu yang Menari Menghibur Raja",
    location: "Tomok & Simanindo, Pulau Samosir",
    historicalContext: "Abad ke-17 di Kerajaan Tomok Samosir",
    summary:
      "Legenda mengisahkan Raja Rahat yang jatuh sakit parah akibat duka tak terperikan setelah putra tunggalnya, Manggale, gugur di medan perang tanpa sempat berketurunan. Mengingat ketiadaan anak laki-laki pembawa marga adalah aib dan kepunahan garis keturunan dalam adat Batak, para tetua adat memanggil Datu pemahat kayu terbaik untuk membuat replika wajah sang pangeran. Melalui lantunan Gondang Sabangunan dan mantra sakral, patung bersendi tali rumit itu bergerak menarikan Tortor, memeluk sang raja hingga sembuh.",
    oralTraditionNote:
      "Terdapat variasi cerita di Simanindo bahwa boneka Sigale-gale semula dipahat dari pohon beringin angker dan digerakkan dengan aliran air bawah tanah sebelum sistem tuas benang mekanik diperkenalkan.",
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
    sources: [
      "Dinas Kebudayaan & Pariwisata Kabupaten Samosir",
      "Katalog WBTb Kemendikbudristek No. Reg: 201300003",
    ],
  },
  {
    id: "story-raja-sidabutar",
    title: "The Legacy of Raja Sidabutar",
    subtitle: "Makam Megalitikum Batu Tanpa Galian Tanah",
    location: "Desa Tomok, Pulau Samosir",
    historicalContext: "Pusat Dinasti Sidabutar Abad ke-16",
    summary:
      "Di perkampungan Tomok berdiri sarkofagus batu monolitik berusia lebih dari 450 tahun milik Raja Sidabutar, penguasa pertama tanah Tomok. Sesuai wasiat sang raja, jasadnya tidak dikubur di liang tanah melainkan disemayamkan di dalam peti batu utuh berpahat wajah singa-singa Batak dengan rambut gimbal terurai, berdampingan dengan patung Anting Malela—wanita pujaan hatinya yang tak sampai dinikahi.",
    oralTraditionNote:
      "Setiap peziarah yang melangkah memasuki kompleks makam wajib mengenakan selempang kain ulos bergaris merah-putih-hitam sebagai penolak bala dan bentuk penghormatan sakral.",
    imageUrl: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80",
    sources: [
      "Balai Pelestarian Kebudayaan Wilayah II Sumatera Utara",
      "Buku Sejarah & Arkeologi Megalitikum Samosir",
    ],
  },
  {
    id: "story-batu-siallagan",
    title: "The Stone of Huta Siallagan",
    subtitle: "Batu Persidangan & Supremasi Hukum Adat Ambarita",
    location: "Desa Ambarita, Pulau Samosir",
    historicalContext: "Peradilan Adat Siallagan Abad ke-15",
    summary:
      "Huta Siallagan adalah desa berbenteng batu cadas dan rumpun bambu berduri yang dipimpin Raja Lopian Siallagan. Di bawah pohon rindang Hariara (pohon kebenaran) terdapat susunan kursi-kursi batu melingkar (Batu Parsidangan) tempat para tetua mengadili tindak kejahatan berat, pengkhianatan perang, dan ilmu sihir hitam dengan putusan hukum eksekusi pancung pemenggal kepala.",
    oralTraditionNote:
      "Batu persidangan terbagi menjadi dua titik: area meja bundar pertama untuk musyawarah penjatuhan vonis, dan area batu kedua sebagai meja eksekusi dan pembersihan tubuh terpidana.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    sources: [
      "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI",
      "Dokumentasi Tetua Adat Keturunan Raja Siallagan ke-16",
    ],
  },
  {
    id: "story-huta-bolon",
    title: "The Heritage of Huta Bolon",
    subtitle: "Museum Hidup dan Arsitektur Pertahanan Simanindo",
    location: "Simanindo, Bagian Utara Samosir",
    historicalContext: "Perkampungan Raja Sidauruk Abad ke-18",
    summary:
      "Huta Bolon Simanindo merupakan desa percontohan pertahanan adat Batak yang masih menjaga tata letak asli: pintu gerbang parik sempit yang hanya muat satu orang, deretan lumbung padi (Sopo) berhadapan dengan Rumah Bolon megah bertanduk kerbau asli, serta panggung terbuka pertunjukan tari Tortor dan ritual persembahan cawan air sakral.",
    oralTraditionNote:
      "Tengkorak kerbau yang terpasang di bubungan atap Rumah Bolon Simanindo menunjukkan jumlah pesta adat besar horja yang pernah sukses digelar oleh sang raja.",
    imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80",
    sources: [
      "Yayasan Museum Huta Bolon Simanindo",
      "Dinas Pariwisata Sumatera Utara",
    ],
  },
];

// Section 5: Map Destinations
export interface TobaMapLocation {
  id: string;
  name: string;
  area: string;
  coordinates: string;
  description: string;
  culturalHighlights: string[];
  imageUrl: string;
}

export const TOBA_MAP_LOCATIONS: TobaMapLocation[] = [
  {
    id: "tomok",
    name: "Desa Wisata Tomok",
    area: "Pesisir Timur Pulau Samosir",
    coordinates: "2.6587° N, 98.8653° E",
    description:
      "Gerbang masuk utama pelayaran Pulau Samosir. Menyimpan kompleks makam batu sakral Raja Sidabutar, sanggar pertunjukan boneka Sigale-gale, dan pusat kerajinan suvenir tenun ulos.",
    culturalHighlights: ["Makam Megalitikum Raja Sidabutar", "Pentas Tari Boneka Sigale-gale", "Pasar Kain Ulos Tradisional"],
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "huta-siallagan",
    name: "Huta Siallagan (Ambarita)",
    area: "Kecamatan Simanindo, Samosir",
    coordinates: "2.6738° N, 98.8406° E",
    description:
      "Kawasan cagar budaya desa berbenteng batu andesit dengan meja dan kursi persidangan batu kuno yang telah berusia ratusan tahun di bawah naungan pohon Hariara.",
    culturalHighlights: ["Batu Parsidangan Adat", "Rumah Bolon Berukir Gorga", "Pohon Suci Hariara"],
    imageUrl: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "huta-raja",
    name: "Kampung Ulos Huta Raja",
    area: "Lumban Suhi-suhi, Samosir",
    coordinates: "2.6105° N, 98.7180° E",
    description:
      "Desa pelestari tenun ulos tertua yang terletak di pesisir barat Danau Toba dengan deretan rumah bolon kayu asli. Menjadi rumah bagi puluhan maestro penenun gedogan perempuan.",
    culturalHighlights: ["Sentra Tenun Ulos Gedogan", "Koleksi Rumah Bolon Terpanjang", "Pewarnaan Daun Salaon"],
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "simanindo",
    name: "Museum Huta Bolon Simanindo",
    area: "Ujung Utara Pulau Samosir",
    coordinates: "2.7483° N, 98.7516° E",
    description:
      "Museum cagar budaya bekas istana Raja Purba Sidauruk yang menyimpan koleksi pusaka perang, naskah Pustaha Laklak, dan pementasan tari Tortor sakral setiap pagi.",
    culturalHighlights: ["Pentas Tortor Tunggal Panaluan", "Pustaha Kulit Kayu Laklak", "Koleksi Sopo Bersejarah"],
    imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "bakkara",
    name: "Lembah Bakkara & Istana Sisingamangaraja",
    area: "Humbang Hasundutan",
    coordinates: "2.2694° N, 98.6756° E",
    description:
      "Lembah permai diapit tebing air terjun megah di tepi Danau Toba. Pusat kepemimpinan spiritual dinasti Sisingamangaraja I–XII dan sumber mata air suci Aek Sipangolu.",
    culturalHighlights: ["Istana Raja Sisingamangaraja XII", "Mata Air Keramat Aek Sipangolu", "Sentra Bawang Merah Bakkara"],
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "balige",
    name: "Kota Pusaka Balige & Museum TB Silalahi",
    area: "Kabupaten Toba",
    coordinates: "2.3338° N, 99.0664° E",
    description:
      "Kota sejarah di pesisir selatan Danau Toba dengan pasar tradisional Onan Balige beratap gonjong Batak serta Museum TB Silalahi Center berstandar internasional.",
    culturalHighlights: ["Museum Batak Center Balige", "Pasar Tradisional Onan Balige", "Sentra Kuliner Dekke Naniura"],
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
  },
];

// Section 6: Taste of Toba (Culinary Heritage)
export interface TobaCulinaryItem {
  id: string;
  name: string;
  indonesianName: string;
  tagline: string;
  keyIngredients: string[];
  cookingProcess: string;
  culturalContext: string;
  tasteProfile: string;
  communityNote: string;
  imageUrl: string;
}

export const TOBA_CULINARY: TobaCulinaryItem[] = [
  {
    id: "arsik-ikan-mas",
    name: "Dekke Na Niarsik",
    indonesianName: "Arsik Ikan Mas Bumbu Andaliman",
    tagline: "Hidangan Ikan Utuh Simbol Restu Kehidupan",
    keyIngredients: [
      "Ikan Mas segar Danau Toba",
      "Andaliman (Merica Batak)",
      "Asam Gelugur & Asam Cikala (Kecombrang)",
      "Lokio (Bawang Batak)",
      "Kunyit, Lengkuas, & Serai",
    ],
    cookingProcess:
      "Ikan mas dimasak utuh dari kepala hingga ekor dengan punggung menghadap ke atas beralaskan serai dan kacang panjang di wajan tanah liat, lalu direbus perlahan bersama rempah halus hingga kuah mengering mengental (marsik).",
    culturalContext:
      "Disajikan dalam upacara pernikahan adat, peresmian rumah, atau pelepasan anak merantau. Jumlah ikan disesuaikan dengan status adat: 1 ekor untuk pengantin baru, 3 ekor untuk kelahiran anak, dan 7 ekor untuk tetua adat.",
    tasteProfile: "Asam segar kecombrang, gurih pekat rempah kuning, dengan gigitan getir kebas jeruk khas andaliman.",
    communityNote:
      "Resep keluarga di Samosir biasanya menambahkan rebung muda, sedangkan di kawasan Balige lebih menonjolkan kecombrang hutan segar.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "dekke-naniura",
    name: "Dekke Naniura",
    indonesianName: "Ikan Mas Mentah Matang Asam Jungga",
    tagline: "Sashimi Pusaka Khusus Raja-raja Batak",
    keyIngredients: [
      "Ikan Mas segar Danau Toba (fillet bebas duri)",
      "Asam Jungga (jeruk purut khas Toba berair pekat)",
      "Andaliman tumbuk halus",
      "Kecombrang kukus",
      "Kacang tanah & kemiri sangrai tumbuk",
    ],
    cookingProcess:
      "Daging ikan mas segar disiangi durinya secara teliti, lalu dilumuri air perasan asam jungga selama 4 hingga 6 jam hingga protein ikan matang dingin (denaturasi asam) dan daging memutih kenyal, sebelum dilumuri bumbu kuning rempah kacang.",
    culturalContext:
      "Pada masa lampau hanya disajikan khusus untuk para Raja Batak karena proses penyiapannya yang membutuhkan ketelitian higienitas tinggi dan keahlian koki istana terpercaya.",
    tasteProfile: "Kombinasi tekstur ikan lembut kenyal, rasa asam jeruk yang tajam menyegarkan, sensasi kebas andaliman, dan gurih kacang sangrai.",
    communityNote:
      "Kini Naniura sering disajikan pada festival budaya dan santapan kehormatan menyambut tamu besar di kawasan Danau Toba.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "saksang-batak",
    name: "Saksang Tradisional Batak",
    indonesianName: "Olahan Rempah Cincang Perayaan Adat",
    tagline: "Hidangan Ikonik Pesta Horja Kemasyarakatan",
    keyIngredients: [
      "Daging cincang berkualitas",
      "Bumbu kelapa gongseng (Gota atau rempah non-darah)",
      "Andaliman & ketumbar sangrai",
      "Bawang merah, bawang putih, lengkuas",
      "Daun jeruk purut & serai",
    ],
    cookingProcess:
      "Daging dicincang halus lalu ditumis bersama rempah aromatik pekat dan bumbu kelapa gongseng harum, dimasak perlahan hingga rempah meresap sempurna dan mengeluarkan minyak alami.",
    culturalContext:
      "Merupakan hidangan pesta adat wajib (Pesta Horja) saat upacara pernikahan agung maupun pemakaman adat orang tua (Saur Matua).",
    tasteProfile: "Kaya aroma rempah ketumbar dan serai, gurih kelapa sangrai, serta pedas getar andaliman yang menghangatkan tubuh di dataran tinggi.",
    communityNote:
      "Versi halal modern kini populer dijumpai dengan bahan daging sapi atau ayam kampung cincang menggunakan kelapa gongseng tanpa darah.",
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "andaliman-spice",
    name: "Rempah Andaliman (Zanthoxylum acanthopodium)",
    indonesianName: "Merica Batak / Szechuan Pepper of Toba",
    tagline: "Rempah Hutan Purba Endemik Kaldera Toba",
    keyIngredients: [
      "Biji buah andaliman segar petik liar",
      "Senyawa hidroksi-alfa-sanshool alami",
      "Minyak atsiri aromatik citrus",
    ],
    cookingProcess:
      "Dipetik dari semak berduri liar di hutan perbukitan Toba pada ketinggian 1.500 mdpl. Ditumbuk segar langsung dalam cobek batu bersama cabai rawit dan bawang putih.",
    culturalContext:
      "Identitas gastronomi suku Batak yang tidak tergantikan. Tidak ada masakan Batak autentik tanpa kehadiran getar rasa andaliman.",
    tasteProfile: "Memberikan sensasi kebas mendesis di lidah (tingling sensation) dengan aroma harum citrus lemon yang menyegarkan indra perasa.",
    communityNote:
      "Andaliman sulit dibudidayakan secara modern di luar ekosistem tanah vulkanik sejuk Danau Toba, menjadikannya pusaka botani yang sangat bernilai.",
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1000&q=80",
  },
];

// Section 7: Living People Behind the Heritage
export interface TobaHeritageKeeper {
  id: string;
  role: string;
  name: string;
  community: string;
  location: string;
  mission: string;
  description: string;
  activities: string[];
  imageUrl: string;
}

export const TOBA_HERITAGE_KEEPERS: TobaHeritageKeeper[] = [
  {
    id: "keeper-weaver",
    role: "Penenun Ulos Tradisional",
    name: "Inang Penenun Kampung Huta Raja",
    community: "Kelompok Tenun Gedogan Dos Roha",
    location: "Lumban Suhi-suhi, Samosir",
    mission: "Mempertahankan pakem tenun tangan kuno dan penggunaan pewarna alami salaon.",
    description:
      "Para inang (ibu) penenun di Huta Raja duduk beralaskan tikar kayu di kolong Rumah Bolon selama berminggu-minggu, mengaitkan bilah kayu gedogan untuk merajut motif-motif sakral Ulos Ragi Hotang dan Sibolang yang hampir punah.",
    activities: [
      "Pewarnaan benang dengan daun indigofera alami",
      "Pelatihan menenun untuk generasi remaja putri",
      "Workshop interpretasi makna motif untuk wisatawan",
    ],
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "keeper-woodcarver",
    role: "Maestro Pahat Ukir Gorga",
    name: "Pande Ukir Rumah Bolon",
    community: "Sanggar Seni Ukir Pande Batak",
    location: "Tomok & Balige",
    mission: "Melestarikan filosofi tatah tiga warna sakral: merah, putih, dan hitam pada kayu keras.",
    description:
      "Pande ukir memahat kayu tanpa sketsa cetak pabrik, mengandalkan ingatan filosofis leluhur untuk menghasilkan ornamen Boraspati ni Tano (cicak simbol kesetiaan tanah) dan Mataniari (matahari simbol penerang hidup).",
    activities: [
      "Pemugaran ornamen Rumah Bolon cagar budaya",
      "Pembuatan miniatur rumah adat dan tongkat tunggal panaluan",
      "Pencatatan pakem ragam hias gorga Batak",
    ],
    imageUrl: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "keeper-musician",
    role: "Seniman Tortor & Gondang",
    name: "Penabuh Taganing & Penari Adat",
    community: "Sanggar Seni Danau Toba Nauli",
    location: "Simanindo & Pangururan",
    mission: "Menjaga ritme sakral gondang bolon agar tidak tergeser oleh musik elektronik modern.",
    description:
      "Anak-anak muda Batak yang mendedikasikan waktu berlatih ritme taganing, tiupan sarune bolon, dan gerak lentur jemari Tortor Somba untuk mengiringi perhelatan adat dan festival kebudayaan kaldera.",
    activities: [
      "Pementasan rutin tari Sigale-gale dan Tortor",
      "Penyelenggaraan kelas musik tradisional bagi anak sekolah",
      "Kolaborasi musik etnik Batak dengan instrumen dunia",
    ],
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "keeper-guide",
    role: "Tetua Adat & Edukator Huta",
    name: "Guriang & Pemandu Budaya Huta Siallagan",
    community: "Paguyuban Pemandu Adat Keturunan Raja",
    location: "Ambarita, Pulau Samosir",
    mission: "Menceritakan sejarah hukum adat persidangan batu kuno secara jujur, mendidik, dan beretika.",
    description:
      "Menyambut setiap musafir dengan senyuman dan kain ulos selempang, mengisahkan bagaimana hukum adat ditegakkan secara adil oleh para leluhur berabad-abad lampau.",
    activities: [
      "Pemanduan interpretasi sejarah Huta Siallagan",
      "Edukasi etika berkunjung ke situs megalitikum",
      "Pencatatan silsilah tarombo lisan para tetua",
    ],
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
];

// Complete Cultural Elements Repository (Batak Toba Focus + Geopark Context + Nusantara Harmony)
export const CULTURAL_ELEMENTS: CulturalElement[] = [
  {
    id: "ulos-batak-toba",
    slug: "ulos-batak-toba",
    name: "Kain Tenun Ulos Batak Toba",
    category: "Traditional Textiles",
    region: "Sumatera Utara",
    subRegion: "Samosir",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Kain tenun sakral Batak Toba yang menyimbolkan kehangatan restu (tondi), kasih sayang, dan perlindungan sosial.",
    description:
      "Ulos bukan sekadar helai kain sandang, melainkan media komunikasi sakral antara pemberi dan penerima berkah. Ditenun secara manual dengan alat tenun gedogan selama berminggu-minggu menggunakan pewarna alami indigo (salaon) dan kulit kayu mahoni. Dalam kosmologi Batak, ulos diyakini memberikan tondi (jiwa) dan kehangatan jasmani-ruhani yang tidak dapat dipenuhi oleh matahari maupun api.",
    history:
      "Tradisi menenun ulos telah diwariskan lebih dari 4.000 tahun lampau sejak kedatangan penutur Austronesia di perbukitan Danau Toba. Telah ditetapkan sebagai Warisan Budaya Takbenda (WBTb) Indonesia oleh Kemendikbudristek dan kini sedang diajukan menuju Daftar Representatif UNESCO.",
    philosophy:
      "Ungkapan adat 'Ijuk pangihot ni dame, ulos pangihot ni holong' (Ijuk adalah pengikat atap, ulos adalah pengikat kasih sayang) menegaskan kedudukan ulos sebagai perekat relasi Dalihan Na Tolu. Ulos tidak boleh dibeli untuk diri sendiri demi ritual, melainkan wajib disematkan oleh hula-hula (pihak pemberi restu).",
    culturalContext:
      "Diberikan dalam ritual Mangulosi pada momen daur hidup krusial: Ulos Mula Gabe untuk tujuh bulanan kehamilan, Ulos Hela untuk pernikahan anak perempuan, hingga Ulos Saput pada upacara duka cita.",
    sources: [
      "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI (WBTb No. Reg: 201400108)",
      "Balai Pelestarian Kebudayaan Wilayah II Sumatera Utara",
      "Dokumentasi Sentra Tenun Kampung Ulos Huta Raja, Samosir",
    ],
    relatedElements: [
      { id: "mangulosi", name: "Tradisi Ritual Mangulosi", region: "Samosir" },
      { id: "dalihan-na-tolu", name: "Filosofi Kekerabatan Dalihan Na Tolu", region: "Toba" },
      { id: "rumah-bolon", name: "Arsitektur Rumah Bolon", region: "Samosir" },
    ],
    verificationStatus: "VERIFIED",
    publicationStatus: "PUBLISHED",
  },
  {
    id: "rumah-bolon",
    slug: "rumah-bolon",
    name: "Arsitektur Rumah Adat Bolon",
    category: "Traditional Architecture",
    region: "Sumatera Utara",
    subRegion: "Samosir",
    imageUrl: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Rumah panggung megah beratap melengkung tanduk kerbau dengan sistem pasak kayu elastis tahan gempa dan pahatan Gorga sakral.",
    description:
      "Rumah Bolon merupakan puncak peradaban arsitektur vernakular Batak Toba. Dibangun di atas tiang-tiang kayu bulat besar tanpa paku besi, bangunan ini dirancang untuk meredam gelombang gempa bumi tektonik kaldera Toba. Dinding luar dihiasi ukiran Gorga tiga warna sakral: merah, putih, dan hitam.",
    history:
      "Awalnya Rumah Bolon merupakan kediaman resmi para raja Batak dan tetua huta (perkampungan adat). Contoh tertua yang masih berdiri kokoh dapat disaksikan di Desa Lumban Suhi-Suhi Samosir dan Kompleks Istana Raja Purba.",
    philosophy:
      "Mencerminkan mikrokosmos kosmologi Batak yang terbagi menjadi tiga alam: Banua Toru (kolong bawah untuk ternak), Banua Tonga (lantai tengah untuk kehidupan manusia), dan Banua Ginjang (loteng atap untuk penyimpanan pusaka dan alam roh leluhur).",
    culturalContext:
      "Pintu masuk dibuat rendah memaksa siapa pun membungkukkan kepala saat melangkah masuk, sebagai simbol penghormatan dan kerendahan hati kepada tuan rumah.",
    sources: [
      "Balai Pelestarian Kebudayaan Wilayah II Sumut (Inventarisasi Cagar Budaya Samosir)",
      "Pusat Kajian Arsitektur Vernakular Nusantara UI",
    ],
    relatedElements: [
      { id: "ulos-batak-toba", name: "Kain Tenun Ulos Batak Toba", region: "Samosir" },
      { id: "gorga-batak", name: "Seni Ukir Gorga Batak", region: "Toba" },
    ],
    verificationStatus: "VERIFIED",
    publicationStatus: "PUBLISHED",
  },
  {
    id: "tortor-batak",
    slug: "tortor-batak",
    name: "Seni Tari Tradisional Tortor",
    category: "Music & Dance",
    region: "Sumatera Utara",
    subRegion: "Samosir",
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Gerak tari sakral dengan hentakan tumit kaki dan lentikan telapak tangan (somba) sebagai media doa, komunikasi batin, dan penghormatan leluhur.",
    description:
      "Tortor bukanlah tontonan hiburan semata, melainkan tarian doa peribadatan dan media komunikasi batin masyarakat Batak Toba. Setiap liukan tangan dan hentakan kaki ke lantai panggung memiliki arti permohonan keselamatan kepada Mulajadi Na Bolon serta pemuliaan para leluhur.",
    history:
      "Ditarikan sejak zaman animisme purba saat upacara pembersihan desa, penyambutan tamu raja, hingga upacara duka cita kematian.",
    philosophy:
      "Gerakan kedua belah tangan yang diangkat ke depan dada melambangkan Somba (sembah hormat) dan keterbukaan menerima berkat ilahi.",
    culturalContext:
      "Wajib ditarikan dengan selempang kain ulos dan dipandu oleh arahan hasapi dan tabuhan ogung Gondang Bolon.",
    sources: [
      "Kementerian Pendidikan & Kebudayaan RI (WBTb No. 201300002)",
      "Kajian Koreografi Tradisional Nusantara",
    ],
    relatedElements: [
      { id: "gondang-sabangunan", name: "Musik Tradisional Gondang Sabangunan", region: "Toba" },
      { id: "ulos-batak-toba", name: "Kain Tenun Ulos Batak Toba", region: "Samosir" },
    ],
    verificationStatus: "VERIFIED",
    publicationStatus: "PUBLISHED",
  },
  {
    id: "gondang-sabangunan",
    slug: "gondang-sabangunan",
    name: "Musik Tradisional Gondang Bolon & Sabangunan",
    category: "Music & Dance",
    region: "Sumatera Utara",
    subRegion: "Toba",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Ensembel instrumen sakral Batak Toba yang memadukan taganing, ogung, sarune bolon, dan hesek sebagai media doa.",
    description:
      "Gondang Sabangunan adalah orkestrasi perkusi dan tiup sakral yang berfungsi sebagai jembatan komunikasi antara manusia dengan Sang Pencipta (Mulajadi Na Bolon) dan para leluhur dalam ritus adat Batak Toba.",
    history:
      "Instrumen taganing (kendang melodik bernada lima) dan sarune bolon telah dimainkan sejak era pra-kolonial di dataran tinggi Toba untuk mengiringi raja-raja dan tetua adat.",
    philosophy:
      "Irama ritmis gondang mewakili detak jantung kehidupan dan harmoni sosial di antara kelompok masyarakat marga.",
    culturalContext:
      "Wajib hadir pada ritual Mangongkal Holi, pesta perkawinan adat, dan peresmian Rumah Bolon baru.",
    sources: [
      "Balai Konservasi Budaya Sumatera Utara",
      "Inventarisasi Musik Tradisional Batak Toba",
    ],
    relatedElements: [
      { id: "tortor-batak", name: "Seni Tari Tradisional Tortor", region: "Samosir" },
      { id: "sigale-gale", name: "Pertunjukan Boneka Kayu Sigale-gale", region: "Samosir" },
    ],
    verificationStatus: "VERIFIED",
    publicationStatus: "PUBLISHED",
  },
  {
    id: "sigale-gale",
    slug: "sigale-gale",
    name: "Pertunjukan Boneka Kayu Sigale-gale",
    category: "Music & Dance",
    region: "Sumatera Utara",
    subRegion: "Samosir",
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Boneka kayu mekanik tradisional yang dapat menari Tor-Tor mengiringi upacara duka cita mendalam di Pulau Samosir.",
    description:
      "Sigale-gale adalah mahakarya seni patung boneka kayu bersendi kompleks yang dihubungkan tali-tali tersembunyi. Digerakkan oleh dalang dari balik tabir, boneka ini mampu menarikan Tor-Tor dengan lentur mengikuti alunan ansambel Gondang Sabangunan untuk menghibur orang tua yang kehilangan anak penerus garis keturunan.",
    history:
      "Bermula dari kisah legenda Raja Rahat di Pulau Samosir yang jatuh sakit parah karena duka mendalam setelah putra semata wayangnya, Manggale, gugur di medan perang tanpa sempat berketurunan. Seorang Datu memahat replika kayu sang pangeran dan memanggil rohnya untuk menari.",
    philosophy:
      "Mencerminkan nilai luhur masyarakat Batak mengenai kesinambungan generasi (hagabeon), pelepasan kedukaan yang diubah menjadi karya seni katarsis, serta pemuliaan arwah leluhur.",
    culturalContext:
      "Dipentaskan dalam upacara Papurpur Sipinggan di Tomok dan Simanindo dengan iringan gondang, di mana para penonton menyematkan ulos dan uang sumbangan ke tangan sang boneka.",
    sources: [
      "Dinas Pariwisata dan Kebudayaan Kabupaten Samosir",
      "Katalog Warisan Budaya Takbenda Kemendikbud No. 201300003",
    ],
    relatedElements: [
      { id: "gondang-sabangunan", name: "Musik Tradisional Gondang Sabangunan", region: "Toba" },
      { id: "ulos-batak-toba", name: "Kain Tenun Ulos Batak Toba", region: "Samosir" },
    ],
    verificationStatus: "VERIFIED",
    publicationStatus: "PUBLISHED",
  },
  {
    id: "dalihan-na-tolu",
    slug: "dalihan-na-tolu",
    name: "Filosofi Kekerabatan Dalihan Na Tolu",
    category: "Social Values",
    region: "Sumatera Utara",
    subRegion: "Toba",
    imageUrl: "https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Tungku berkaki tiga: landasan filosofis tatanan sosial, hukum adat, dan etika relasi kekeluargaan masyarakat Batak.",
    description:
      "Dalihan Na Tolu adalah kearifan sosiologis tertua suku Batak yang menopang seluruh struktur hubungan kemasyarakatan. Tiga pilarnya yaitu: Somba Marhula-hula (Hormat pada keluarga pihak istri), Elek Marboru (Mengayomi pihak perempuan/saudari), dan Manat Mardongan Tubu (Hati-hati dan santun pada teman semarga).",
    history:
      "Diformulasikan oleh para tetua leluhur Batak berabad-abad lampau di Pusuk Buhit untuk mencegah perpecahan antarmarga dan menjamin keadilan musyawarah.",
    philosophy:
      "Sebagaimana tungku berkaki tiga yang stabil memasak periuk di atas perapian, masyarakat tidak akan pernah timpang atau goyah jika ketiga pilar ini dipatuhi.",
    culturalContext:
      "Diterapkan setiap hari dalam pengambilan keputusan adat, musyawarah perkawinan, pembagian warisan tanah adat, dan ritual perdamaian.",
    sources: [
      "Lembaga Adat Batak Toba Nusantara",
      "Kajian Antropologi Hukum Adat Batak Universitas Sumatera Utara",
    ],
    relatedElements: [
      { id: "ulos-batak-toba", name: "Kain Tenun Ulos Batak Toba", region: "Samosir" },
      { id: "mangulosi", name: "Tradisi Ritual Mangulosi", region: "Samosir" },
    ],
    verificationStatus: "VERIFIED",
    publicationStatus: "PUBLISHED",
  },
  {
    id: "mangulosi",
    slug: "mangulosi",
    name: "Ritual Adat Sakral Mangulosi",
    category: "Traditional Ceremonies",
    region: "Sumatera Utara",
    subRegion: "Samosir",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Upacara sakral penyematan kain ulos dari tetua hula-hula kepada boru untuk mengalirkan doa keberkahan dan perlindungan rohani.",
    description:
      "Mangulosi adalah inti dari hampir setiap upacara adat Batak Toba. Hula-hula dengan khidmat membentangkan kain ulos terpilih ke kedua pundak penerima sambil melafalkan umpasa (syair doa dan restu kebijaksanaan).",
    history:
      "Telah dipraktikkan tanpa terputus selama ribuan tahun sebagai bentuk legitimasi sosial dan hukum kekeluargaan masyarakat Batak.",
    philosophy:
      "Mengajarkan ketundukan generasi muda terhadap wejangan orang tua dan pentingnya perlindungan rohani dari Sang Khalik.",
    culturalContext:
      "Wajib dipatuhi dengan tata krama ketat, di mana motif ulos yang disematkan harus sesuai dengan jenis upacara (Ragi Hotang, Sibolang, atau Bintang Maratur).",
    sources: [
      "Lembaga Adat Budaya Batak Toba",
      "Katalog WBTb Kemendikbud",
    ],
    relatedElements: [
      { id: "ulos-batak-toba", name: "Kain Tenun Ulos Batak Toba", region: "Samosir" },
      { id: "dalihan-na-tolu", name: "Filosofi Kekerabatan Dalihan Na Tolu", region: "Toba" },
    ],
    verificationStatus: "VERIFIED",
    publicationStatus: "PUBLISHED",
  },
  {
    id: "gorga-batak",
    slug: "gorga-batak",
    name: "Seni Ukir Pahat Gorga Batak",
    category: "Traditional Crafts",
    region: "Sumatera Utara",
    subRegion: "Toba",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Ragam hias ukir pahat kayu berpilin tiga warna sakral (merah, putih, hitam) sarat makna penolak bala dan kesuburan hidup.",
    description:
      "Gorga adalah seni dekoratif adiluhung yang dipahatkan pada dinding luar Rumah Bolon dan peti pusaka. Menggunakan perpaduan tiga warna kosmik Batak (Sitiga Bolit): merah dari batu hematit gincu, putih dari kapur sirih, dan hitam dari jelaga arang periuk.",
    history:
      "Motif Boraspati ni Tano (cicak) dan Adop-adop (payudara lambang kesuburan) telah dipahatkan sejak era megalitikum Toba.",
    philosophy:
      "Melambangkan kemampuan orang Batak untuk bertahan di mana pun merantau (seperti cicak yang bisa merayap di mana saja) serta kemakmuran anak cucu.",
    culturalContext:
      "Dipahat oleh para Pande Ukir ahli dengan tata krama pantangan adat sebelum memulai penataan kayu.",
    sources: [
      "Buku Ornamen Ukir Tradisional Batak Toba Kemendikbud",
      "Balai Cagar Budaya Sumatera Utara",
    ],
    relatedElements: [
      { id: "rumah-bolon", name: "Arsitektur Rumah Adat Bolon", region: "Samosir" },
    ],
    verificationStatus: "VERIFIED",
    publicationStatus: "PUBLISHED",
  },
  {
    id: "legenda-danau-toba",
    slug: "legenda-danau-toba",
    name: "Legenda Putri Ikan Mas & Pusuk Buhit",
    category: "Oral Heritage",
    region: "Sumatera Utara",
    subRegion: "Samosir",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Narasi lisan tentang Danau Toba, janji suci putri ikan, dan gunung Pusuk Buhit sebagai cikal bakal asal mula orang Batak.",
    description:
      "Legenda Danau Toba menceritakan tentang Toba yang melanggar sumpah rahasia kepada istrinya, seorang jelmaan ikan emas ajaib, dengan memanggil anaknya Samosir 'anak ikan'. Air bah meluap menenggelamkan daratan dan membentuk danau kawah megah.",
    history:
      "Secara geologis beriringan dengan letusan dahsyat Supervulkan Toba 74.000 tahun lalu, diabadikan dalam sastra lisan turun-temurun oleh para penutur turiturian.",
    philosophy:
      "Amanat penting mengenai integritas menjaga janji, pantangan mengumbar aib keluarga, serta penghormatan pada alam dan sumber air Danau Toba.",
    culturalContext:
      "Dicatat dan diceritakan oleh para tetua adat saat malam hari atau pengantar tidur anak-anak di perkampungan huta.",
    sources: [
      "Arsip Sastra Lisan Balai Bahasa Sumatera Utara",
      "Geopark Kaldera Toba UNESCO Global Geopark",
    ],
    relatedElements: [
      { id: "sigale-gale", name: "Pertunjukan Boneka Kayu Sigale-gale", region: "Samosir" },
      { id: "rumah-bolon", name: "Arsitektur Rumah Adat Bolon", region: "Samosir" },
    ],
    verificationStatus: "VERIFIED",
    publicationStatus: "PUBLISHED",
  },
  {
    id: "istana-sisingamangaraja",
    slug: "istana-sisingamangaraja",
    name: "Kompleks Istana Raja Sisingamangaraja Lembah Bakkara",
    category: "Traditional Architecture",
    region: "Sumatera Utara",
    subRegion: "Humbang Hasundutan",
    imageUrl: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Kawasan situs bersejarah pusat kepemimpinan spiritual dan perlawanan Raja Sisingamangaraja XII di lembah Bakkara nan megah.",
    description:
      "Terletak di lembah subur Bakkara di tepi barat daya Danau Toba, kompleks istana ini dikelilingi tebing-tebing air terjun menjulang. Menyimpan makam raja, batu siungkapunkapon, dan mata air keramat Aek Sipangolu.",
    history:
      "Menjadi benteng pertahanan dinasti Sisingamangaraja I hingga XII selama lebih dari 300 tahun dari serangan pasukan kolonial Belanda.",
    philosophy:
      "Simbol kemerdekaan, kegigihan spiritual membela tanah pusaka, dan kearifan melestarikan hutan kemenyan haminjon.",
    culturalContext:
      "Menjadi tempat ziarah sejarah kebangsaan dan ritual pembersihan diri spiritual (maranggir) masyarakat adat.",
    sources: [
      "Balai Pelestarian Kebudayaan Wilayah II Sumatera Utara",
      "Dinas Pariwisata dan Kebudayaan Humbang Hasundutan",
    ],
    relatedElements: [
      { id: "ulos-batak-toba", name: "Kain Tenun Ulos Batak Toba", region: "Samosir" },
      { id: "rumah-bolon", name: "Arsitektur Rumah Adat Bolon", region: "Samosir" },
    ],
    verificationStatus: "VERIFIED",
    publicationStatus: "PUBLISHED",
  },
  {
    id: "tradisi-haminjon",
    slug: "tradisi-haminjon",
    name: "Kearifan Budaya Penderes Kemenyan Haminjon",
    category: "Social Values",
    region: "Sumatera Utara",
    subRegion: "Tapanuli Utara",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Tradisi adat pemanenan getah pohon kemenyan hutan purba dengan bahasa sandi tabu dan ritual pemuliaan penunggu rimba.",
    description:
      "Haminjon (kemenyan Sumatera) adalah komoditas perdagangan kuno yang diekspor hingga ke Mesir dan Yunani Kuno sejak abad ke-3 Masehi. Para penderes di Tapanuli Utara menerapkan kode etik ketat menggunakan bahasa rahasia saat berada di hutan rimba.",
    history:
      "Telah tercatat dalam peta naskah perniagaan maritim kuno Barus dan menjadi urat nadi peradaban pedalaman Batak.",
    philosophy:
      "Mengajarkan keselarasan manusia dengan hutan lindung: dilarang menebang pohon kemenyan dan wajib menjaga kemurnian sumber mata air.",
    culturalContext:
      "Dipraktikkan oleh paguyuban petani adat di Dolok Sanggul dan Tarutung, menghasilkan kemenyan kualitas dunia.",
    sources: [
      "Balai Riset Budaya Kehutanan Kemendikbudristek",
      "Asosiasi Petani Kemenyan Tapanuli Utara",
    ],
    relatedElements: [
      { id: "dalihan-na-tolu", name: "Filosofi Kekerabatan Dalihan Na Tolu", region: "Toba" },
    ],
    verificationStatus: "VERIFIED",
    publicationStatus: "PUBLISHED",
  },
];

// Cultural Knowledge Graph Network for Toba Soul
export const CULTURAL_KNOWLEDGE_GRAPH = {
  coreId: "ulos-batak-toba",
  nodes: [
    {
      id: "ulos-batak-toba",
      label: "Kain Tenun Ulos",
      category: "Traditional Textiles",
      type: "core" as const,
      description: "Pusat mahakarya tenun sakral Batak Toba yang mengikat hubungan kekeluargaan lahir batin.",
      sources: ["WBTb Kemendikbudristek No. 201400108"],
    },
    {
      id: "mangulosi",
      label: "Ritual Adat Mangulosi",
      category: "Traditional Ceremonies",
      type: "ritual" as const,
      description: "Upacara penyematan ulos dari hula-hula untuk mengalirkan doa keselamatan, tondi, dan berkah hidup.",
      sources: ["Balai Pelestarian Kebudayaan Wilayah II Sumut"],
    },
    {
      id: "dalihan-na-tolu",
      label: "Filosofi Dalihan Na Tolu",
      category: "Social Values",
      type: "philosophy" as const,
      description: "Tatanan kekerabatan tiga pilar (Somba Marhula-hula, Elek Marboru, Manat Mardongan Tubu) yang menentukan aturan pemberian ulos.",
      sources: ["Lembaga Adat Batak Toba"],
    },
    {
      id: "tenun-gedogan",
      label: "Kriya Tenun Gedogan & Salaon",
      category: "Traditional Crafts",
      type: "craft" as const,
      description: "Proses pembuatan benang pintal dan pewarnaan alami ekstrak daun indigofera (salaon) yang memakan waktu berbulan-bulan.",
      sources: ["Puslitbang Seni Rupa & Kriya Tradisional"],
    },
    {
      id: "huta-raja",
      label: "Sentra Penenun Huta Raja",
      category: "Living Community",
      type: "community" as const,
      description: "Perkampungan penenun tradisional di pesisir Danau Toba, Pulau Samosir, tempat para maestro penenun menjaga pakem motif kuno.",
      sources: ["Pemerintah Kabupaten Samosir"],
    },
    {
      id: "gondang-sabangunan",
      label: "Musik Gondang Sabangunan",
      category: "Music & Dance",
      type: "music" as const,
      description: "Ansambel musik perkusi sakral yang wajib ditabuh saat upacara penyerahan ulos kepada pengantin atau orang tua.",
      sources: ["Inventarisasi Kesenian Tradisional Batak"],
    },
    {
      id: "samosir-toba",
      label: "Lanskap Samosir & Danau Toba",
      category: "Geological Heritage",
      type: "region" as const,
      description: "Bentang alam geologis kaldera Toba yang menjadi rahim peradaban kosmologi dan tempat bertumbuhnya pohon kapas liar.",
      sources: ["UNESCO Global Geopark Kaldera Toba"],
    },
  ],
  edges: [
    {
      id: "e1",
      source: "ulos-batak-toba",
      target: "mangulosi",
      relation: "Digunakan dalam ritual",
      detail: "Ulos adalah objek inti yang disematkan dalam seluruh ritus daur hidup Mangulosi.",
    },
    {
      id: "e2",
      source: "ulos-batak-toba",
      target: "dalihan-na-tolu",
      relation: "Dipandu oleh filosofi",
      detail: "Penentuan siapa yang berhak memberi dan menerima ulos diatur tegas oleh sistem kekerabatan Dalihan Na Tolu.",
    },
    {
      id: "e3",
      source: "ulos-batak-toba",
      target: "tenun-gedogan",
      relation: "Dihasilkan melalui kriya",
      detail: "Menggunakan teknologi alat tenun gendong kayu tanpa mesin dan ramuan pewarna alami salaon.",
    },
    {
      id: "e4",
      source: "ulos-batak-toba",
      target: "huta-raja",
      relation: "Dilestarikan oleh komunitas",
      detail: "Komunitas perempuan penenun Huta Raja di Samosir mewariskannya dari ibu ke anak perempuan.",
    },
    {
      id: "e5",
      source: "mangulosi",
      target: "gondang-sabangunan",
      relation: "Diiringi ritus suara",
      detail: "Tarian Tor-Tor saat mangulosi harus selaras dengan irama taganing dan tiupan sarune gondang.",
    },
    {
      id: "e6",
      source: "huta-raja",
      target: "samosir-toba",
      relation: "Berakar di bentang alam",
      detail: "Terletak tepat di bibir perairan Pulau Samosir dengan latar tebing kaldera Danau Toba.",
    },
  ],
};

// Destination Pins for Map integration
export interface DestinationPin {
  id: string;
  name: string;
  province: string;
  coordinates: string;
  description: string;
  culturalElements: string[];
  activities: string[];
}

export const DESTINATION_PINS: DestinationPin[] = [
  {
    id: "danau-toba-samosir",
    name: "Kawasan Danau Toba & Pulau Samosir",
    province: "Sumatera Utara",
    coordinates: "2.6121° N, 98.6638° E",
    description:
      "Pusat peradaban luhur suku Batak Toba dan tanah kelahiran Raja Sisingamangaraja, kaya akan tenun ulos Huta Raja, boneka Sigale-gale, dan arsitektur Rumah Bolon.",
    culturalElements: [
      "Tenun Ulos Huta Raja",
      "Arsitektur Rumah Adat Bolon",
      "Seni Musik Gondang Sabangunan",
      "Boneka Kayu Sigale-gale",
    ],
    activities: [
      "Mengikuti Belajar Tenun Ulos Tradisional bersama Maestro",
      "Menari Tor-Tor Bersama Patung Sigale-gale di Tomok",
      "Ziarah Sejarah Lembah Bakkara & Mata Air Aek Sipangolu",
    ],
  },
  {
    id: "borobudur",
    name: "Kawasan Candi Borobudur",
    province: "Jawa Tengah (Magelang)",
    coordinates: "7.6079° S, 110.2038° E",
    description:
      "Mahakarya candi Buddha terbesar di dunia dari dinasti Syailendra abad ke-8, dikelilingi perbukitan Menoreh dan desa-desa pengrajin gerabah.",
    culturalElements: [
      "Arsitektur Pahatan Relief Karmawibhangga",
      "Penyulingan Minyak Atsiri Desa Klipoh",
      "Batik Motif Borobudur",
    ],
    activities: [
      "Tur Filosofi Relief bersama Pemandu Budaya",
      "Workshop Pembuatan Gerabah Tradisional Klipoh",
      "Meditasi Fajar Borobudur & Jelajah Desa Candirejo",
    ],
  },
];

// AI Knowledge Base
export interface AIAssistantDemo {
  question: string;
  answer: string;
  sources: string[];
  relatedReadings: string[];
}

export const AI_KNOWLEDGE_BASE: Record<string, AIAssistantDemo> = {
  ulos: {
    question: "Apa makna filosofis dan aturan sakral pemberian Kain Ulos Batak?",
    answer:
      "Ulos melambangkan tondi (jiwa) dan kehangatan restu. Dalam filosofi Batak 'Ijuk pangihot ni dame, ulos pangihot ni holong', ulos mengikat kasih sayang antarmarga. Pemberiannya diatur oleh Dalihan Na Tolu: hanya pihak Hula-hula (keluarga pemberi istri) yang berhak menyematkan ulos kepada pihak Boru, tidak boleh dibeli sendiri untuk ritual atau diberikan ke atas garis silsilah.",
    sources: [
      "Katalog WBTb Kemendikbudristek No. Reg: 201400108",
      "Buku Pedoman Adat Batak Dalihan Na Tolu",
    ],
    relatedReadings: [
      "Perbedaan Motif Ulos Ragi Hotang, Sibolang, dan Mangiring",
      "Sejarah Kampung Ulos Huta Raja Samosir",
    ],
  },
  megamendung: {
    question: "Apa makna filosofis motif Batik Mega Mendung dari Cirebon?",
    answer:
      "Motif Mega Mendung melambangkan bentuk awan yang bergradasi 7 lapisan warna. Filosofi utamanya adalah tentang kesabaran dan ketenangan jiwa manusia dalam menghadapi gejolak emosi.",
    sources: ["Balai Besar Kerajinan dan Batik Kemendikbud"],
    relatedReadings: ["Sejarah Akulturasi Budaya di Pesisir Utara"],
  },
};

// ==============================================================
// CULTURAL MAP DATA (TOBA CULTURAL EXPLORATION MAP)
// ==============================================================

export type TobaMapCategoryType =
  | "All"
  | "Historical Heritage"
  | "Traditional Village"
  | "Arts & Crafts"
  | "Cultural Experience"
  | "Local Culinary"
  | "Museum";

export interface TobaMapCategoryInfo {
  id: TobaMapCategoryType;
  name: string;
  label: string;
  colorBg: string;
  colorText: string;
  borderColor: string;
}

export const TOBA_MAP_CATEGORIES: TobaMapCategoryInfo[] = [
  {
    id: "All",
    name: "Semua Kategori",
    label: "All",
    colorBg: "bg-stone-900",
    colorText: "text-white",
    borderColor: "border-stone-900",
  },
  {
    id: "Historical Heritage",
    name: "Situs Sejarah",
    label: "Heritage",
    colorBg: "bg-amber-600",
    colorText: "text-white",
    borderColor: "border-amber-600",
  },
  {
    id: "Traditional Village",
    name: "Desa Adat",
    label: "Traditional Village",
    colorBg: "bg-emerald-600",
    colorText: "text-white",
    borderColor: "border-emerald-600",
  },
  {
    id: "Arts & Crafts",
    name: "Sentra Kriya & Ulos",
    label: "Arts & Crafts",
    colorBg: "bg-indigo-600",
    colorText: "text-white",
    borderColor: "border-indigo-600",
  },
  {
    id: "Cultural Experience",
    name: "Pengalaman & Pentas",
    label: "Experience",
    colorBg: "bg-rose-600",
    colorText: "text-white",
    borderColor: "border-rose-600",
  },
  {
    id: "Local Culinary",
    name: "Kuliner Khas Batak",
    label: "Culinary",
    colorBg: "bg-orange-600",
    colorText: "text-white",
    borderColor: "border-orange-600",
  },
  {
    id: "Museum",
    name: "Museum Budaya",
    label: "Museum",
    colorBg: "bg-blue-600",
    colorText: "text-white",
    borderColor: "border-blue-600",
  },
];

export interface TobaDestinationDetail {
  id: string;
  name: string;
  category: "Historical Heritage" | "Traditional Village" | "Arts & Crafts" | "Cultural Experience" | "Local Culinary" | "Museum";
  area: string;
  subRegion: string;
  coordinates: string;
  lat: number;
  lng: number;
  mapX: number; // percentage X position on calibrated Toba canvas (0-100)
  mapY: number; // percentage Y position on calibrated Toba canvas (0-100)
  tagline: string;
  description: string;
  fullStory: string;
  culturalSignificance: string;
  highlights: string[];
  activities: string[];
  visitingHours: string;
  entryFee: string;
  howToGetThere: string;
  imageUrl: string;
  isFeatured?: boolean;
  isHiddenGem?: boolean;
}

export const TOBA_MAP_DESTINATIONS: TobaDestinationDetail[] = [
  {
    id: "huta-siallagan",
    name: "Huta Siallagan & Batu Parsidangan",
    category: "Traditional Village",
    area: "Ambarita, Pulau Samosir",
    subRegion: "Samosir",
    coordinates: "2.6738° N, 98.8406° E",
    lat: 2.6738,
    lng: 98.8406,
    mapX: 63,
    mapY: 34,
    tagline: "Perkampungan Adat Berpagar Batu & Pengadilan Megalitikum",
    description:
      "Desa adat Batak berbenteng batu andesit yang didirikan ratusan tahun lalu oleh Raja Lopian Siallagan, terkenal dengan Batu Kursi Persidangan di bawah naungan pohon suci Hariara.",
    fullStory:
      "Huta Siallagan menyajikan benteng pertahanan alami berupa tembok batu cadas setinggi dua meter yang dipagari rumpun bambu berduri untuk menangkal serangan musuh antarhuta. Di tengah pelataran berdiri meja batu persidangan tempat raja, penasihat, dan Datu menggelar peradilan adat. Terpidana kejahatan berat dieksekusi di atas batu khusus dan darahnya dipercikkan sebagai penolak bala.",
    culturalSignificance:
      "Bukti kematangan sistem hukum pidana dan perdata adat Batak sebelum kedatangan kolonial, mengedepankan musyawarah sakral para tetua.",
    highlights: [
      "Batu Kursi Persidangan Kuno",
      "Deretan Rumah Bolon Berukir Gorga",
      "Pohon Suci Kebenaran Hariara",
      "Patung Penjaga Pangulubalang",
    ],
    activities: [
      "Tur filosofi hukum adat bersama pemandu keturunan raja",
      "Mencoba busana adat Batak dan menarikan Tortor",
      "Belajar makna ornamen Gorga Boraspati ni Tano",
    ],
    visitingHours: "Setiap hari, 08.00 - 18.00 WIB",
    entryFee: "Rp 10.000 / orang (Donasi Cagar Budaya)",
    howToGetThere: "10 menit berkendara ke arah utara dari Pelabuhan Ferry Tomok, atau 5 menit dari Tuktuk Siadong.",
    imageUrl: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
  },
  {
    id: "tb-silalahi-center",
    name: "Museum Batak Balige (TB Silalahi Center)",
    category: "Museum",
    area: "Balige, Kabupaten Toba",
    subRegion: "Toba",
    coordinates: "2.3338° N, 99.0664° E",
    lat: 2.3338,
    lng: 99.0664,
    mapX: 78,
    mapY: 76,
    tagline: "Pusat Pelestarian & Ensiklopedia Budaya Batak Modern",
    description:
      "Museum bertaraf internasional yang memamerkan ribuan koleksi artefak kuno, senjata pusaka, naskah Pustaha Laklak, dan replika desa tradisional Batak tepi Danau Toba.",
    fullStory:
      "Terletak megah di tepi danau Balige, Museum Batak TB Silalahi Center memadukan estetika arsitektur kontemporer dengan lekukan atap Rumah Bolon berlapis gorga kuningan. Mengoleksi artefak dari enam puak Batak (Toba, Karo, Simalungun, Mandailing, Angkola, Pakpak), termasuk pedang kehormatan Raja Sisingamangaraja XII dan naskah kuno beraksara Batak.",
    culturalSignificance:
      "Pusat rujukan akademis dan dokumentasi peradaban Batak terlengkap di Sumatera Utara.",
    highlights: [
      "Pedang pusaka Raja Sisingamangaraja XII",
      "Koleksi Pustaha Laklak kulit kayu ratusan tahun",
      "Perkampungan adat replika utuh tepi pantai danau",
      "Koleksi tenun Ulos dari 6 puak Batak",
    ],
    activities: [
      "Tur kuratorial menjelajahi asal-usul aksara dan marga",
      "Melihat demonstrasi penulisan Surat Batak kuno",
      "Foto berlatar panorama Danau Toba dan Rumah Bolon",
    ],
    visitingHours: "Selasa – Minggu, 08.30 - 17.30 WIB (Senin tutup)",
    entryFee: "Rp 20.000 (Domestik) / Rp 50.000 (Mancanegara)",
    howToGetThere: "5 menit dari pusat Kota Balige atau 35 menit perjalanan darat dari Bandara Internasional Silangit (DTB).",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
  },
  {
    id: "kampung-huta-raja",
    name: "Kampung Ulos Huta Raja",
    category: "Arts & Crafts",
    area: "Lumban Suhi-suhi, Samosir",
    subRegion: "Samosir",
    coordinates: "2.6105° N, 98.7180° E",
    lat: 2.6105,
    lng: 98.7180,
    mapX: 38,
    mapY: 42,
    tagline: "Sentra Penenun Ulos Gedogan Pesisir Tertua",
    description:
      "Desa cagar budaya di pesisir barat Danau Toba tempat para maestro inang penenun menjaga pakem tenun gedogan manual dan ramuan pewarna alami daun indigo salaon.",
    fullStory:
      "Kampung Ulos Huta Raja memiliki deretan Rumah Bolon kayu jati asli yang berhadapan langsung dengan perairan tenang Danau Toba. Suara denting kayu alat tenun gedogan terdengar setiap hari dari kolong-kolong rumah panggung saat para inang merajut helai demi helai benang katun menjadi Ulos Ragi Hotang, Sibolang, dan Sadum.",
    culturalSignificance:
      "Pusat pelestarian teknik kriya tenun warisan leluhur tanpa mesin yang diwariskan turun-temurun antargenerasi perempuan Batak.",
    highlights: [
      "Deretan Rumah Bolon tertua di Pulau Samosir",
      "Pewarnaan benang dari ekstrak daun salaon",
      "Beli ulos autentik langsung dari pembuatnya",
    ],
    activities: [
      "Workshop singkat menjajal alat tenun gedogan",
      "Belajar filosofi pemilihan motif ulos untuk upacara adat",
      "Menyusuri dermaga kayu tepi danau yang fotogenik",
    ],
    visitingHours: "Setiap hari, 08.00 - 18.00 WIB",
    entryFee: "Gratis (Donasi sukarela ke sanggar penenun)",
    howToGetThere: "15 menit berkendara dari Pangururan, ibu kota Kabupaten Samosir.",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
  },
  {
    id: "makam-raja-sidabutar",
    name: "Makam Megalitikum Raja Sidabutar & Sigale-gale",
    category: "Historical Heritage",
    area: "Tomok, Pulau Samosir",
    subRegion: "Samosir",
    coordinates: "2.6587° N, 98.8653° E",
    lat: 2.6587,
    lng: 98.8653,
    mapX: 68,
    mapY: 48,
    tagline: "Peti Batu Sarkofagus Berusia 450 Tahun & Boneka Penari",
    description:
      "Situs pemakaman megalitikum sakral penguasa pertama tanah Tomok berwajah singa Batak serta sanggar pementasan boneka mistis Sigale-gale.",
    fullStory:
      "Raja Ompu Soribuntu Sidabutar adalah sosok mistis sakti penguasa Tomok. Jenazahnya disemayamkan di peti batu utuh tanpa ditanam ke dalam tanah. Di kompleks ini wisatawan wajib mengenakan selendang ulos dan dapat menyaksikan pertunjukan boneka kayu Sigale-gale yang menari mengikuti tabuhan ensembel Gondang Sabangunan.",
    culturalSignificance:
      "Situs arkeologi megalitikum hidup tertua yang merefleksikan penghormatan arwah leluhur dan kepemimpinan niniak Batak.",
    highlights: [
      "Sarkofagus batu monolitik berpahat singa Batak",
      "Patung Anting Malela (kekasih abadi Raja Sidabutar)",
      "Pertunjukan interaktif menari bersama Sigale-gale",
    ],
    activities: [
      "Mengenakan selempang ulos bergaris tiga warna sakral",
      "Menari Tortor Somba mengiringi boneka Sigale-gale",
      "Berburu kain ulos dan pahatan gorga di pasar seni Tomok",
    ],
    visitingHours: "Setiap hari, 08.00 - 18.00 WIB",
    entryFee: "Rp 5.000 / orang (Situs makam) & Tiket pertunjukan Sigale-gale",
    howToGetThere: "5 menit berjalan kaki dari Pelabuhan Kapal Ferry Tomok Samosir.",
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
  },
  {
    id: "museum-simanindo",
    name: "Museum Huta Bolon Simanindo",
    category: "Cultural Experience",
    area: "Simanindo, Ujung Utara Samosir",
    subRegion: "Samosir",
    coordinates: "2.7483° N, 98.7516° E",
    lat: 2.7483,
    lng: 98.7516,
    mapX: 52,
    mapY: 18,
    tagline: "Museum Benteng Tradisional & Panggung Tortor Terbuka",
    description:
      "Bekas kompleks istana Raja Sidauruk yang diubah menjadi museum hidup, menyuguhkan pementasan tari Tortor sakral dan musik Gondang setiap pagi.",
    fullStory:
      "Perkampungan benteng Huta Bolon dilindungi pagar tanah tinggi dan pepohonan bambu. Rumah Bolon utama menyimpan tengkorak kerbau persembahan dari pesta horja masa lalu. Setiap jam 10.30 pagi, sanggar tari setempat mementaskan tarian Tortor Tunggal Panaluan dan persembahan cawan air sakral untuk keselamatan pengunjung.",
    culturalSignificance:
      "Pelestari tata ruang perkampungan huta lengkap dengan lumbung padi sopo dan panggung pertunjukan terbuka.",
    highlights: [
      "Pementasan Tortor Tunggal Panaluan dan Sigale-gale",
      "Koleksi Pustaha Laklak dan tombak perang kuno",
      "Arsitektur gerbang benteng parik pertahanan",
    ],
    activities: [
      "Menyaksikan pertunjukan tari adat Batak sesi pagi",
      "Mengamati ornamen gorga ukiran rumah raja",
      "Memberikan saweran ulos pada akhir pementasan",
    ],
    visitingHours: "Setiap hari, 09.00 - 17.00 WIB (Pentas pukul 10.30 & 11.45 WIB)",
    entryFee: "Rp 20.000 / orang (Termasuk tiket pertunjukan)",
    howToGetThere: "30 menit dari Tuktuk atau 20 menit dari Pelabuhan Ferry Simanindo.",
    imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
  },
  {
    id: "desa-meat",
    name: "Desa Wisata Meat (Lembah Ulos)",
    category: "Arts & Crafts",
    area: "Kecamatan Tampahan, Toba",
    subRegion: "Toba",
    coordinates: "2.3210° N, 99.0150° E",
    lat: 2.3210,
    lng: 99.0150,
    mapX: 72,
    mapY: 74,
    tagline: "Lembah Persawahan Hijau Penenun Ulos Ragi Hotang",
    description:
      "Desa tersembunyi di lembah hijau tepi Danau Toba yang dijuluki 'Selandia Baru-nya Toba', di mana hampir seluruh perempuan warganya adalah penenun ulos.",
    fullStory:
      "Dikelilingi perbukitan pinus menjulang dan bentangan sawah hijau yang langsung menyentuh air danau, Meat adalah permata tersembunyi yang tenang. Di sini tradisi menenun Ulos Ragi Hotang diwariskan dari nenek moyang tanpa terganggu bisingnya lalu lintas kota.",
    culturalSignificance:
      "Komunitas penenun pedesaan yang memadukan keselarasan bertani sawah organik dengan kriya tekstil sakral.",
    highlights: [
      "Panorama lembah sawah hijau tepi Danau Toba",
      "Rumah-rumah panggung kayu dengan penenun aktif",
      "Pantai pasir putih alami Meat yang sepi",
    ],
    activities: [
      "Bersepeda melintasi pematang sawah dan perkampungan",
      "Menginap di homestay rumah adat warga (live-in)",
      "Membeli tenun ulos langsung dari penenun rumahan",
    ],
    visitingHours: "Buka 24 jam untuk wisatawan homestay",
    entryFee: "Gratis (Biaya parkir sukarela)",
    howToGetThere: "25 menit dari Kota Balige menyusuri jalan lingkar pesisir Tampahan.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    isHiddenGem: true,
  },
  {
    id: "lembah-bakkara",
    name: "Lembah Bakkara & Istana Sisingamangaraja",
    category: "Historical Heritage",
    area: "Bakkara, Humbang Hasundutan",
    subRegion: "Humbang Hasundutan",
    coordinates: "2.2694° N, 98.6756° E",
    lat: 2.2694,
    lng: 98.6756,
    mapX: 32,
    mapY: 78,
    tagline: "Lembah Sakral Istana Raja & Mata Air Suci Aek Sipangolu",
    description:
      "Lembah subur diapit tebing air terjun megah di tepi barat daya Danau Toba, pusat dinasti Sisingamangaraja I–XII dan sumber air keramat penawar racun.",
    fullStory:
      "Lembah Bakkara adalah benteng pertahanan legendaris Pahlawan Nasional Raja Sisingamangaraja XII. Di lembah ini mengalir mata air abadi Aek Sipangolu yang keluar dari celah batu cadas akibat hentakan tongkat sang raja saat musim kemarau panjang, dipercaya berkhasiat menyembuhkan penyakit.",
    culturalSignificance:
      "Pusat spiritual dan simbol perlawanan tanpa pamrih rakyat Batak melawan kolonialisme Belanda.",
    highlights: [
      "Situs Makam dan Istana Raja Sisingamangaraja",
      "Mata Air Suci Aek Sipangolu",
      "Tebing Air Terjun Janji yang megah",
      "Sentra pertanian Bawang Merah Bakkara",
    ],
    activities: [
      "Ziarah sejarah mengenang perjuangan Sisingamangaraja",
      "Membasuh wajah dengan mata air alami Aek Sipangolu",
      "Menikmati panorama lembah dari ketinggian Menara Pandang Bakkara",
    ],
    visitingHours: "Setiap hari, 07.30 - 18.00 WIB",
    entryFee: "Rp 5.000 / orang",
    howToGetThere: "45 menit berkendara dari Dolok Sanggul melalui jalan berliku spektakuler.",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
    isHiddenGem: true,
  },
  {
    id: "desa-tipang",
    name: "Desa Adat Tipang",
    category: "Traditional Village",
    area: "Bakti Raja, Humbang Hasundutan",
    subRegion: "Humbang Hasundutan",
    coordinates: "2.2950° N, 98.7050° E",
    lat: 2.2950,
    lng: 98.7050,
    mapX: 36,
    mapY: 72,
    tagline: "Terasering Sawah Purba Ratusan Tahun & Cagar Sarkofagus",
    description:
      "Desa persawahan kuno di tepi perairan danau dengan terasering bertingkat peninggalan tetua marga, makam batu kuno, dan panorama tebing kaldera.",
    fullStory:
      "Desa Tipang adalah contoh hidup kearifan sistem irigasi persawahan tradisional Batak (bondar) yang dialirkan dari air terjun Sigota-gota. Memiliki pulau kecil Pulau Simamora di tengah danau serta kompleks makam batu leluhur marga Simamora dan Purba.",
    culturalSignificance:
      "Integrasi tata kelola air pertanian komunal berbasis hukum adat dan penghormatan leluhur.",
    highlights: [
      "Terasering sawah bertingkat tepi Danau Toba",
      "Makam sarkofagus batu klan leluhur marga",
      "Air Terjun Sigota-gota",
    ],
    activities: [
      "Trekking menelusuri pematang sawah kuno dan air terjun",
      "Berperahu nelayan menuju Pulau Simamora",
      "Menikmati kopi arabika lokal Tipang",
    ],
    visitingHours: "Setiap hari, 07.00 - 18.00 WIB",
    entryFee: "Gratis",
    howToGetThere: "15 menit dari Bakkara atau 50 menit dari Bandara Silangit.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    isHiddenGem: true,
  },
  {
    id: "huta-ginjang",
    name: "Huta Ginjang Viewpoint & Heritage",
    category: "Historical Heritage",
    area: "Kecamatan Muara, Tapanuli Utara",
    subRegion: "Tapanuli Utara",
    coordinates: "2.3150° N, 98.9800° E",
    lat: 2.3150,
    lng: 98.9800,
    mapX: 62,
    mapY: 82,
    tagline: "Puncak Pandang 360 Derajat Kaldera & Doa Perbukitan",
    description:
      "Puncak perbukitan setinggi 1.555 mdpl yang menjadi lokasi terbaik menatap seluruh cekungan kaldera Toba dan Pulau Samosir dari ketinggian angkasa.",
    fullStory:
      "Nama Huta Ginjang berarti 'Desa di Ketinggian'. Dari titik ini pengunjung dapat memahami skala mahadasyat letusan supervulkan Toba purba. Terdapat situs doa bukit keramat dan landasan paralayang berskala internasional.",
    culturalSignificance:
      "Titik kontemplasi spiritual kosmologis memandang perpaduan ciptaan alam dan kediaman masyarakat adat Batak.",
    highlights: [
      "Panorama visual 360 derajat Danau Toba dan Samosir",
      "Bukit Doa Tabgha Huta Ginjang",
      "Spot paralayang dan fotografi senja",
    ],
    activities: [
      "Melihat lanskap Geopark Kaldera Toba secara utuh",
      "Mencicipi kacang sihobuk panggang pasir khas Silindung",
      "Menikmati kopi lintong panas di bibir tebing",
    ],
    visitingHours: "Setiap hari, 06.00 - 19.00 WIB",
    entryFee: "Rp 5.000 / orang",
    howToGetThere: "15 menit dari Bandara Silangit atau 30 menit dari Balige.",
    imageUrl: "https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=1000&q=80",
    isHiddenGem: true,
  },
  {
    id: "kuliner-naniura-balige",
    name: "Sentra Kuliner Dekke Naniura & Onan Balige",
    category: "Local Culinary",
    area: "Kota Balige, Kabupaten Toba",
    subRegion: "Toba",
    coordinates: "2.3360° N, 99.0680° E",
    lat: 2.3360,
    lng: 99.0680,
    mapX: 82,
    mapY: 72,
    tagline: "Pusat Eksplorasi Gastronomi Sashimi Batak & Pasar Pusaka",
    description:
      "Kawasan kuliner legendaris di sekitar pasar tradisional Onan Balige beratap gorga Batak untuk mencicipi Dekke Naniura, Arsik Ikan Mas, dan sambal andaliman segar.",
    fullStory:
      "Di pasar bersejarah Onan Balige yang dibangun sejak era kolonial dengan deretan atap pelana Batak, rempah andaliman hutan liar, kecombrang (rias), asam jungga, dan ikan mas hidup diperdagangkan setiap hari pasar. Berbagai rumah makan keluarga di sekitarnya menyajikan Naniura dengan resep turun-temurun.",
    culturalSignificance:
      "Urat nadi tradisi niaga pangan dan kearifan gastronomi ikan air tawar Danau Toba.",
    highlights: [
      "Arsitektur pasar Onan Balige berhias Gorga",
      "Warung makan Naniura legendaris khas Balige",
      "Kios penjualan andaliman dan rempah hutan segar",
    ],
    activities: [
      "Mencicipi Dekke Naniura matang dingin asam jungga",
      "Membeli rempah andaliman segar langsung dari petani",
      "Menyantap mie gomak kuah andaliman di tepi pantai Lumban Silintong",
    ],
    visitingHours: "Setiap hari, 07.00 - 21.00 WIB (Puncak hari pasar: Jumat)",
    entryFee: "Gratis (Biaya kuliner mandiri)",
    howToGetThere: "Tepat di jantung Kota Balige.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
  },
  {
    id: "kebun-andaliman",
    name: "Kebun Rempah Andaliman Sopo Jabu",
    category: "Local Culinary",
    area: "Pangururan, Samosir",
    subRegion: "Samosir",
    coordinates: "2.6050° N, 98.6950° E",
    lat: 2.6050,
    lng: 98.6950,
    mapX: 30,
    mapY: 48,
    tagline: "Ekowisata Edukasi Merica Batak di Lereng Vulkanik",
    description:
      "Perkebunan edukasi budidaya tanaman andaliman liar di lereng perbukitan Samosir, mengenalkan khasiat botani dan sensasi kebas jeruk di lidah.",
    fullStory:
      "Andaliman adalah tanaman semak berduri endemik yang membutuhkan suhu sejuk dan kelembapan kaldera vulkanik. Di kebun edukasi ini pengunjung diajak memetik buah andaliman langsung dari tangkainya dan belajar mengolahnya menjadi pasta sambal tuk-tuk tradisional.",
    culturalSignificance:
      "Pusaka botani yang menjadi identitas lidah masyarakat Batak selama ribuan tahun.",
    highlights: [
      "Melihat langsung pohon semak andaliman berduri",
      "Workshop meracik sambal andaliman cobek batu",
      "Mencicipi teh seduh andaliman aromatik",
    ],
    activities: [
      "Petik sendiri buah andaliman segar",
      "Praktek menumbuk sambal tuk-tuk bersama koki lokal",
      "Bawa pulang produk olahan rempah andaliman kemasan",
    ],
    visitingHours: "Senin – Sabtu, 09.00 - 17.00 WIB",
    entryFee: "Rp 15.000 / orang (Termasuk welcome drink)",
    howToGetThere: "15 menit dari Pangururan ke arah perbukitan Pusuk Buhit.",
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1000&q=80",
    isHiddenGem: true,
  },
];

// Cultural Routes (Themed Journeys across Toba)
export interface TobaCulturalRoute {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  distance: string;
  description: string;
  stops: {
    name: string;
    area: string;
    highlight: string;
  }[];
  imageUrl: string;
}

export const TOBA_CULTURAL_ROUTES: TobaCulturalRoute[] = [
  {
    id: "route-batak-heritage",
    title: "Batak Heritage Journey",
    subtitle: "Menjelajahi Desa Adat Berbenteng & Situs Megalitikum",
    category: "Heritage & History",
    duration: "1–2 Hari",
    distance: "± 45 km (Pulau Samosir)",
    description:
      "Rute napak tilas peninggalan raja-raja Batak kuno, mulai dari sarkofagus megalitikum di Tomok, batu kursi pengadilan adat di Ambarita, hingga museum pertahanan di Simanindo.",
    stops: [
      {
        name: "Makam Raja Sidabutar & Sigale-gale",
        area: "Tomok",
        highlight: "Sarkofagus batu 450 tahun & tarian boneka sakral",
      },
      {
        name: "Huta Siallagan",
        area: "Ambarita",
        highlight: "Batu persidangan & rumah bolon berpagar cadas",
      },
      {
        name: "Museum Huta Bolon",
        area: "Simanindo",
        highlight: "Pentas tari Tortor Somba & koleksi pusaka perang",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "route-traditional-art",
    title: "Traditional Art & Weaving Journey",
    subtitle: "Menelusuri Benang Sakral Ulos & Pahat Kayu Gorga",
    category: "Arts & Crafts",
    duration: "2 Hari",
    distance: "± 65 km (Samosir — Balige)",
    description:
      "Perjalanan mendalam mengamati keahlian jemari para inang penenun gedogan di tepi danau serta keahlian maestro pemahat ukir Gorga Batak.",
    stops: [
      {
        name: "Kampung Ulos Huta Raja",
        area: "Lumban Suhi-suhi, Samosir",
        highlight: "Tenun gedogan manual & pewarna alami salaon",
      },
      {
        name: "Desa Wisata Meat",
        area: "Tampahan, Toba",
        highlight: "Lembah persawahan hijau sentra tenun Ragi Hotang",
      },
      {
        name: "Museum Batak TB Silalahi",
        area: "Balige",
        highlight: "Galeri tekstil 6 puak Batak & seni ukir kayu kuno",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "route-local-taste",
    title: "Local Taste & Gastronomy Journey",
    subtitle: "Eksplorasi Rempah Andaliman & Kuliner Santapan Raja",
    category: "Culinary Heritage",
    duration: "1 Hari",
    distance: "± 35 km (Balige & Samosir)",
    description:
      "Petualangan rasa mencicipi 'sashimi' Batak Dekke Naniura yang dimatangkan asam jungga, pedas mendesis andaliman, serta keharuman ikan mas arsik beralas serai.",
    stops: [
      {
        name: "Pasar Tradisional Onan Balige",
        area: "Balige",
        highlight: "Belanja andaliman segar, lokio, dan asam cikala",
      },
      {
        name: "Rumah Makan Naniura Nauli",
        area: "Balige",
        highlight: "Menyantap dekke naniura tanpa api resep raja",
      },
      {
        name: "Kebun Rempah Andaliman Sopo Jabu",
        area: "Pangururan, Samosir",
        highlight: "Petik langsung merica batak liar di lereng bukit",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "route-caldera-nature",
    title: "Caldera Landscape & Spiritual Journey",
    subtitle: "Ziarah Napak Tilas Pusuk Buhit & Lembah Bakkara",
    category: "Nature & Heritage",
    duration: "2 Hari",
    distance: "± 85 km (Samosir — Humbahas — Taput)",
    description:
      "Perjalanan menyatukan keagungan kaldera vulkanik Toba dengan situs spiritual asal mula orang Batak dan benteng pertahanan dinasti Sisingamangaraja.",
    stops: [
      {
        name: "Gunung Sakral Pusuk Buhit",
        area: "Samosir",
        highlight: "Cikal bakal asal mula peradaban suku Batak",
      },
      {
        name: "Lembah Bakkara & Aek Sipangolu",
        area: "Humbang Hasundutan",
        highlight: "Istana Raja Sisingamangaraja & mata air penawar",
      },
      {
        name: "Huta Ginjang Viewpoint",
        area: "Tapanuli Utara",
        highlight: "Menatap keajaiban kaldera Danau Toba dari 1.555 mdpl",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
];

