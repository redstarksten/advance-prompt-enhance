// Set mode based on selection
function setMode() {
    const mode = document.getElementById('mode-select').value;
    const modeContent = document.getElementById('mode-content');

    if (mode === 'image') {
        modeContent.innerHTML = getImagePromptMode();
        selectedModel = 'image-prompt-model';  // Assign model role for image mode
    } else if (mode === 'video') {
        modeContent.innerHTML = getTextToVideoMode();
        selectedModel = 'video-prompt-model';  // Assign model role for video mode
    } else if (mode === 'image-video') {
        modeContent.innerHTML = getImageToVideoMode();
        selectedModel = 'image-video-prompt-model';  // Assign model role for image-to-video
    } else if (mode === 'narrative') {
        modeContent.innerHTML = getNarrativeMode();
        selectedModel = 'narrative-prompt-model';  // Assign model role for narrative script
    }
}

// Generate Image Prompt Mode
function getImagePromptMode() {
    return `
        <label for="character-gender">Character Gender:</label>
        <select id="character-gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
        <label for="character-age">Character Age:</label>
        <input type="number" id="character-age" placeholder="Age">
        <label for="character-hair">Hair Style:</label>
        <select id="character-hair">
            <option value="short">Short</option>
            <option value="long">Long</option>
            <option value="curly">Curly</option>
        </select>
        <label for="character-skin">Skin Color:</label>
        <select id="character-skin">
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="dark">Dark</option>
        </select>
        <label for="character-outfit">Outfit:</label>
        <input type="text" id="character-outfit" placeholder="Describe outfit">
    `;
}

// Generate Text to Video Mode
function getTextToVideoMode() {
    return `
        <label for="dialog-language">Language/Accent:</label>
        <select id="dialog-language">
            <option value="english">English</option>
            <option value="indonesian">Indonesian</option>
        </select>
        <label for="dialog">Dialog:</label>
        <textarea id="dialog" placeholder="Enter dialog"></textarea>
    `;
}

// Generate Image to Video Mode
function getImageToVideoMode() {
    return `
        <label for="camera-movement">Camera Movement:</label>
        <select id="camera-movement">
            <option value="pan">Pan</option>
            <option value="tilt">Tilt</option>
            <option value="zoom">Zoom</option>
        </select>
        <label for="object-movement">Object Movement:</label>
        <select id="object-movement">
            <option value="static">Static</option>
            <option value="moving">Moving</option>
        </select>
        <label for="visual-effects">Visual Effects:</label>
        <input type="text" id="visual-effects" placeholder="Describe effects">
    `;
}

// Generate Narrative Mode
function getNarrativeMode() {
    return `
        <label for="narrative">Narrative:</label>
        <textarea id="narrative" placeholder="Enter story/script"></textarea>
    `;
}

// Copy the prompt to clipboard in selected language
function copyPrompt(language) {
    const resultPrompt = document.getElementById('result-prompt');
    const prompt = resultPrompt.value;

    // Modify prompt based on language (example: translate or adapt prompt)
    const translatedPrompt = language === 'id' ? translateToIndonesian(prompt) : prompt;

    // Copy to clipboard
    navigator.clipboard.writeText(translatedPrompt).then(() => {
        alert('Prompt copied to clipboard!');
    });
}

// Example translation function
function translateToIndonesian(prompt) {
    // In a real application, this could be handled with an API or other method
    return "Terjemahan: " + prompt; // This is just an example.
}

// Fetch prompt based on user input and the selected model
function fetchPrompt() {
    const apiKey = document.getElementById('api-key').value;
    if (!apiKey) {
        alert("Please enter a valid API key.");
        return;
    }

    const mode = document.getElementById('mode-select').value;
    const model = selectedModel; // The model role based on selected mode

    // Collect inputs from the user
    let promptDetails = "";
    if (mode === 'image') {
        promptDetails = gatherImagePromptDetails();
    } else if (mode === 'video') {
        promptDetails = gatherVideoPromptDetails();
    } else if (mode === 'image-video') {
        promptDetails = gatherImageVideoPromptDetails();
    } else if (mode === 'narrative') {
        promptDetails = gatherNarrativePromptDetails();
    }

    // Call the API with the selected model, user input, and API key
    callApi(apiKey, model, promptDetails);
}

// Collect image prompt details
function gatherImagePromptDetails() {
    const gender = document.getElementById('character-gender').value;
    const age = document.getElementById('character-age').value;
    const hair = document.getElementById('character-hair').value;
    const skin = document.getElementById('character-skin').value;
    const outfit = document.getElementById('character-outfit').value;

    return `Create an image of a ${age}-year-old ${gender} character with ${hair} hair, ${skin} skin, wearing a ${outfit}.`;
}

// Collect video prompt details
function gatherVideoPromptDetails() {
    const dialog = document.getElementById('dialog').value;
    const language = document.getElementById('dialog-language').value;

    return `Create a video with the dialog: "${dialog}" in ${language} language.`;
}

// Collect image-to-video details
function gatherImageVideoPromptDetails() {
    const cameraMovement = document.getElementById('camera-movement').value;
    const objectMovement = document.getElementById('object-movement').value;
    const effects = document.getElementById('visual-effects').value;

    return `Create an image-to-video with ${cameraMovement} camera movement, ${objectMovement} object movement, and visual effects like: ${effects}.`;
}

// Collect narrative details
function gatherNarrativePromptDetails() {
    const narrative = document.getElementById('narrative').value;

    return `Write a script with the following narrative: "${narrative}"`;
}

// Call the API with the model and prompt details
function callApi(apiKey, model, promptDetails) {
    const requestPayload = {
        apiKey: apiKey,
        model: model,
        prompt: promptDetails,
    };

    fetch('https://api.deepseek.com/generate', { // Example API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result-prompt').value = data.prompt;
    })
    .catch(error => {
        console.error("Error generating prompt:", error);
    });
}

// Initialize default mode content
window.onload = setMode;
