function saveApiKey() {
  const key = document.getElementById('apikey').value;
  localStorage.setItem('gemini_apikey', key);
  alert('API Key disimpan!');
}

function loadApiKey() {
  const storedKey = localStorage.getItem('gemini_apikey');
  if (storedKey) {
    document.getElementById('apikey').value = storedKey;
  }
}

window.onload = loadApiKey;
