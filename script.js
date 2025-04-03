// Get the audio elements
let audio = document.getElementById('butterflyKiss');
let alarmSound = document.getElementById('alarmSound');

// Start the Butterfly Kiss audio immediately on page load, muted to bypass autoplay restrictions
audio.play();

// Unmute after a short delay (1 second) to comply with browser policies
setTimeout(() => {
    audio.muted = false;  // Unmute the Butterfly Kiss audio
}, 1000);  // Delay of 1000ms = 1 second

// Timer function to start the timer based on the selected egg time
function startTimer(minutes) {
    console.log(`Starting timer for ${minutes} minutes`); // Log to confirm function is triggered
    localStorage.setItem("timerDuration", minutes * 60); // Save time in seconds
    window.location.href = "timer.html"; // Redirect to the timer page
}

// Timer logic
let timeLeft = parseInt(localStorage.getItem("timerDuration") || 0);
let interval;

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer").innerText = 
        String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');

    if (timeLeft > 0) {
        timeLeft--;
        localStorage.setItem("timerDuration", timeLeft);
    } else {
        clearInterval(interval);
        document.getElementById("timeUpButtons").style.display = "block";
        alarmSound.loop = true;  // Loop the alarm sound
        alarmSound.play(); // Play the alarm sound
        audio.muted = true;  // Mute the Butterfly Kiss audio when alarm sound starts
    }
}

if (window.location.pathname.includes("timer.html")) {
    if (timeLeft > 0) {
        interval = setInterval(updateTimer, 1000);
        updateTimer(); // Initialize the timer display immediately
    }
}

// Snooze & Close functions
function snoozeTimer() {
    timeLeft += 60; // Add 1 minute
    localStorage.setItem("timerDuration", timeLeft);
    document.getElementById("timeUpButtons").style.display = "none";
    interval = setInterval(updateTimer, 1000);
    alarmSound.loop = false; // Stop the alarm sound loop
    alarmSound.pause(); // Pause the alarm sound
    alarmSound.currentTime = 0; // Reset the sound to the beginning
    audio.muted = false; // Unmute the Butterfly Kiss audio when snooze is pressed
}

function closePage() {
    alarmSound.loop = false; // Stop the alarm sound loop
    alarmSound.pause(); // Pause the alarm sound
    alarmSound.currentTime = 0; // Reset the sound to the beginning
    audio.muted = false; // Unmute the Butterfly Kiss audio when closing the page
    window.close();
}
