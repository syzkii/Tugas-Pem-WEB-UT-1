// Data Dummy informasi bahan ajar
var dataBahanAjar = [
  {
    kodeLokasi: "0TMP01",
    kodeBarang: "ASIP4301",
    namaBarang: "Pengantar Ilmu Komunikasi",
    jenisBarang: "BMP",
    edisi: "2",
    stok: 548,
    cover: "assets/pengantar_komunikasi.jpg",
  },
  {
    kodeLokasi: "0JKT01",
    kodeBarang: "EKMA4216",
    namaBarang: "Manajemen Keuangan",
    jenisBarang: "BMP",
    edisi: "3",
    stok: 392,
    cover: "assets/manajemen_keuangan.jpg",
  },
  {
    kodeLokasi: "0SBY02",
    kodeBarang: "EKMA4310",
    namaBarang: "Kepemimpinan",
    jenisBarang: "BMP",
    edisi: "1",
    stok: 278,
    cover: "assets/kepemimpinan.jpg",
  },
  {
    kodeLokasi: "0MLG01",
    kodeBarang: "BIOL4211",
    namaBarang: "Mikrobiologi Dasar",
    jenisBarang: "BMP",
    edisi: "2",
    stok: 165,
    cover: "assets/mikrobiologi.jpg",
  },
  {
    kodeLokasi: "0UPBJJBDG",
    kodeBarang: "PAUD4401",
    namaBarang: "Perkembangan Anak Usia Dini",
    jenisBarang: "BMP",
    edisi: "4",
    stok: 204,
    cover: "assets/paud_perkembangan.jpeg",
  },
];

// ==========================
// Data Dummy Tracking
// ==========================
var dataTracking = {
  "2023001234": {
    nomorDO: "2023001234",
    nama: "Rina Wulandari",
    status: "Dalam Perjalanan",
    ekspedisi: "JNE",
    tanggalKirim: "2025-08-25",
    paket: "0JKT01",
    total: "Rp 180.000",
    perjalanan: [
      {
        waktu: "2025-08-25 10:12:20",
        keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka",
      },
      {
        waktu: "2025-08-25 14:07:56",
        keterangan: "Tiba di Hub: TANGERANG SELATAN",
      },
      {
        waktu: "2025-08-25 10:12:20",
        keterangan: "Diteruskan ke Kantor Jakarta Selatan",
      },
    ],
  },
  "2023005678": {
    nomorDO: "2023005678",
    nama: "Agus Pranoto",
    status: "Dikirim",
    ekspedisi: "Pos Indonesia",
    tanggalKirim: "2025-08-25",
    paket: "0UPBJJBDG",
    total: "Rp 220.000",
    perjalanan: [
      {
        waktu: "2025-08-25 10:12:20",
        keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka",
      },
      {
        waktu: "2025-08-25 14:07:56",
        keterangan: "Tiba di Hub: TANGERANG SELATAN",
      },
      {
        waktu: "2025-08-25 16:30:10",
        keterangan: "Diteruskan ke Kantor Kota Bandung",
      },
      {
        waktu: "2025-08-26 12:15:33",
        keterangan: "Tiba di Hub: Kota BANDUNG",
      },
      {
        waktu: "2025-08-26 15:06:12",
        keterangan: "Proses antar ke Cimahi",
      },
      {
        waktu: "2025-08-26 20:00:00",
        keterangan: "Selesai Antar. Penerima: Agus Pranoto",
      },
    ],
  },
};

// Fitur Tracking Pengiriman
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const trackingForm = document.getElementById("trackingForm");
  const trackingResult = document.getElementById("trackingResult");

  trackingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nomorDO = document.getElementById("namaMahasiswa").value.trim();
    const data = dataTracking[nomorDO];

    trackingResult.innerHTML = "";

    if (!data) {
      trackingResult.innerHTML = `
        <div class="alert alert-danger">
          Nomor DO <strong>${nomorDO}</strong> tidak ditemukan.
        </div>`;
      return;
    }

    // Hitung progress berdasarkan jumlah perjalanan
    const totalTahap = data.perjalanan.length;
    let progressPersen = Math.min(
      Math.round((totalTahap / 6) * 100),
      100
    ); // 6 tahap = 100%
    let warnaBar = "bg-warning";
    if (progressPersen >= 100) warnaBar = "bg-success";
    else if (progressPersen >= 60) warnaBar = "bg-info";

    // Buat list perjalanan
    const perjalananHTML = data.perjalanan
      .map(
        (item) => `
        <li class="list-group-item">
          <strong>${item.waktu}</strong><br>
          ${item.keterangan}
        </li>`
      )
      .join("");

    // Render hasil tracking
    trackingResult.innerHTML = `
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <h6 class="fw-bold mb-2">${data.nama}</h6>
          <p class="mb-1"><strong>Nomor DO:</strong> ${data.nomorDO}</p>
          <p class="mb-1"><strong>Status:</strong> <span class="badge bg-success">${data.status}</span></p>
          <p class="mb-1"><strong>Ekspedisi:</strong> ${data.ekspedisi}</p>
          <p class="mb-1"><strong>Tanggal Kirim:</strong> ${data.tanggalKirim}</p>
          <p class="mb-1"><strong>Jenis Paket:</strong> ${data.paket}</p>
          <p class="mb-3"><strong>Total Pembayaran:</strong> ${data.total}</p>

          <h6 class="fw-bold mt-4">Progress Pengiriman:</h6>
          <div class="progress mb-3" style="height: 25px;">
            <div 
              class="progress-bar progress-bar-striped progress-bar-animated ${warnaBar}" 
              role="progressbar" 
              style="width: ${progressPersen}%;">
              ${progressPersen}%
            </div>
          </div>

          <h6 class="fw-bold mt-3">Riwayat Perjalanan:</h6>
          <ul class="list-group list-group-flush">
            ${perjalananHTML}
          </ul>
        </div>
      </div>
    `;
  });
});

