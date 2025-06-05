
const apiType = document.getElementById("apiType")?.value || "gemini";

async function callAI(systemPrompt, userPrompt, apiKey) {
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt }
  ];

  if (apiType === "openai") {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages,
        temperature: 0.8
      })
    });
    const result = await response.json();
    return result.choices?.[0]?.message?.content?.trim();
  } else {
    const response = await fetch("https://generativelabsproxy.deno.dev/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: systemPrompt + "\n\n" + userPrompt, apiKey })
    });
    const result = await response.json();
    return result.text?.trim();
  }
}


const modeRadios = document.querySelectorAll('input[name="mode"]');
        const userInput = document.getElementById('user-input');
        const dynamicPromptStructureContainer = document.getElementById('dynamic-prompt-structure');
        const dynamicStructureTitle = document.getElementById('dynamic-structure-title');
        const characterProfileSection = document.getElementById('character-profile-section');
        const generateEnhanceBtn = document.getElementById('generate-enhance-btn');
        const generateButtonsContainer = document.getElementById('generate-buttons-container');
        
        const outputPromptId = document.getElementById('output-prompt-id');
        const outputPromptEn = document.getElementById('output-prompt-en');
        const copyBtnId = document.getElementById('copy-btn-id');
        const copyBtnEn = document.getElementById('copy-btn-en');

        const imageOutputSection = document.getElementById('image-output-section');
        const generatedImageContainer = document.getElementById('generated-image-container');
        
        const toastNotification = document.getElementById('toast-notification');
        const CUSTOM_OPTION_VALUE = "Isi Sendiri...";
        const CHARACTER_PROFILES_KEY = 'characterPromptProfiles';
        const USER_API_KEY_LS_KEY = 'userGeminiApiKey'; 

        const userApiKeyInput = document.getElementById('user-api-key');
        const saveApiKeyBtn = document.getElementById('save-api-key-btn');
        const clearApiKeyBtn = document.getElementById('clear-api-key-btn');
        const changeApiKeyBtn = document.getElementById('change-api-key-btn'); 
        const apiKeyStatusMessage = document.getElementById('api-key-status-message');
        const apiKeyInputContainer = document.getElementById('api-key-input-container');
        const apiKeyDisplayContainer = document.getElementById('api-key-display-container');
        const apiKeyStatusDisplay = document.getElementById('api-key-status-display');


        // --- Opsi untuk Dropdown ---
        const imageOptions = {
            styles: ["Lukisan Digital", "Fotorealistik", "Seni Konsep", "Gaya Anime", "Surealis", "Abstrak", "Kartun", "Pixel Art", "Gaya Komik", "Fotografi Hitam Putih", "Lukisan Cat Air", "Gaya Steampunk", "Fantasi Gelap", CUSTOM_OPTION_VALUE],
            lightings: ["Pencahayaan Sinematik", "Cahaya Lembut Alami", "Dramatis (Bayangan Kuat)", "Neon Glow", "Golden Hour", "Studio Lighting", "Rembrandt Lighting", "Cahaya Bulan", "Lampu Jalanan", "Cahaya Volumetrik", "Rim Lighting", CUSTOM_OPTION_VALUE],
            compositions: ["Close-up Detail", "Medium Shot Dinamis", "Wide Shot Epik", "Pandangan Mata Burung", "Sudut Rendah Heroik", "Eye-Level Natural", "Dutch Angle Dramatis", "Portrait Artistik", "Landscape Luas", "Aturan Sepertiga", CUSTOM_OPTION_VALUE],
            colors: ["Palet Warna Hangat Menyala", "Palet Warna Dingin Menenangkan", "Monokromatik Artistik", "Warna Pastel Lembut", "Warna Cerah & Jenuh", "Sepia Nostalgia", "Hitam Putih dengan Aksen Warna", "Gradasi Warna Halus", "Warna Komplementer Berani", CUSTOM_OPTION_VALUE],
            outfits: ["Kasual Modern", "Formal (Jas/Gaun)", "Pakaian Tradisional [Sebutkan Budaya]", "Kostum Fantasi", "Pakaian Olahraga", "Seragam Sekolah/Kerja", "Gaya Vintage [Sebutkan Era]", "Futuristik", "Pakaian Petualang", "Jubah Misterius", CUSTOM_OPTION_VALUE],
            timesOfDayImg: ["Pagi Cerah Bersinar", "Siang Terik Menyengat", "Sore Emas (Golden Hour)", "Senja Magis (Twilight)", "Malam Berbintang Gemerlap", "Malam Berkabut Misterius", "Subuh Tenang", "Badai Petir Menggelegar", CUSTOM_OPTION_VALUE],
            locations: ["Hutan Ajaib Berkabut", "Kota Metropolitan Malam Hari Penuh Neon", "Pantai Tropis Pasir Putih", "Pegunungan Bersalju Megah", "Ruang Angkasa Luas Tak Terbatas", "Interior Kafe Nyaman dengan Cahaya Hangat", "Perpustakaan Kuno Penuh Buku", "Padang Pasir Luas Mencekam", "Dasar Laut Penuh Kehidupan", "Kastil Tua Reruntuhan", "Desa Pedesaan Damai", CUSTOM_OPTION_VALUE],
            atmospheres: ["Misterius & Gelap Mencekam", "Ceria & Berwarna-warni Membahagiakan", "Tenang & Damai Menenangkan", "Megah & Epik Menggugah Jiwa", "Nostalgia & Melankolis Mengharukan", "Romantis & Lembut Penuh Kasih", "Menegangkan & Mencekam Penuh Adrenalin", "Aneh & Surealis Membingungkan", "Futuristik & Canggih", "Kuno & Sakral", CUSTOM_OPTION_VALUE]
        };
        const veoOptions = { 
            visualStyles: ["Estetika Cyberpunk Futuristik", "Visual Fantasi Gelap & Misterius", "Kartun Warna-warni Cerah", "Gaya Retro Futuristik", "Realistis Sinematik Kelas Atas", "Gaya Dokumenter Alam", "Animasi 2D Stop Motion", "Animasi 3D Fotorealistik", "Gaya Vintage Film Klasik", "Visual Surealis Mimpi", CUSTOM_OPTION_VALUE],
            cameraMoves: ["Pergerakan Kamera Dinamis & Cepat", "Slow Zoom Penuh Makna", "Tracking Shot Mengikuti Subjek", "Aerial View Spektakuler", "Handheld Camera Gaya Vlog", "Static Shot Artistik", "Panning Shot Cepat", "Whip Pan Transisi", "Orbit Shot Mengelilingi", CUSTOM_OPTION_VALUE],
            audioStyles: ["Soundtrack Orkestra Megah", "Musik Elektronik Ambient", "Efek Suara Realistis Detail", "Musik Lo-fi Santai", "Tanpa Musik (Suara Alam)", "Musik Jazz Klasik", "Sound Design Eksperimental", CUSTOM_OPTION_VALUE], 
            durations: ["Sangat Pendek (GIF ~3-5 dtk)", "Klip Pendek (Teaser ~5-10 dtk)", "Klip Sedang (Iklan ~10-15 dtk)", "Klip Agak Panjang (Intro ~15-30 dtk)", "Klip Panjang (Narasi ~30-60 dtk)", "Mini Story (1-2 menit)", CUSTOM_OPTION_VALUE]
        };
        const sceneOptions = {
            locationTypes: ["INT.", "EXT.", "I/E.", "MONTAGE", "SERIES OF SHOTS", "FLASHBACK", "DREAM SEQUENCE", "INTERCUT WITH", CUSTOM_OPTION_VALUE],
            timesOfDay: ["PAGI (MATAHARI TERBIT, EMBUN)", "SIANG (TERIK, BAYANGAN PENDEK)", "SORE (SENJA, GOLDEN HOUR)", "MALAM (BULAN PURNAMA, LAMPU KOTA)", "SUBUH (KABUT TIPIS, SEPI)", "TENGAH MALAM (GELAP PEKAT, BINTANG)", "FLASHBACK - [WAKTU]", CUSTOM_OPTION_VALUE],
            cameraShots: ["WIDE SHOT (WS) - Skala & Lingkungan", "MEDIUM SHOT (MS) - Interaksi Karakter", "CLOSE UP (CU) - Ekspresi Wajah", "EXTREME CLOSE UP (ECU) - Detail Penting", "POINT OF VIEW (POV) - Sudut Pandang Karakter", "OVER THE SHOULDER (OTS) - Dialog", "ESTABLISHING SHOT - Pengenalan Lokasi", "INSERT SHOT - Objek Spesifik", "CRANE SHOT - Pergerakan Vertikal", CUSTOM_OPTION_VALUE]
        };
        const narrationOptions = {
            tones: ["Informatif & Jelas", "Inspiratif & Memotivasi", "Humoris & Ringan", "Dramatis & Menggugah", "Tenang & Menenangkan (ASMR)", "Otoritatif & Meyakinkan (Dokumenter)", "Percakapan Santai (Podcast)", "Antusias & Bersemangat", "Sarkastik & Cerdas", CUSTOM_OPTION_VALUE],
            audiences: ["Masyarakat Umum (Sederhana)", "Pelajar (SD/SMP/SMA - Edukatif)", "Mahasiswa (Mendalam & Analitis)", "Anak-anak Usia Dini (Interaktif)", "Profesional Bidang Tertentu (Teknis)", "Penggemar Genre Tertentu", "Lansia (Tempo Lambat & Jelas)", "Skeptis (Butuh Bukti & Logika)", CUSTOM_OPTION_VALUE]
        };

        // --- Fungsi Helper ---
        function createLabel(forId, text) { /* ... */ return document.createElement('label');}
        function createTextInput(id, placeholder = "", className = "input-field") { /* ... */ return document.createElement('input');}
        function createTextarea(id, rows = 3, placeholder = "") { /* ... */ return document.createElement('textarea');}
        function createSelectWithOptions(id, optionsArray, includeCustomOption = true) { /* ... */ return document.createElement('select');}
        function createCustomSelectGroup(labelText, baseId, optionsArray) { /* ... */ return document.createElement('div');}
        function createFormGroup(labelText, element) { /* ... */ return document.createElement('div');}
        
        function createLabel(forId, text) {
            const label = document.createElement('label');
            label.htmlFor = forId;
            label.textContent = text;
            return label;
        }
        function createTextInput(id, placeholder = "", className = "input-field") {
            const input = document.createElement('input');
            input.type = 'text'; 
            if (id === 'user-api-key') input.type = 'password';
            input.id = id;
            input.name = id;
            input.placeholder = placeholder;
            input.className = className; 
            return input;
        }
        function createTextarea(id, rows = 3, placeholder = "") {
            const textarea = document.createElement('textarea');
            textarea.id = id;
            textarea.name = id;
            textarea.rows = rows;
            textarea.placeholder = placeholder;
            textarea.className = "input-field"; 
            return textarea;
        }
        function createSelectWithOptions(id, optionsArray, includeCustomOption = true) {
            const select = document.createElement('select');
            select.id = id;
            select.name = id;
            select.className = "input-field"; 
            optionsArray.forEach(optValue => {
                if (optValue === CUSTOM_OPTION_VALUE && !includeCustomOption) return;
                const option = document.createElement('option');
                option.value = optValue;
                option.textContent = optValue;
                select.appendChild(option);
            });
            return select;
        }
        function createCustomSelectGroup(labelText, baseId, optionsArray) {
            const group = document.createElement('div');
            group.className = 'input-group';
            const label = createLabel(baseId, labelText);
            group.appendChild(label);
            const container = document.createElement('div');
            container.className = 'custom-input-container';
            const select = createSelectWithOptions(baseId, optionsArray);
            const customInput = createTextInput(baseId + '_custom', 'Masukkan nilai kustom...', 'input-field custom-input-field');
            customInput.style.display = 'none'; 
            select.addEventListener('change', () => {
                customInput.style.display = (select.value === CUSTOM_OPTION_VALUE) ? 'block' : 'none';
                if (select.value === CUSTOM_OPTION_VALUE) customInput.focus();
            });
            container.appendChild(select);
            container.appendChild(customInput);
            group.appendChild(container);
            return group;
        }
        function createFormGroup(labelText, element) {
            const group = document.createElement('div');
            group.className = 'input-group';
            const label = createLabel(element.id, labelText);
            group.appendChild(label);
            group.appendChild(element);
            return group;
        }
        
        // --- Character Profile Management ---
        function getCharacterProfiles() {
            const profiles = localStorage.getItem(CHARACTER_PROFILES_KEY);
            return profiles ? JSON.parse(profiles) : [];
        }

        function saveCharacterProfile() {
            const profileName = document.getElementById('char_profile_name').value.trim();
            if (!profileName) {
                showToast("Nama profil tidak boleh kosong!", "error");
                return;
            }

            const currentProfile = {
                profileName: profileName,
                name: getVal('char_name'),
                visuals: getVal('char_visuals'),
                clothing: getVal('char_clothing'),
                personality: getVal('char_personality')
            };

            let profiles = getCharacterProfiles();
            const existingProfileIndex = profiles.findIndex(p => p.profileName === profileName);
            if (existingProfileIndex > -1) {
                profiles[existingProfileIndex] = currentProfile;
                showToast(`Profil "${profileName}" berhasil diperbarui!`, "success");
            } else {
                profiles.push(currentProfile);
                showToast(`Profil "${profileName}" berhasil disimpan!`, "success");
            }
            
            localStorage.setItem(CHARACTER_PROFILES_KEY, JSON.stringify(profiles));
            populateCharacterProfileDropdown();
            document.getElementById('char_profile_select').value = profileName;
        }

        function populateCharacterProfileDropdown() {
            const selectEl = document.getElementById('char_profile_select');
            if (!selectEl) return; 
            const currentSelectedValue = selectEl.value; 
            selectEl.innerHTML = '<option value="">-- Pilih Profil --</option>'; 
            const profiles = getCharacterProfiles();
            profiles.forEach(profile => {
                const option = document.createElement('option');
                option.value = profile.profileName;
                option.textContent = profile.profileName;
                selectEl.appendChild(option);
            });
            if (profiles.some(p => p.profileName === currentSelectedValue)) {
                selectEl.value = currentSelectedValue;
            }
        }

        function loadSelectedCharacterProfile() {
            const selectedProfileName = document.getElementById('char_profile_select').value;
            if (!selectedProfileName) {
                document.getElementById('char_profile_name').value = "";
                document.getElementById('char_name').value = "";
                document.getElementById('char_visuals').value = "";
                document.getElementById('char_clothing').value = "";
                document.getElementById('char_personality').value = "";
                showToast("Pilih profil untuk dimuat atau kosongkan field.", "info");
                return;
            }
            const profiles = getCharacterProfiles();
            const profileToLoad = profiles.find(p => p.profileName === selectedProfileName);
            if (profileToLoad) {
                document.getElementById('char_profile_name').value = profileToLoad.profileName;
                document.getElementById('char_name').value = profileToLoad.name || "";
                document.getElementById('char_visuals').value = profileToLoad.visuals || "";
                document.getElementById('char_clothing').value = profileToLoad.clothing || "";
                document.getElementById('char_personality').value = profileToLoad.personality || "";
                showToast(`Profil "${selectedProfileName}" berhasil dimuat!`, "success");
            } else {
                showToast(`Profil "${selectedProfileName}" tidak ditemukan.`, "error");
            }
        }

        function deleteSelectedCharacterProfile() {
            const selectedProfileName = document.getElementById('char_profile_select').value;
            if (!selectedProfileName) {
                showToast("Pilih profil yang ingin dihapus.", "info");
                return;
            }
            if (confirm(`Apakah Anda yakin ingin menghapus profil "${selectedProfileName}"?`)) {
                let profiles = getCharacterProfiles();
                profiles = profiles.filter(p => p.profileName !== selectedProfileName);
                localStorage.setItem(CHARACTER_PROFILES_KEY, JSON.stringify(profiles));
                populateCharacterProfileDropdown();
                loadSelectedCharacterProfile(); 
                showToast(`Profil "${selectedProfileName}" berhasil dihapus!`, "success");
            }
        }
        
        function deleteAllCharacterProfiles() {
            if (confirm("Apakah Anda yakin ingin menghapus SEMUA profil karakter? Tindakan ini tidak dapat diurungkan.")) {
                localStorage.removeItem(CHARACTER_PROFILES_KEY);
                populateCharacterProfileDropdown();
                loadSelectedCharacterProfile(); 
                showToast("Semua profil karakter berhasil dihapus!", "success");
            }
        }
        
        // Moved generateImageWithAI definition before prepareDynamicStructure
        async function generateImageWithAI() {
            const imageGenBtn = document.getElementById('generate-image-btn');
            if (!imageGenBtn) return;

            const textPromptForImage = outputPromptId.value;
            if (!textPromptForImage || textPromptForImage.includes("Sedang memproses") || textPromptForImage.includes("Gagal meningkatkan")) {
                showToast("Harap hasilkan dan tingkatkan teks prompt terlebih dahulu.", "info");
                return;
            }
            
            let currentApiKey = getStoredApiKey();
            if (!currentApiKey) {
                 const canvasInjectedKey = ""; 
                 currentApiKey = canvasInjectedKey;
                 if (!currentApiKey) {
                    showToast("API Key tidak ditemukan untuk generasi gambar. Harap masukkan API Key Anda.", "error");
                    imageGenBtn.disabled = false;
                    imageGenBtn.innerHTML = "🖼️ Generate Gambar dengan AI";
                    return;
                 }
            }


            imageGenBtn.disabled = true;
            imageGenBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Proses Gambar AI...`;
            
            
            
            
            const oldDownloadBtn = document.getElementById('download-image-btn');
            if (oldDownloadBtn) oldDownloadBtn.remove();

            const payload = { instances: [{ prompt: textPromptForImage }], parameters: { "sampleCount": 1 } };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${currentApiKey}`;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    let errorText = `Imagen API request failed status ${response.status}: ${response.statusText}`;
                     if (response.status === 401 || response.status === 403) {
                        errorText = "Gagal membuat gambar: Masalah otentikasi atau izin dengan API Gambar (" + response.status + "). Pastikan API Key Anda valid dan memiliki izin yang benar.";
                    } else {
                        try {
                            const errorData = await response.json();
                            console.error("Imagen API Error Data (JSON):", errorData);
                            errorText = `Imagen API request failed status ${response.status}: ${errorData.error?.message || JSON.stringify(errorData)}`;
                        } catch (e) {
                            try {
                               const textError = await response.text();
                               console.error("Imagen API Error Data (Text):", textError);
                               errorText = `Imagen API request failed status ${response.status}: ${textError || response.statusText}`;
                            } catch (e2) {
                                 console.error("Could not get error response body from Imagen API:", e2);
                            }
                        }
                    }
                    throw new Error(errorText);
                }
                const result = await response.json();

                if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
                    const imageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
                    
                    
                    const downloadBtn = document.createElement('button');
                    downloadBtn.id = 'download-image-btn';
                    downloadBtn.className = 'btn-download font-semibold py-2 px-5 rounded-lg text-sm mt-4';
                    downloadBtn.innerHTML = '💾 Unduh Gambar';
                    downloadBtn.onclick = () => {
                        const link = document.createElement('a');
                        link.href = imageUrl;
                        link.download = `ai_generated_image_${Date.now()}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        showToast("Gambar mulai diunduh!", "success");
                    };
                    generatedImageContainer.appendChild(downloadBtn);

                    showToast("Gambar berhasil dibuat oleh AI!", "success");
                } else {
                    console.error("Unexpected Imagen API response structure:", result);
                    generatedImageContainer.innerHTML = '<p class="text-red-600">Gagal mendapatkan data gambar dari AI. Struktur respons tidak sesuai.</p>';
                    showToast("Gagal memproses respons gambar AI.", "error");
                }
            } catch (error) {
                console.error('Error calling Imagen API:', error);
                generatedImageContainer.innerHTML = `<p class="text-red-600">${error.message}</p>`;
                showToast(`Error Gambar AI: ${error.message}`, "error");
            } finally {
                imageGenBtn.disabled = false;
                imageGenBtn.innerHTML = "🖼️ Generate Gambar dengan AI";
            }
        }


        function prepareDynamicStructure() {
            const mode = document.querySelector('input[name="mode"]:checked').value;
            const baseInput = userInput.value.trim();
            dynamicPromptStructureContainer.innerHTML = ''; 
            characterProfileSection.innerHTML = ''; 
            characterProfileSection.classList.add('hidden');

             
            
            
            // Ensure only one "Generate Gambar" button exists, or remove specific ones
            const oldImageGenBtn = document.getElementById('generate-image-btn');
            if (oldImageGenBtn) oldImageGenBtn.remove();
            const oldDownloadBtn = document.getElementById('download-image-btn'); // Also ensure download button is cleared
             if (oldDownloadBtn) oldDownloadBtn.remove();

            
            let titleText = "Struktur Input Prompt"; 
             switch (mode) {
                case 'image': titleText = 'Detail Prompt Gambar:'; break;
                case 'veo3': titleText = 'Detail Prompt Teks ke Video:'; break;
                case 'scene': titleText = 'Detail Prompt Adegan Video:'; break;
                case 'narration': titleText = 'Detail Prompt Narasi:'; break;
            }
            dynamicStructureTitle.textContent = titleText;
            dynamicStructureTitle.className = "text-xl font-semibold text-slate-700 mb-6"; 

            switch (mode) {
                case 'image':
                    const charTitle = document.createElement('h4');
                    charTitle.className = "text-lg font-medium text-slate-700 mb-3 border-b border-slate-300 pb-2";
                    charTitle.textContent = "Definisi Karakter Konsisten (Opsional)";
                    dynamicPromptStructureContainer.appendChild(charTitle);
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Nama Karakter:", createTextInput("char_name", "Misal: Elara, Kaelen")));
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Fitur Visual Kunci:", createTextarea("char_visuals", 2, "Misal: rambut merah panjang bergelombang, mata hijau emerald, tahi lalat di bawah mata kiri")));
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Gaya Pakaian Dominan:", createTextarea("char_clothing", 2, "Misal: gaya steampunk dengan kacamata goggle, jubah kulit coklat tua")));
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Isyarat Kepribadian/Pose:", createTextarea("char_personality", 2, "Misal: sering tersenyum misterius, pose percaya diri")));
                    
                    const separator = document.createElement('hr');
                    separator.className = "my-6 border-slate-300";
                    dynamicPromptStructureContainer.appendChild(separator);

                    const sceneTitle = document.createElement('h4');
                    sceneTitle.className = "text-lg font-medium text-slate-700 mb-3 border-b border-slate-300 pb-2";
                    sceneTitle.textContent = "Detail Adegan Gambar";
                    dynamicPromptStructureContainer.appendChild(sceneTitle);

                    dynamicPromptStructureContainer.appendChild(createFormGroup("Deskripsi Subjek/Adegan Utama:", createTextarea("img_subject", 3, "Contoh: Naga merah raksasa, kucing oranye lucu")));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Gaya Seni/Medium:", "img_style", imageOptions.styles));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Pakaian (Outfit Tambahan/Spesifik Adegan):", "img_outfit", imageOptions.outfits));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Waktu (Pagi/Siang/Malam):", "img_time", imageOptions.timesOfDayImg));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Lokasi (Latar Belakang):", "img_location", imageOptions.locations));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Suasana (Mood):", "img_atmosphere", imageOptions.atmospheres));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Seniman/Pengaruh (Opsional, bisa dikosongkan):", "img_artist", ["Tidak Ada/Kosongkan", "Van Gogh", "Studio Ghibli", "Frida Kahlo", "H.R. Giger", CUSTOM_OPTION_VALUE]));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Pencahayaan:", "img_lighting", imageOptions.lightings));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Skema Warna:", "img_colors", imageOptions.colors));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Komposisi/Sudut Pandang:", "img_composition", imageOptions.compositions));
                    // Aspect ratio dropdown is REMOVED
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Detail Tambahan/Modifier:", createTextarea("img_details", 2, "Contoh: Surealis, fantasi gelap")));
                    if (baseInput && document.getElementById('img_subject')) document.getElementById('img_subject').value = baseInput;

                    // Add Character Profile Management UI
                    characterProfileSection.classList.remove('hidden');
                    const profileTitle = document.createElement('h4');
                    profileTitle.className = "text-lg font-medium text-slate-700 mb-4";
                    profileTitle.textContent = "Manajemen Profil Karakter";
                    characterProfileSection.appendChild(profileTitle);

                    const profileNameGroup = createFormGroup("Nama Profil untuk Simpan/Perbarui:", createTextInput("char_profile_name", "Misal: Ksatria Malam"));
                    characterProfileSection.appendChild(profileNameGroup);
                    
                    const profileButtonsDiv = document.createElement('div');
                    profileButtonsDiv.className = "flex flex-wrap gap-2 mb-4";
                    
                    const saveProfileBtn = document.createElement('button');
                    saveProfileBtn.className = "btn-profile-action btn-profile-save";
                    saveProfileBtn.textContent = "Simpan Profil";
                    saveProfileBtn.onclick = saveCharacterProfile;
                    profileButtonsDiv.appendChild(saveProfileBtn);
                    characterProfileSection.appendChild(profileButtonsDiv);

                    const profileSelectGroup = document.createElement('div');
                    profileSelectGroup.className = "input-group mt-4";
                    const selectLabel = createLabel('char_profile_select', "Pilih Profil Tersimpan:");
                    const profileSelect = createSelectWithOptions('char_profile_select', [], false); 
                    profileSelectGroup.appendChild(selectLabel);
                    profileSelectGroup.appendChild(profileSelect);
                    characterProfileSection.appendChild(profileSelectGroup);
                    populateCharacterProfileDropdown(); 

                    const profileActionButtonsDiv = document.createElement('div');
                    profileActionButtonsDiv.className = "flex flex-wrap gap-2 mt-2";

                    const loadProfileBtn = document.createElement('button');
                    loadProfileBtn.className = "btn-profile-action btn-profile-load";
                    loadProfileBtn.textContent = "Muat Profil";
                    loadProfileBtn.onclick = loadSelectedCharacterProfile;
                    profileActionButtonsDiv.appendChild(loadProfileBtn);
                    
                    const deleteProfileBtn = document.createElement('button');
                    deleteProfileBtn.className = "btn-profile-action btn-profile-delete";
                    deleteProfileBtn.textContent = "Hapus Profil";
                    deleteProfileBtn.onclick = deleteSelectedCharacterProfile;
                    profileActionButtonsDiv.appendChild(deleteProfileBtn);
                    
                    const deleteAllBtn = document.createElement('button');
                    deleteAllBtn.className = "btn-profile-action btn-profile-delete-all";
                    deleteAllBtn.textContent = "Hapus Semua";
                    deleteAllBtn.onclick = deleteAllCharacterProfiles;
                    profileActionButtonsDiv.appendChild(deleteAllBtn);
                    characterProfileSection.appendChild(profileActionButtonsDiv);


                    const generateImageBtn = document.createElement('button');
                    generateImageBtn.id = 'generate-image-btn';
                    generateImageBtn.className = 'btn-image-gen font-semibold py-3.5 px-8 rounded-lg text-base order-2'; 
                    generateImageBtn.innerHTML = '🖼️ Generate Gambar dengan AI';
                    generateImageBtn.disabled = true; 
                    generateImageBtn.addEventListener('click', generateImageWithAI); // This line was causing the error if generateImageWithAI was not defined or removed.
                    
                    break;
                case 'veo3': 
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Deskripsi Adegan Lengkap:", createTextarea("veo_scene_desc", 4, "Contoh: Pengejaran mobil di kota malam hari yang hujan")));
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Aksi Utama:", createTextarea("veo_main_action", 3, "Contoh: Mobil saling kejar, bermanuver, percikan api")));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Gaya Visual:", "veo_visual_style", veoOptions.visualStyles));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Pergerakan Kamera (Opsional):", "veo_camera_move", ["(Biarkan AI Memilih)", ...veoOptions.cameraMoves]));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Musik/Suara Latar:", "veo_audio_bg", veoOptions.audioStyles));
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Dialog (jika ada, per baris untuk tiap karakter):", createTextarea("veo_dialogue", 3, "Karakter A: Halo!\nKarakter B: Apa kabar?")));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Durasi Perkiraan:", "veo_duration", veoOptions.durations));
                    if (baseInput && document.getElementById('veo_scene_desc')) document.getElementById('veo_scene_desc').value = `Adegan tentang ${baseInput}.`;
                    break;
                case 'scene':
                    const locationGroup = document.createElement('div');
                    locationGroup.className = 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-4';
                    locationGroup.appendChild(createCustomSelectGroup("Tipe Lokasi (INT./EXT.):", "scene_loc_type", sceneOptions.locationTypes));
                    locationGroup.appendChild(createFormGroup("Nama Lokasi:", createTextInput("scene_loc_name", "Contoh: Kantor Detektif")));
                    locationGroup.appendChild(createCustomSelectGroup("Waktu:", "scene_loc_time", sceneOptions.timesOfDay));
                    dynamicPromptStructureContainer.appendChild(locationGroup);
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Deskripsi Adegan:", createTextarea("scene_desc", 4, "Setting, atmosfer...")));
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Karakter:", createTextarea("scene_chars", 2, "Siapa saja yang ada...")));
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Aksi Kunci:", createTextarea("scene_action", 3, "Urutan kejadian...")));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Kamera (Saran Shot/Gerakan):", "scene_camera", sceneOptions.cameraShots));
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Suara (Efek/Ambience):", createTextarea("scene_sound", 2, "Suara kunci...")));
                    if (baseInput && document.getElementById('scene_desc')) document.getElementById('scene_desc').value = `Adegan berpusat pada ${baseInput}.`;
                    break;
                case 'narration':
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Topik/Tema Utama:", createTextInput("narr_topic", "Contoh: Sejarah Kemerdekaan Indonesia")));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Nada/Gaya Suara:", "narr_tone", narrationOptions.tones));
                    dynamicPromptStructureContainer.appendChild(createCustomSelectGroup("Target Audiens:", "narr_audience", narrationOptions.audiences));
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Poin-Poin Kunci (pisahkan dengan baris baru):", createTextarea("narr_points", 4, "Poin 1\nPoin 2")));
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Ide Kalimat Pembuka (Hook):", createTextInput("narr_hook", "Sesuatu yang menarik...")));
                    dynamicPromptStructureContainer.appendChild(createFormGroup("Ide Kalimat Penutup:", createTextInput("narr_conclusion", "Kesimpulan atau ajakan...")));
                    if (baseInput && document.getElementById('narr_topic')) document.getElementById('narr_topic').value = baseInput;
                    break;
            }
        }
        
        function getVal(id, isCustomSelect = false) {
            if (isCustomSelect) {
                const selectEl = document.getElementById(id);
                if (selectEl && selectEl.value === CUSTOM_OPTION_VALUE) {
                    const customInputEl = document.getElementById(id + '_custom');
                    return customInputEl ? customInputEl.value.trim() : "";
                }
                return selectEl ? selectEl.value.trim() : "";
            }
            const el = document.getElementById(id);
            return el ? el.value.trim() : "";
        }

        // --- API Key Management ---
        function getStoredApiKey() {
            return localStorage.getItem(USER_API_KEY_LS_KEY);
        }

        function updateApiKeyUI(isKeyStored) {
            if (isKeyStored) {
                apiKeyInputContainer.classList.add('hidden');
                apiKeyDisplayContainer.classList.remove('hidden');
                apiKeyStatusDisplay.textContent = "API Key tersimpan. Aplikasi siap digunakan!";
                apiKeyStatusMessage.textContent = "Anda dapat mengganti atau menghapus API Key di bawah.";
            } else {
                apiKeyInputContainer.classList.remove('hidden');
                apiKeyDisplayContainer.classList.add('hidden');
                apiKeyStatusMessage.textContent = "Tidak ada API Key tersimpan. Silakan masukkan API Key Anda.";
            }
        }


        function saveUserApiKey() {
            const key = userApiKeyInput.value.trim();
            if (key) {
                localStorage.setItem(USER_API_KEY_LS_KEY, key);
                updateApiKeyUI(true);
                showToast("API Key berhasil disimpan!", "success");
            } else {
                apiKeyStatusMessage.textContent = "Masukkan API Key terlebih dahulu.";
                showToast("API Key tidak boleh kosong.", "error");
            }
        }
        function clearUserApiKey() {
            if (confirm("Apakah Anda yakin ingin menghapus API Key yang tersimpan?")) {
                localStorage.removeItem(USER_API_KEY_LS_KEY);
                userApiKeyInput.value = "";
                updateApiKeyUI(false);
                showToast("API Key berhasil dihapus.", "info");
            }
        }
        
        function handleChangeApiKey() {
            const storedKey = getStoredApiKey();
            if (storedKey) {
                userApiKeyInput.value = storedKey; 
            }
            updateApiKeyUI(false); 
            apiKeyStatusMessage.textContent = "Masukkan API Key baru atau edit yang sudah ada, lalu simpan.";
        }

        function loadUserApiKey() {
            const storedKey = getStoredApiKey();
            if (storedKey) {
                userApiKeyInput.value = storedKey; 
                updateApiKeyUI(true);
            } else {
                updateApiKeyUI(false);
            }
        }


        async function callGeminiAPI(promptText, model = "gemini-2.0-flash") {
            let currentApiKey = getStoredApiKey();
            if (!currentApiKey) {
                 // Di lingkungan di mana API key di-inject otomatis (seperti Canvas), baris ini bisa dikosongkan.
                 // Jika tidak, pengguna harus menyediakan key.
                 // const canvasInjectedKey = ""; // Placeholder jika ada mekanisme injeksi
                 // currentApiKey = canvasInjectedKey; 
                 if (!currentApiKey) { // Jika tetap kosong
                     showToast("API Key tidak ditemukan. Harap masukkan API Key Anda di bagian Pengaturan.", "error");
                     throw new Error("API Key tidak ditemukan. Harap masukkan API Key Anda di bagian Pengaturan API Key.");
                 }
            }
            
            const modelPath = model.includes(":") ? model : `models/${model}`;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/${modelPath}:generateContent?key=${currentApiKey}`;
            
            let chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
            const payload = { contents: chatHistory };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                let errorText = `API request to ${modelPath} failed status ${response.status}: ${response.statusText}`;
                if (response.status === 401 || response.status === 403) { 
                    errorText = `Gagal menghubungi API ${modelPath} (Status ${response.status}): Masalah otentikasi atau izin. Pastikan API Key Anda valid dan memiliki izin yang benar.`;
                } else {
                    try {
                        const errorData = await response.json();
                        console.error(`API Error Data from ${modelPath} (JSON):`, errorData);
                        errorText = `API request to ${modelPath} failed status ${response.status}: ${errorData.error?.message || JSON.stringify(errorData)}`;
                    } catch (e) {
                        try {
                            const textError = await response.text();
                            console.error(`API Error Data from ${modelPath} (Text):`, textError);
                            errorText = `API request to ${modelPath} failed status ${response.status}: ${textError || response.statusText}`;
                        } catch (e2) {
                             console.error(`Could not get error response body from ${modelPath}:`, e2);
                        }
                    }
                }
                throw new Error(errorText);
            }
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                return result.candidates[0].content.parts[0].text.trim();
            } else {
                console.error("Unexpected API response structure from " + modelPath + ":", result);
                throw new Error("Struktur respons API tidak sesuai atau konten kosong dari " + modelPath);
            }
        }

        async function generateAndEnhancePrompt() { 
            const mode = document.querySelector('input[name="mode"]:checked').value;
            
            if (!getStoredApiKey() && "") { 
                 showToast("Harap simpan API Key Anda terlebih dahulu di bagian Pengaturan API Key.", "error");
                 return;
            }

            generateEnhanceBtn.disabled = true;
            generateEnhanceBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Proses AI Teks (1/2)...`;
            outputPromptId.value = "Sedang memproses teks prompt (Tahap 1: Peningkatan), mohon tunggu...";
            outputPromptEn.value = ""; 
            
            const generateImageBtn = document.getElementById('generate-image-btn');
            if (generateImageBtn) generateImageBtn.disabled = true;

            let basePromptDetails = "";
            let enhancerInstruction = "";
            let originalDialog = ""; 

            switch (mode) {
                case 'image':
                    const charName = getVal('char_name');
                    const charVisuals = getVal('char_visuals');
                    const charClothing = getVal('char_clothing');
                    const charPersonality = getVal('char_personality');
                    const artistInfluence = getVal('img_artist', true);
                    // const aspectRatio = getVal('img_aspect_ratio', true) || "tidak ditentukan (biarkan AI memilih)"; // REMOVED

                    let characterBlock = "";
                    if (charName || charVisuals || charClothing || charPersonality) {
                        characterBlock = `\n\n**Detail Karakter Konsisten (SANGAT PENTING & PRIORITAS UTAMA):**\n` +
                                         (charName ? `- Nama Karakter: ${charName}\n` : "") +
                                         (charVisuals ? `- Fitur Visual Kunci Karakter: ${charVisuals}\n` : "") +
                                         (charClothing ? `- Gaya Pakaian Dominan Karakter: ${charClothing}\n` : "") +
                                         (charPersonality ? `- Isyarat Kepribadian/Pose Khas Karakter: ${charPersonality}\n` : "");
                    }
                    
                    basePromptDetails = `Detail Prompt Dasar untuk Gambar:\n` +
                                      `Subjek/Adegan Utama: ${getVal('img_subject') || "Belum ditentukan"}\n` +
                                      `Gaya Seni/Medium: ${getVal('img_style', true)}\n` + 
                                      `Pakaian (Outfit Tambahan/Spesifik Adegan): ${getVal('img_outfit', true) || "Tidak ditentukan secara spesifik"}\n` + 
                                      `Waktu: ${getVal('img_time', true) || "Tidak ditentukan secara spesifik"}\n` + 
                                      `Lokasi/Latar Belakang: ${getVal('img_location', true) || "Tidak ditentukan secara spesifik"}\n` + 
                                      `Suasana/Mood: ${getVal('img_atmosphere', true) || "Tidak ditentukan secara spesifik"}\n` + 
                                      `Seniman/Pengaruh: ${artistInfluence === "Tidak Ada/Kosongkan" ? "Tidak ada" : artistInfluence || "Tidak ada"}\n` + 
                                      `Pencahayaan: ${getVal('img_lighting', true)}\n` +
                                      `Skema Warna: ${getVal('img_colors', true)}\n` +
                                      `Komposisi/Sudut Pandang: ${getVal('img_composition', true)}\n` +
                                      // `Rasio Aspek yang Diinginkan: ${aspectRatio}\n` + // REMOVED
                                      `Detail Tambahan/Modifier: ${getVal('img_details') || "Tidak ada"}` +
                                      characterBlock; 

                    enhancerInstruction = `Anda adalah seorang "Advanced Prompt Engineer" dan "Creative Visual Storyteller" untuk generator gambar AI. Tugas Anda adalah mengambil detail prompt berikut dan MENGEMBANGKANNYA secara kreatif menjadi SATU prompt gambar tunggal yang sangat deskriptif, imajinatif, kaya visual, sinematik, dan memukau. ${characterBlock ? "PERHATIAN UTAMA: Pastikan **karakter yang konsisten** berdasarkan detail karakter yang diberikan (Nama, Fitur Visual, Pakaian Dominan, Kepribadian/Pose) muncul secara jelas, akurat, dan dominan dalam gambar. Ini adalah prioritas tertinggi. Setelah itu, integrasikan detail adegan tambahan secara harmonis di sekitar karakter tersebut." : "Jika tidak ada detail karakter spesifik, fokus pada elemen adegan."} Susun prompt dengan struktur yang baik: mulai dengan subjek utama dan karakter, kemudian deskripsikan aksi atau pose, pakaian tambahan, setting/lokasi detail, waktu dan pencahayaan yang terkait, suasana yang kuat, gaya seni, pengaruh seniman (jika ada & bukan 'Tidak Ada/Kosongkan'), skema warna, komposisi, dan akhiri dengan modifier kualitas tinggi (misalnya 'sangat detail', 'resolusi 4K', 'cinematic lighting', 'epic', 'masterpiece', 'trending on artstation'). Elaborasi setiap elemen dengan kata sifat dan keterangan yang kaya. Jika elemen "Tidak ditentukan secara spesifik", gunakan kreativitas Anda. Output HANYA berupa prompt gambar final dalam satu paragraf/kalimat panjang yang koheren dan siap pakai, TANPA kalimat pembuka/penutup/penjelasan/label/daftar. Lukislah dengan kata-kata!`;
                    break;
                case 'veo3': 
                    originalDialog = getVal('veo_dialogue'); 
                    basePromptDetails = `Detail Prompt Dasar untuk Video (tanpa dialog):\n` + 
                                      `Deskripsi Adegan: ${getVal('veo_scene_desc') || "Belum ditentukan"}\n` +
                                      `Aksi Utama: ${getVal('veo_main_action') || "Belum ditentukan"}\n` +
                                      `Gaya Visual: ${getVal('veo_visual_style', true)}\n` +
                                      `Pergerakan Kamera: ${getVal('veo_camera_move', true) === "(Biarkan AI Memilih)" ? "AI yang memilih" : getVal('veo_camera_move', true)}\n` +
                                      `Musik/Suara Latar: ${getVal('veo_audio_bg', true)}\n` +
                                      `Durasi: ${getVal('veo_duration', true)}`;
                    enhancerInstruction = `Anda adalah 'Prompt Enhancer' ahli untuk generator video AI seperti Veo3. Tugas Anda adalah mengambil detail berikut (tanpa dialog, dialog akan ditambahkan kemudian) dan merakitnya menjadi SATU prompt deskripsi video tunggal yang komprehensif dan imajinatif. Fokus pada adegan, aksi, gaya visual, pergerakan kamera, musik/suara latar, dan durasi. Buatlah deskripsi yang mengalir dan menarik. Jika prompt yang Anda hasilkan menyiratkan adanya percakapan atau dialog antar karakter (misalnya, "dua orang terlihat sedang berdiskusi serius di meja bundar"), pastikan deskripsi tersebut memberikan konteks yang cukup agar dialog yang mungkin ditambahkan nanti terasa alami dan sesuai. Output HANYA berupa deskripsi video dalam satu paragraf, TANPA penjelasan/daftar/label.`;
                    break;
                case 'scene':
                    basePromptDetails = `Detail Prompt Dasar untuk Adegan Video:\n` +
                                      `LOKASI: ${getVal('scene_loc_type', true)} ${getVal('scene_loc_name') || "[Nama Lokasi]"} - ${getVal('scene_loc_time', true)}\n` +
                                      `DESKRIPSI ADEGAN: ${getVal('scene_desc') || "Belum ditentukan"}\n` +
                                      `KARAKTER: ${getVal('scene_chars') || "Belum ditentukan"}\n` +
                                      `AKSI KUNCI: ${getVal('scene_action') || "Belum ditentukan"}\n` +
                                      `KAMERA: ${getVal('scene_camera', true)}\n` +
                                      `SUARA: ${getVal('scene_sound') || "Belum ditentukan"}`;
                    enhancerInstruction = `Anda adalah 'Prompt Enhancer' untuk penulisan skenario adegan video. Tugas Anda adalah mengambil detail berikut dan merakitnya menjadi deskripsi adegan yang hidup dan mendetail sesuai format standar skenario. Perkaya setiap bagian untuk menciptakan gambaran kuat dan sinematik. Jika ada bagian "Belum ditentukan" atau terlalu singkat, tambahkan elemen naratif/deskriptif yang memperkuat adegan. Output HANYA berupa prompt adegan video final dalam format skenario rapi, TANPA penjelasan tambahan di luar format tersebut.`;
                    break;
                case 'narration':
                    const narrPointsRaw = getVal('narr_points');
                    const narrPointsList = narrPointsRaw.split('\n').filter(p => p.trim() !== "").map(p => `- ${p.trim()}`).join('\n');
                    basePromptDetails = `Detail Prompt Dasar untuk Narasi:\n` +
                                      `Topik/Tema Utama: ${getVal('narr_topic') || "Belum ditentukan"}\n` +
                                      `Nada/Gaya Suara: ${getVal('narr_tone', true)}\n` +
                                      `Target Audiens: ${getVal('narr_audience', true)}\n` +
                                      `Poin-Poin Kunci:\n${narrPointsList || "- (Belum ada poin kunci)"}\n` +
                                      `Ide Kalimat Pembuka (Hook): ${getVal('narr_hook') || "Belum ditentukan"}\n` +
                                      `Ide Kalimat Penutup: ${getVal('narr_conclusion') || "Belum ditentukan"}`;
                    enhancerInstruction = `Anda adalah 'Prompt Enhancer' untuk pembuatan skrip narasi. Tugas Anda adalah mengambil detail berikut dan merakitnya menjadi panduan narasi yang lengkap, menarik, dan siap digunakan. Pastikan topik, nada, audiens, poin kunci, hook, dan penutup saling mendukung. Jika 'Poin Kunci' kurang elaboratif atau "Belum ada", sarankan untuk mengembangkannya atau berikan contoh poin relevan. Jika 'Hook' atau 'Penutup' generik atau "Belum ditentukan", usulkan ide yang lebih spesifik dan kreatif. Output HANYA berupa panduan narasi final yang terstruktur rapi, TANPA penjelasan tambahan di luar konteks panduan tersebut.`;
                    break;
            }

            const fullApiPrompt = `${enhancerInstruction}\n\n${basePromptDetails}`;
            
            try {
                let enhancedIndonesianPrompt = await callGeminiAPI(fullApiPrompt);
                
                if (mode === 'veo3' && originalDialog) {
                    const dialogLines = originalDialog.split('\n').map(d => d.trim()).filter(d => d);
                    let formattedDialogContent = "";
                    if (dialogLines.length > 0) {
                        // Simple check if dialog lines already have speaker tags (e.g., "Nama:")
                        const hasSpeakerTags = dialogLines.every(line => /^[a-zA-Z0-9\s]+:/.test(line.trim()));
                        if (hasSpeakerTags) {
                            formattedDialogContent = dialogLines.join("\n");
                        } else {
                            // If no speaker tags, assume it's general dialog or needs generic labeling
                            // This part might need refinement if AI enhancer is expected to format the dialog speakers
                            formattedDialogContent = dialogLines.join("\n"); 
                        }
                    }
                    if (formattedDialogContent) {
                        enhancedIndonesianPrompt += `\n\n-- DIALOG (Bahasa Asli) --\n${formattedDialogContent}`;
                    }
                }
                outputPromptId.value = enhancedIndonesianPrompt;


                if (generateImageBtn) generateImageBtn.disabled = false; 
                
                generateEnhanceBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Proses AI Teks (2/2)...`;
                outputPromptEn.value = "Sedang menerjemahkan teks prompt ke Bahasa Inggris...";

                let textToTranslate = enhancedIndonesianPrompt;
                let dialogToAppendInEnglish = "";

                if (mode === 'veo3' && originalDialog) {
                    const dialogMarker = "\n\n-- DIALOG (Bahasa Asli) --";
                    const dialogIndex = enhancedIndonesianPrompt.indexOf(dialogMarker);
                    if (dialogIndex !== -1) {
                       textToTranslate = enhancedIndonesianPrompt.substring(0, dialogIndex);
                       // Prepare original dialog for appending to the English version
                       const dialogLines = originalDialog.split('\n').map(d => d.trim()).filter(d => d);
                       if (dialogLines.length > 0) {
                            dialogToAppendInEnglish = "\n\n-- DIALOG (Original Indonesian) --\n" + dialogLines.join("\n");
                       }
                    }
                }

                const translationPrompt = `Terjemahkan teks berikut ke dalam Bahasa Inggris secara akurat dan natural, pertahankan semua detail, format (jika ada seperti format skenario), dan maksud aslinya. Jangan menambahkan komentar atau frasa pembuka/penutup di luar terjemahan itu sendiri:\n\n"${textToTranslate}"`;
                let enhancedEnglishPrompt = await callGeminiAPI(translationPrompt);

                if (mode === 'veo3' && dialogToAppendInEnglish) {
                    enhancedEnglishPrompt += dialogToAppendInEnglish;
                }
                outputPromptEn.value = enhancedEnglishPrompt;

                showToast("Teks prompt berhasil ditingkatkan dan diterjemahkan!", "success");

            } catch (error) {
                outputPromptId.value = `Gagal meningkatkan teks prompt: ${error.message}`;
                outputPromptEn.value = `Proses penerjemahan teks dibatalkan karena error sebelumnya.`;
                showToast(`Error AI Teks: ${error.message}`, "error");
            } finally {
                generateEnhanceBtn.disabled = false;
                generateEnhanceBtn.textContent = "✨ Hasilkan & Tingkatkan Teks Prompt";
            }
        }

        // generateImageWithAI function is REMOVED from this version
        // async function generateImageWithAI() { /* ... */ }


        // --- Event Listeners ---
        modeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                prepareDynamicStructure();
                outputPromptId.value = ""; 
                outputPromptEn.value = ""; 
                //  // Section removed
                //  // Container removed
                const imgGenBtn = document.getElementById('generate-image-btn'); // Button might be removed
                if (imgGenBtn) imgGenBtn.disabled = true;
            });
        });
        
        userInput.addEventListener('input', () => {
            const currentMode = document.querySelector('input[name="mode"]:checked').value;
            const baseInput = userInput.value.trim();
            if (dynamicPromptStructureContainer.innerHTML !== '' && !dynamicPromptStructureContainer.querySelector('p.text-slate-500')) { 
                 if (currentMode === 'image' && document.getElementById('img_subject')) document.getElementById('img_subject').value = baseInput;
                 if (currentMode === 'veo3' && document.getElementById('veo_scene_desc')) document.getElementById('veo_scene_desc').value = `Adegan tentang ${baseInput}.`;
                 if (currentMode === 'scene' && document.getElementById('scene_desc')) document.getElementById('scene_desc').value = `Adegan berpusat pada ${baseInput}.`;
                 if (currentMode === 'narration' && document.getElementById('narr_topic')) document.getElementById('narr_topic').value = baseInput;
            }
        });

        generateEnhanceBtn.addEventListener('click', generateAndEnhancePrompt);

        saveApiKeyBtn.addEventListener('click', saveUserApiKey);
        clearApiKeyBtn.addEventListener('click', clearUserApiKey);
        changeApiKeyBtn.addEventListener('click', handleChangeApiKey); 


        function setupCopyButton(buttonId, textareaId, langName) { /* ... (Sama seperti v12) ... */ }
        setupCopyButton('copy-btn-id', 'output-prompt-id', 'ID');
        setupCopyButton('copy-btn-en', 'output-prompt-en', 'EN');
        
        function setupCopyButton(buttonId, textareaId, langName) {
            const button = document.getElementById(buttonId);
            const textarea = document.getElementById(textareaId);
            button.addEventListener('click', () => {
                if (textarea.value && !textarea.value.includes("Sedang memproses") && !textarea.value.includes("dibatalkan")) {
                    const tempTextArea = document.createElement("textarea");
                    tempTextArea.value = textarea.value;
                    tempTextArea.style.position = "fixed"; 
                    document.body.appendChild(tempTextArea);
                    tempTextArea.focus(); 
                    tempTextArea.select();
                    try {
                        document.execCommand('copy');
                        showToast(`Prompt (${langName}) berhasil disalin!`, "success");
                    } catch (err) {
                        showToast(`Gagal menyalin prompt (${langName}).`, "error");
                    }
                    document.body.removeChild(tempTextArea);
                } else if (textarea.value.includes("Sedang memproses") || textarea.value.includes("dibatalkan")) {
                    showToast('Mohon tunggu AI selesai memproses atau perbaiki error.', "info");
                } else {
                    showToast(`Tidak ada prompt (${langName}) untuk disalin.`, "info");
                }
            });
        }

        function showToast(message, type = "success") { /* ... (Sama seperti v12) ... */ }
        function showToast(message, type = "success") {
            toastNotification.textContent = message;
            toastNotification.className = 'toast show'; 
            if (type === "success") toastNotification.style.backgroundColor = '#10b981'; 
            else if (type === "error") toastNotification.style.backgroundColor = '#ef4444'; 
            else if (type === "info") toastNotification.style.backgroundColor = '#3b82f6'; 
            
            setTimeout(() => {
                toastNotification.classList.remove('show');
            }, 3500); 
        }

        // Inisialisasi awal
        loadUserApiKey(); 
        prepareDynamicStructure();
        if (document.querySelector('input[name="mode"]:checked').value === 'image') {
            setTimeout(() => {
                 if(document.getElementById('char_profile_select')) {
                    populateCharacterProfileDropdown();
                 }
            }, 100);
        }

// Dark Mode Toggle Script

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
        body.classList.add("dark");
        toggle.checked = true;
    }
    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    });
});
