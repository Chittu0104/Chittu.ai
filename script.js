let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

let userName = "Sir";

function speak(text) {
    window.speechSynthesis.cancel(); 
    let textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.volume = 1;
    textSpeak.lang = "hi-GB";
    window.speechSynthesis.speak(textSpeak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning!");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon!");
    } else {
        speak("Good Evening!");
    }
}

function handleKnownCommands(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak(`Hello ${userName}, how can I assist you?`);
    } else if (message.includes("who are you")) {
        speak(`I am your virtual assistant, created by Sourav Sir.`);
    } else if (message.includes("open youtube")) {
        openWebsite("YouTube", "https://youtube.com");
    } else if (message.includes("open google")) {
        openWebsite("Google", "https://google.com");
    } else if (message.includes("open facebook")) {
        openWebsite("Facebook", "https://facebook.com");
    } else if (message.includes("open instagram")) {
        openWebsite("Instagram", "https://instagram.com");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString();
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleDateString();
        speak(`Today's date is ${date}`);
    } else if (message.includes("tell me a joke")) {
        tellJoke();
    }else if (message.includes("tell me a joke in hindi")) {
        tellJokeinhindi();
    } else {
        return false;
    }
    return true;
}

function openWebsite(name, url) {
    speak(`Opening ${name}...`);
    window.open(url, "_blank");
}

function tellJoke() {
    let jokes = [
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "Why don’t skeletons fight each other? They don’t have the guts.",
        "What do you call fake spaghetti? An impasta!"
    ];
    let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    speak(randomJoke);
}
function tellJokeinhindi() {
    let jokes = [
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "Why don’t skeletons fight each other? They don’t have the guts.",
        "What do you call fake spaghetti? An impasta!"
    ];
    let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    speak(randomJoke);
}

btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript.toLowerCase();
    content.innerText = transcript;
    voice.style.display = "none";
    btn.style.display = "flex";

    if (!handleKnownCommands(transcript)) {
        speak(`This is what I found on the internet regarding ${transcript}`);
        window.open(`https://www.google.com/search?q=${transcript}`, "_blank");
    }
};

recognition.onerror = (event) => {
    speak("I couldn't catch that. Please try again.");
};
