
let box = document.querySelector(".box");
let btn = document.querySelector("button");

const speakFunc = (input) => {
    let speakInput = new SpeechSynthesisUtterance(input);
    speakInput.rate = 1;
    speakInput.pitch = 1;
    speakInput.volume = 1;
    speakInput.lang = 'en-US'; // Correct language code
    window.speechSynthesis.speak(speakInput);
}

window.onload = () => {
    greetingFunc();
}

const greetingFunc = () => {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 0 && hour < 12) {
        speakFunc("Good Morning Sir, Can I Help You.");
    } else if (hour >= 12 && hour < 16) {
        speakFunc("Good Afternoon Sir, Can I Help You.");
    } else {
        speakFunc("Good Evening Sir, Can I Help You!");
    }
}

const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
        let recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onresult = (e) => {
            let spokenText = e.results[0][0].transcript;
            handleCommands(spokenText.toLowerCase());
            box.classList.remove("btn-box"); // No dot here
            btn.innerHTML = `<i class="fa-solid fa-microphone-lines-slash"></i>`;
        }
        recognition.start();
    } else {
        alert("Your Browser does not support voice input!");
    }
}

btn.onclick = () => { 
    box.classList.add("btn-box");
    btn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`;
    startVoiceInput();
}

const handleCommands = (command) => {
    if (command.includes("hello") || command.includes("hey") || command.includes("hi")) {
        speakFunc("Hello sir, How Can I Help You!");
    } else if (command.includes("who are you") || command.includes("developed") || command.includes("who are you")) {
        speakFunc("I am a Virtual Assistant, Developed By Ramkumar Lodhi!");
    } else if (command.includes("open iamrklodhi youtube channel") || command.includes("website")) {
        speakFunc("Opening... iamrklodhi YouTube channel!");
        window.open("https://www.youtube.com/@iamrklodhi");
    } else if (command.includes("open iamrklodhi website")) {
        speakFunc("Opening... iamrklodhi website!");
        window.open("https://www.iamrklodhi.in");
    } else if (command.includes("calculator") || command.includes("cal")) {
        speakFunc("Opening... calculator!");
        window.open("calculator://");
    } else if (command.includes("tell me time") || command.includes("time")) {
        let time = new Date().toLocaleTimeString();
        speakFunc("The time is " + time);
    } else if (command.includes("tell me date") || command.includes("date")) {
        let date = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
        speakFunc("Today is " + date);
    } else if (command.includes("open google") || command.includes("google")) {
        speakFunc("Opening... Google!");
        window.open("https://www.google.com");
    } else {
        speakFunc(`This is what I found on the internet regarding ${command}`);
        window.open(`https://www.google.com/search?q=${command}`);
    }
}
