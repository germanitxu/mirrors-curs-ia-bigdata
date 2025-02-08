// The URL of the Teachable Machine model
const URL = "https://teachablemachine.withgoogle.com/models/GwMGBGEe9/";

let model, labelContainer, maxPredictions;

// Load the image model
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Add event listener to the file input
    document.getElementById("image-input").addEventListener("change", handleImageUpload);
}

// Handle image upload and prediction
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.onload = async () => {
                document.getElementById("image-container").innerHTML = "";
                document.getElementById("image-container").appendChild(img);

                // Predict the image
                await predict(img);
            };
        };
        reader.readAsDataURL(file);
    }
}

// Run the image through the model and update predictions
async function predict(image) {
    const prediction = await model.predict(image);

    // Update Alpaca emoji
    const alpacaEmoji = document.getElementById("alpaca-emoji");
    const alpacaProbability = prediction.find(p => p.className === "Alpaca")?.probability || 0;
    alpacaEmoji.style.fontSize = `${50 + alpacaProbability * 30}px`;

    // Update Horse emoji
    const horseEmoji = document.getElementById("horse-emoji");
    const horseProbability = prediction.find(p => p.className === "Cavall")?.probability || 0;
    horseEmoji.style.fontSize = `${50 + horseProbability * 30}px`;
}

// Initialize the app
init();