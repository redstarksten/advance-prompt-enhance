# Aplikasi Prompt Generator &amp; Enhancer Lanjutan

Selamat datang di Aplikasi Prompt Generator & Enhancer Lanjutan\! Alat bantu berbasis web yang dirancang untuk membantu Anda membuat dan menyempurnakan prompt teks berkualitas tinggi untuk berbagai kebutuhan kreatif berbasis AI, termasuk pembuatan gambar, video, skenario, dan narasi.

Aplikasi ini memanfaatkan kekuatan model AI Gemini dari Google untuk meningkatkan ide dasar Anda menjadi prompt yang detail, terstruktur, dan lebih efektif dalam memandu model AI lainnya.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repositori-blue?style=for-the-badge&logo=github)](https://github.com/redstarksten/advance-prompt-enhance)

## Fitur Utama

  * **Empat Mode Prompt Khusus:**
    1.  **Gambar:** Hasilkan teks prompt deskriptif untuk model AI generator gambar. Termasuk opsi untuk detail karakter konsisten, pakaian, waktu, lokasi, suasana, gaya seni, pengaruh seniman (opsional), pencahayaan, skema warna, dan komposisi.
    2.  **Teks ke Video:** Buat prompt teks yang komprehensif untuk model AI generator video. Termasuk input untuk deskripsi adegan, aksi utama, gaya visual, pergerakan kamera, musik/suara latar, dialog (dengan penanganan khusus agar tidak diterjemahkan), dan durasi.
    3.  **Adegan Video:** Susun prompt detail untuk skenario adegan video, lengkap dengan tipe lokasi (INT./EXT., MONTAGE, dll.), nama lokasi, waktu, deskripsi adegan, karakter, aksi kunci, saran kamera, dan suara.
    4.  **Narasi:** Kembangkan ide untuk skrip narasi dengan menentukan topik, nada suara, target audiens, poin-poin kunci, serta ide kalimat pembuka (hook) dan penutup.
  * **Peningkatan Prompt dengan AI (Gemini):**
      * Ide dasar dan input terstruktur Anda akan dikirim ke model AI Gemini yang berperan sebagai "Advanced Prompt Engineer" atau "Creative Visual Storyteller".
      * AI akan mengembangkan, mengelaborasi, dan menyusun ulang input Anda menjadi prompt teks yang lebih kaya, detail, imajinatif, dan mengikuti kaidah penulisan prompt yang efektif untuk model AI tujuan.
  * **Output Multi-Bahasa:**
      * Prompt yang telah ditingkatkan akan tersedia dalam **Bahasa Indonesia**.
      * Tersedia juga terjemahan otomatis ke dalam **Bahasa Inggris** (kecuali untuk bagian dialog pada mode Teks ke Video yang akan dipertahankan dalam bahasa aslinya).
  * **Karakter Konsisten (Mode Gambar):**
      * Definisikan fitur utama karakter (nama, visual, pakaian dominan, kepribadian/pose).
      * AI akan diprioritaskan untuk menghasilkan gambar dengan karakter yang konsisten berdasarkan definisi Anda.
      * **Manajemen Profil Karakter:** Simpan, muat, dan kelola profil karakter Anda menggunakan penyimpanan lokal (`localStorage`) browser untuk penggunaan berkelanjutan.
  * **Kustomisasi Input:**
      * Banyak field menggunakan dropdown dengan opsi umum, namun selalu ada pilihan **"Isi Sendiri..."** yang memungkinkan Anda memasukkan nilai kustom jika opsi yang tersedia tidak mencukupi.
  * **Pengaturan API Key Pengguna:**
      * Pengguna dapat memasukkan dan menyimpan API Key Gemini mereka sendiri di `localStorage` untuk digunakan oleh aplikasi.
      * Terdapat tombol untuk mendapatkan API Key dari Google AI Studio dan mengelola API Key yang tersimpan.
  * **Antarmuka Pengguna Responsif:** Didesain agar nyaman digunakan di berbagai ukuran layar.
  * **Tombol Salin:** Mudah menyalin prompt yang dihasilkan (per bahasa).
  * **Tombol Unduh Gambar (Mode Gambar):** Setelah gambar dihasilkan oleh AI, Anda dapat mengunduhnya langsung.

## Cara Penggunaan

1.  **Pengaturan API Key (Penting\!):**
      * Buka bagian "Pengaturan API Key Gemini Anda" di bagian atas aplikasi.
      * Klik tombol "Dapatkan API Key" yang akan mengarahkan Anda ke Google AI Studio untuk membuat atau mendapatkan API key Anda.
      * Salin API key Anda dari Google AI Studio.
      * Tempelkan API key tersebut ke kolom "Masukkan API Key Anda:" di aplikasi.
      * Klik "Simpan API Key". API key Anda akan disimpan di `localStorage` browser untuk penggunaan selanjutnya. Jika sudah tersimpan, bagian ini akan menampilkan status dan opsi untuk mengganti/menghapus key.
2.  **Pilih Mode Prompt:** Klik salah satu dari empat ikon mode yang tersedia (Gambar, Teks ke Video, Adegan Video, atau Narasi).
3.  **Masukkan Ide Dasar (Opsional):** Ketikkan ide umum atau kata kunci utama Anda di area yang disediakan. Ini dapat membantu AI dalam proses peningkatan.
4.  **Lengkapi Struktur Input Dinamis:**
      * Setelah memilih mode, formulir input yang detail dan terstruktur akan muncul.
      * Isi setiap field sesuai dengan detail yang Anda inginkan.
      * Untuk dropdown, pilih opsi yang paling sesuai atau pilih "Isi Sendiri..." dan ketikkan nilai kustom Anda.
      * **Khusus Mode Gambar (Karakter Konsisten):**
          * Isi detail karakter di bagian "Definisi Karakter Konsisten".
          * Anda dapat memberi nama profil dan menyimpannya menggunakan tombol "Simpan Profil".
          * Gunakan dropdown "Pilih Profil Tersimpan" dan tombol "Muat Profil" untuk menggunakan kembali karakter yang sudah Anda definisikan.
5.  **Hasilkan & Tingkatkan Teks Prompt:** Klik tombol "✨ Hasilkan & Tingkatkan Teks Prompt". Aplikasi akan mengirimkan input Anda ke AI Gemini untuk disempurnakan.
6.  **Lihat Hasil Teks Prompt:**
      * Prompt yang telah ditingkatkan akan muncul di dua area teks: satu dalam Bahasa Indonesia dan satu lagi dalam Bahasa Inggris (dialog pada mode Teks ke Video akan tetap dalam Bahasa Indonesia).
      * Gunakan tombol "Salin ID" atau "Salin EN" untuk menyalin prompt yang Anda inginkan.
7.  **(Khusus Mode Gambar) Generate Gambar:**
      * Setelah teks prompt Bahasa Indonesia dihasilkan dan ditingkatkan, tombol "🖼️ Generate Gambar dengan AI" akan aktif.
      * Klik tombol tersebut. Aplikasi akan menggunakan teks prompt Bahasa Indonesia untuk meminta pembuatan gambar ke model Imagen.
      * Gambar yang dihasilkan akan muncul di bawah area teks prompt.
      * Tombol "💾 Unduh Gambar" akan muncul di bawah gambar untuk menyimpannya.

## Teknologi yang Digunakan

  * HTML5
  * Tailwind CSS (via CDN)
  * JavaScript (Vanilla JS)
  * Google Gemini API (untuk peningkatan teks prompt dan terjemahan)
  * Google Imagen API (untuk generasi gambar)
  * `localStorage` (untuk penyimpanan API key pengguna dan profil karakter)

## Kontribusi

Saran dan kontribusi untuk pengembangan aplikasi ini sangat diterima. Silakan buat *issue* atau *pull request* di repositori GitHub.

-----

Dibuat oleh: **madeci**
Kunjungi saya di: [![Facebook](https://img.shields.io/badge/Facebook-madeciahmad-blue?style=social&logo=facebook)](https://www.facebook.com/madeciahmad)
