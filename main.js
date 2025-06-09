function showMode(modeId) {
  document.querySelectorAll('.mode-form').forEach(div => {
    div.classList.remove('active');
  });
  document.getElementById(modeId).classList.add('active');
}

function copyPrompt(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Prompt copied to clipboard!');
  });
}
