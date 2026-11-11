# ADLI PHIMORRIS R.S — Website Profil Siswa SMK Telkom Malang & Portofolio TKJ

Website profil pribadi dan portofolio Teknik Komputer Jaringan (TKJ) siswa SMK Telkom Malang bertema terang (*light theme*) dengan gaya bahasa semi-formal, dirancang responsif dan telah dioptimasi penuh agar siap di-*deploy* langsung ke **Vercel**.

---

## 📁 Struktur Berkas

```text
company-profile-web/
├── index.html            # Halaman Utama (Pengenalan Diri & Keahlian)
├── profile.html          # Halaman Profil & Portofolio Lengkap TKJ
├── contact.html          # Halaman Kontak (Formulir Pesan & Informasi Jam Aktif)
├── vercel.json           # Konfigurasi routing & header keamanan Vercel
├── README.md             # Panduan pengoperasian & deployment
├── PROMPTS.md            # Riwayat prompt pengembangan website
└── assets/
    ├── css/
    │   └── style.css     # Gaya khusus tema light (biru-kuning) & animasi halus
    └── js/
        └── main.js       # Navigasi, pengunggah foto, formulir kontak & portofolio
```

---

## 🚀 Cara Upload / Deploy ke Vercel

Ada dua cara mudah untuk mengunggah website ini ke Vercel:

### Opsi 1: Menggunakan Vercel CLI (Sangat Cepat & Tanpa Git)

1. Buka PowerShell atau Terminal di direktori proyek ini:
   ```powershell
   cd C:\Users\WINDOWS\company-profile-web
   ```
2. Jalankan perintah Vercel:
   ```bash
   npx vercel
   ```
3. Ikuti panduan di layar:
   - Login ke akun Vercel Anda (jika belum).
   - Tekan `Enter` untuk konfirmasi direktori saat ini.
   - Pilih *Link to existing project?* -> Ketik `N`.
   - Masukkan nama proyek (misalnya `oalx-portfolio`).
   - Tekan `Enter` untuk pengaturan *default*.
4. Website Anda akan langsung aktif dengan URL Vercel resmi (contoh: `https://oalx-portfolio.vercel.app`).

---

### Opsi 2: Menggunakan GitHub + Vercel Dashboard

1. Buat repositori baru di GitHub (misal: `oalx-web`).
2. Masukkan dan push berkas proyek ini ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "Inisialisasi website profil oalx"
   git branch -M main
   git remote add origin https://github.com/USERNAME/oalx-web.git
   git push -u origin main
   ```
3. Buka [vercel.com](https://vercel.com) dan login.
4. Klik **"Add New..."** &rarr; **"Project"**.
5. Pilih repositori GitHub Anda, lalu klik **"Deploy"**.
6. Vercel secara otomatis membaca file HTML statis dan `vercel.json` tanpa perlu konfigurasi build tambahan.

---

## 🔍 Kepatuhan Kebutuhan

- ✅ **1. Halaman Utama**: Beranda interaktif dengan visual hero, slot tempat foto sendiri, dan showcase keahlian.
- ✅ **2. Halaman Profil**: Menampilkan pengenalan diri, nilai, foto profil personal, dan proyek portofolio Teknik Komputer Jaringan (TKJ).
- ✅ **3. Halaman Kontak**: Formulir kontak interaktif dengan validasi langsung, FAQ kolaborasi, dan jadwal aktif.
- ✅ **4. Konsep Warna**: Light theme bernuansa kombinasi warna biru dan kuning yang segar, bersih, dan elegan.
- ✅ **5. Gaya Bahasa**: Menggunakan bahasa Indonesia semi-formal yang profesional, sopan, dan bersahabat.
- ✅ **6. Image & Tempat Foto Sendiri**: Tersedia frame khusus dengan tombol unggah foto langsung dari browser (tersimpan via localStorage) atau manual di folder proyek.
- ✅ **7. Kepatuhan Privasi**: **Sama sekali tidak memuat nomor HP, alamat fisik/domisili, maupun alamat email**.
- ✅ **8. Vercel Ready**: Berkas `vercel.json` sudah dikonfigurasi dengan fitur *clean URLs*, header keamanan HTTP, dan struktur berkas web statis siap saji.
