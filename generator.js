function generateImagePrompt() {
  const gender = document.getElementById('gender').value;
  const age = document.getElementById('age').value;
  const hairStyle = document.getElementById('hairStyle').value;
  const skinColor = document.getElementById('skinColor').value;
  const outfit = document.getElementById('outfit').value;

  const expression = document.getElementById('facialExpression').value;
  const background = document.getElementById('background').value;
  const stylePresetImage = document.getElementById('stylePresetImage').value;
  
    const height = document.getElementById('height').value;
    const bodyType = document.getElementById('bodyType').value;
    const eyeColor = document.getElementById('eyeColor').value;
    const specialFeature = document.getElementById('specialFeature').value;
    const promptEn = `Style: ${stylePresetImage}. A consistent character: ${gender}, ${age}, hairstyle: ${hairStyle}, skin: ${skinColor}, outfit: ${outfit}, height: ${height}, body: ${bodyType}, eyes: ${eyeColor}, special: ${specialFeature}, facial expression: ${expression}, background: ${background}.`; ${gender}, ${age}, hairstyle: ${hairStyle}, skin: ${skinColor}, outfit: ${outfit}, facial expression: ${expression}, background: ${background}.`;
  const promptId = `Karakter konsisten: ${gender}, ${age}, gaya rambut: ${hairStyle}, kulit: ${skinColor}, outfit: ${outfit}, tinggi: ${height}, tubuh: ${bodyType}, mata: ${eyeColor}, ciri khas: ${specialFeature}, ekspresi wajah: ${expression}, latar belakang: ${background}.`;

  document.getElementById('result-en').innerText = promptEn;
  document.getElementById('result-id').innerText = promptId;
}

function generateTextToVideo() {
  const lang = document.getElementById('language').value;
  const dialog = document.getElementById('dialog').value;

  const genre = document.getElementById('genre').value;
  const mood = document.getElementById('mood').value;
  const stylePresetVideo = document.getElementById('stylePresetVideo').value;
  
    const charGender = document.getElementById('charGender').value;
    const charAge = document.getElementById('charAge').value;
    const charLook = document.getElementById('charLook').value;
    const charOutfit = document.getElementById('charOutfit').value;
    const promptEn = `Style: ${stylePresetVideo}. Consistent character: ${charGender}, ${charAge}, look: ${charLook}, outfit: ${charOutfit}. Veo3 structure: genre: ${genre}, mood: ${mood}, dialogue: [${lang === 'english' ? 'English' : 'Indonesian'}] ${dialog}`;
  const promptId = `Karakter konsisten: ${charGender}, ${charAge}, penampilan: ${charLook}, outfit: ${charOutfit}. Struktur Veo3: genre: ${genre}, suasana: ${mood}, dialog: [${lang === 'indonesian' ? 'Bahasa Indonesia' : 'Bahasa Inggris'}] ${dialog}`;

  document.getElementById('result-en').innerText = promptEn;
  document.getElementById('result-id').innerText = promptId;
}

function generateImageToVideo() {
  const movement = document.getElementById('cameraMovement').value;
  const effect = document.getElementById('visualEffect').value;

  const duration = document.getElementById('duration').value;
  const objectMotion = document.getElementById('objectMotion').value;
  const stylePresetImageVideo = document.getElementById('stylePresetImageVideo').value;
  const promptEn = `Style: ${stylePresetImageVideo}. Film-style video: Camera movement - ${movement}, Visual effect - ${effect}, Scene duration - ${duration}, Object motion - ${objectMotion}.`;
  const promptId = `Gaya video film: Gerakan kamera - ${movement}, Efek visual - ${effect}, Durasi adegan - ${duration}, Arah gerak objek - ${objectMotion}.`;

  document.getElementById('result-en').innerText = promptEn;
  document.getElementById('result-id').innerText = promptId;
}

function generateNarrative() {
  const idea = document.getElementById('narrativeInput').value;

  const tone = document.getElementById('tone').value;
  const scriptType = document.getElementById('scriptType').value;
  const stylePresetNarrative = document.getElementById('stylePresetNarrative').value;
  const promptEn = `Write a ${stylePresetNarrative}-style professional ${scriptType} with a ${tone} tone based on the idea: ${idea}`;
  const promptId = `Tulis ${scriptType} profesional dengan gaya ${tone} berdasarkan ide: ${idea}`;

  document.getElementById('result-en').innerText = promptEn;
  document.getElementById('result-id').innerText = promptId;
}
