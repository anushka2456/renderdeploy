//Basic Setup
import { LingoDotDevEngine } from "lingo.dev/sdk";

const lingoDotDev = new LingoDotDevEngine({
  apiKey: "api_pm1eltg99qigo1cjmv1pcv7qapi_pm1eltg99qigo1cjmv1pcv7q",
});

//Text Translation
//Translate simple text:

const result = await lingoDotDev.localizeText("Hello, world!", {
  sourceLocale: "en",
  targetLocale: "es",
});
// Returns: "¡Hola Mundo!"
//Translate to multiple languages:

const results = await lingoDotDev.batchLocalizeText("Hello, world!", {
  sourceLocale: "en",
  targetLocales: ["es", "fr", "de"],
});
// Returns: ['¡Hola Mundo!', 'Bonjour le monde!', 'Hallo Welt!']

//Object Translation
//Translate structured data:

const content = {
  greeting: "Hello",
  farewell: "Goodbye",
  message: "Welcome to our platform",
};

const translated = await lingoDotDev.localizeObject(content, {
  sourceLocale: "en",
  targetLocale: "es",
});
// Returns: { greeting: "Hola", farewell: "Adiós", message: "Bienvenido a nuestra plataforma" }

//Chat Translation
//Translate conversation arrays:

const conversation = [
  { name: "Alice", text: "Hello!" },
  { name: "Bob", text: "How are you?" },
  { name: "Alice", text: "I'm doing well, thanks!" },
];

const translated = await lingoDotDev.localizeChat(conversation, {
  sourceLocale: "en",
  targetLocale: "es",
});
// Returns translated conversation with same structure

//HTML Translation
//Translate HTML while preserving markup:

const html = "<div>Hello <strong>world</strong></div>";

const translated = await lingoDotDev.localizeHtml(html, {
  sourceLocale: "en",
  targetLocale: "es",
});
// Returns: "<div>Hola <strong>mundo</strong></div>"

//Language Detection
//Automatically detect source language:

const locale = await lingoDotDev.recognizeLocale("Bonjour le monde");
// Returns: 'fr'
//Use with automatic detection:

const result = await lingoDotDev.localizeText("Bonjour le monde", {
  sourceLocale: null, // Auto-detect
  targetLocale: "en",
});
// Returns: "Hello world"

//Configuration Options
//Configure SDK behavior:

const lingoDotDev = new LingoDotDevEngine({
  apiKey: "api_pm1eltg99qigo1cjmv1pcv7qapi_pm1eltg99qigo1cjmv1pcv7q",
  batchSize: 100, // Max items per API request (default: 50, max: 250)
  idealBatchItemSize: 1000, // Target word count per batch (default: 500, max: 2500)
});

//Translation Parameters
//Speed vs quality control:

const result = await lingoDotDev.localizeText("Hello world", {
  sourceLocale: "en",
  targetLocale: "es",
  fast: true, // Prioritize speed over quality
});

//Progress Tracking
//Monitor large translation jobs:

await lingoDotDev.localizeObject(
  largeObject,
  { sourceLocale: "en", targetLocale: "es" },
  (progress) => {
    console.log(`Translation progress: ${progress}%`);
    // Update UI progress bar
  },
);

//Error Handling
//Implement proper error handling:

try {
  const result = await lingoDotDev.localizeText("Hello", {
    sourceLocale: "en",
    targetLocale: "es",
  });
} catch (error) {
  console.error("Translation failed:", error.message);
  // Handle error appropriately
}