// Greeting otomatis
function setGreeting() {
  const greeting = document.getElementById("greeting");
  const hour = new Date().getHours();
  let message = "Selamat datang!";

  if (hour >= 0 && hour < 11) {
    message = "Selamat pagi!";
  } else if (hour >= 11 && hour < 15) {
    message = "Selamat siang!";
  } else if (hour >= 15 && hour < 19) {
    message = "Selamat sore!";
  } else {
    message = "Selamat malam!";
  }

  greeting.textContent = message;
}

setGreeting();

// Sidebar toggle
document.getElementById("toggleSidebar").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("d-none");
});
document.getElementById("closeSidebar").addEventListener("click", () => {
  document.getElementById("sidebar").classList.add("d-none");
});

// 🔹 Navigasi antar menu
const infoSection = document.getElementById("informasi-section");
const trackSection = document.getElementById("tracking-section");
const infoMenu = document.getElementById("menu-informasi");
const trackMenu = document.getElementById("menu-tracking");

// Default semua sembunyi
infoSection.classList.add("d-none");
trackSection.classList.add("d-none");

// Klik menu Informasi
infoMenu.addEventListener("click", (e) => {
  e.preventDefault();
  infoSection.classList.remove("d-none");
  trackSection.classList.add("d-none");
  renderBahanAjar();
});

// Klik menu Tracking
trackMenu.addEventListener("click", (e) => {
  e.preventDefault();
  trackSection.classList.remove("d-none");
  infoSection.classList.add("d-none");
});

// Render data bahan ajar (gambar full di dalam card)
function renderBahanAjar() {
  const container = document.getElementById("bahanAjarContainer");
  container.innerHTML = "";

  dataBahanAjar.forEach((bahan) => {
    const card = `
      <div class="col-md-4 col-lg-3 mb-3">
        <div class="card h-100 shadow-sm border-0 overflow-hidden" style="cursor: pointer;">
          <div class="position-relative" style="height: 400px;">
            <img src="${bahan.cover}" 
                 alt="${bahan.namaBarang}" 
                 class="w-100 h-100" 
                 style="object-fit: cover;">
            <div class="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-50 text-white p-2">
              <h6 class="fw-bold mb-0">${bahan.namaBarang}</h6>
            </div>
          </div>
          <div class="card-body">
            <p class="mb-1">Kode: ${bahan.kodeBarang}</p>
            <p class="mb-1">Lokasi: ${bahan.kodeLokasi}</p>
            <p class="mb-1">Edisi: ${bahan.edisi}</p>
            <p class="mb-0 fw-semibold text-success">Stok: ${bahan.stok}</p>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

// === Sidebar Menu Aktif ===
document.addEventListener("DOMContentLoaded", () => {
  const menuInformasi = document.getElementById("menu-informasi");
  const menuTracking = document.getElementById("menu-tracking");

  const infoSection = document.getElementById("informasi-section");
  const trackingSection = document.getElementById("tracking-section");

  // Fungsi untuk menampilkan hanya section yang dipilih
  function showSection(section) {
    document.querySelectorAll("main > div.card").forEach((div) => {
      div.classList.add("d-none");
    });
    section.classList.remove("d-none");
  }

  // Reset active di dua menu utama
  function resetActive() {
    menuInformasi.classList.remove("active");
    menuTracking.classList.remove("active");
  }

  // Klik menu Informasi
  menuInformasi.addEventListener("click", (e) => {
    e.preventDefault();
    resetActive();
    menuInformasi.classList.add("active");
    showSection(infoSection);
  });

  // Klik menu Tracking
  menuTracking.addEventListener("click", (e) => {
    e.preventDefault();
    resetActive();
    menuTracking.classList.add("active");
    showSection(trackingSection);
  });
});
