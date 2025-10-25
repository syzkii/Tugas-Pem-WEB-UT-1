// Data Dummy

var dataBahanAjar = [
  { kodeLokasi: "0TMP01", kodeBarang: "ASIP4301", namaBarang: "Pengantar Ilmu Komunikasi", jenisBarang: "BMP", edisi: "2", stok: 548, cover: "assets/pengantar_komunikasi.jpg" },
  { kodeLokasi: "0JKT01", kodeBarang: "EKMA4216", namaBarang: "Manajemen Keuangan", jenisBarang: "BMP", edisi: "3", stok: 392, cover: "assets/manajemen_keuangan.jpg" },
  { kodeLokasi: "0SBY02", kodeBarang: "EKMA4310", namaBarang: "Kepemimpinan", jenisBarang: "BMP", edisi: "1", stok: 278, cover: "assets/kepemimpinan.jpg" },
  { kodeLokasi: "0MLG01", kodeBarang: "BIOL4211", namaBarang: "Mikrobiologi Dasar", jenisBarang: "BMP", edisi: "2", stok: 165, cover: "assets/mikrobiologi.jpg" },
  { kodeLokasi: "0UPBJJBDG", kodeBarang: "PAUD4401", namaBarang: "Perkembangan Anak Usia Dini", jenisBarang: "BMP", edisi: "4", stok: 204, cover: "assets/paud_perkembangan.jpeg" }
];

// Greeting otomatis
function setGreeting() {
  const greeting = document.getElementById("greeting");
  const hour = new Date().getHours();
  let message = "Selamat datang!";
  if (hour >= 5 && hour < 12) message = "Selamat pagi!";
  else if (hour >= 12 && hour < 17) message = "Selamat siang!";
  else message = "Selamat sore!";
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

// Render data bahan ajar
function renderBahanAjar() {
  const container = document.getElementById("bahanAjarContainer");
  container.innerHTML = "";
  dataBahanAjar.forEach((bahan) => {
    const card = `
      <div class="col-md-4 col-lg-3">
        <div class="card h-100 shadow-sm">
          <img src="${bahan.cover}" class="card-img-top" alt="${bahan.namaBarang}" />
          <div class="card-body">
            <h6 class="fw-bold">${bahan.namaBarang}</h6>
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
