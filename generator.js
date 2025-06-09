function generateImagePrompt() {
  const gender = document.getElementById('gender').value;
  const age = document.getElementById('age').value;
  const hairStyle = document.getElementById('hairStyle').value;
  const skinColor = document.getElementById('skinColor').value;
  const outfit = document.getElementById('outfit').value;

  const promptEn = `A consistent character: ${gender}, ${age}, hairstyle: ${hairStyle}, skin: ${skinColor}, outfit: ${outfit}.`;
  const promptId = `Karakter konsisten: ${gender}, ${age}, gaya rambut: ${hairStyle}, kulit: ${skinColor}, outfit: ${outfit}.`;

  document.getElementById('result-en').innerText = promptEn;
  document.getElementById('result-id').innerText = promptId;
}

function generateTextToVideo() {
  const lang = document.getElementById('language').value;
  const dialog = document.getElementById('dialog').value;

  const promptEn = `[${lang === 'english' ? 'English' : 'Indonesian'} dialogue] ${dialog}`;
  const promptId = `[${lang === 'indonesian' ? 'Bahasa Indonesia' : 'Bahasa Inggris'}] ${dialog}`;

  document.getElementById('result-en').innerText = promptEn;
  document.getElementById('result-id').innerText = promptId;
}

function generateImageToVideo() {
  const movement = document.getElementById('cameraMovement').value;
  const effect = document.getElementById('visualEffect').value;

  const promptEn = `Film-style video: Camera movement - ${movement}, Visual effect - ${effect}.`;
  const promptId = `Gaya video film: Gerakan kamera - ${movement}, Efek visual - ${effect}.`;

  document.getElementById('result-en').innerText = promptEn;
  document.getElementById('result-id').innerText = promptId;
}

function generateNarrative() {
  const idea = document.getElementById('narrativeInput').value;

  const promptEn = `Write a professional narrative script based on the following idea: ${idea}`;
  const promptId = `Tulis narasi profesional berdasarkan ide berikut: ${idea}`;

  document.getElementById('result-en').innerText = promptEn;
  document.getElementById('result-id').innerText = promptId;
}
