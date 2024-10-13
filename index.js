// Elements
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const time = document.querySelector("#time");
const msgs = document.querySelector(".messages");

let openedTabs = []; // Keep track of opened tabs

// Time setup function
function setupTime() {
  setInterval(() => {
    let date = new Date();
    let hrs = String(date.getHours()).padStart(2, '0');
    let mins = String(date.getMinutes()).padStart(2, '0');
    let secs = String(date.getSeconds()).padStart(2, '0');
    time.textContent = `${hrs} : ${mins} : ${secs}`;
  }, 1000);
}

// Speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;

recognition.onresult = function (event) {
  let baseTrans = event.resultIndex;
  let transcript = event.results[baseTrans][0].transcript.toLowerCase();
  console.log(`my words: ${transcript}`);
  createMsg("usermsg", transcript);

  handleCommands(transcript); // Call function to handle commands
};

// Moved outside of onresult to avoid conflicts
recognition.onend = function () {
  console.log("Recognition ended, restarting...");
  recognition.start(); // Restart recognition automatically after it ends
};

// Handle different commands
function handleCommands(transcript) {
  if (transcript.includes("open youtube")) {
    readOut("Opening YouTube.");
    setTimeout(() => {
      openNewTab("https://www.youtube.com/");
    }, 500); // Delay by 0.5 seconds
  }

  if (transcript.includes("open google")) {
    readOut("Opening Google.");
    setTimeout(() => {
      openNewTab("https://www.google.com/");
    }, 1000); // Delay by 1 second
  }

  if (transcript.includes("show my task")) {
    readOut("Here is your task.");
    setTimeout(() => {
      openNewTab("https://moodle.myfssa.in/my/courses.php");
    }, 1500); // Delay by 1.5 seconds
  }
  
  // More commands can go here
}

// Function to open a new tab
function openNewTab(url) {
  let newTab = window.open(url, "_blank");
  openedTabs.push(newTab); // Keep track of opened tabs
  if (!newTab) {
    readOut("Unable to open tab. Please allow pop-ups in your browser.");
  }
}

// Function to create a message in the chat
function createMsg(who, msg) {
  let newmsg = document.createElement("p");
  newmsg.innerText = msg;
  newmsg.setAttribute("class", who);
  
  if (who === "usermsg") {
    newmsg.classList.add("user-msg");
  } else {
    newmsg.classList.add("assistant-msg");
  }

  msgs.appendChild(newmsg);
}

// Voice Setup function
function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  const allVoices = speechSynthesis.getVoices();
  
  if (allVoices.length > 7) {
    speech.voice = allVoices[7]; // Check if the index is valid
  } else if (allVoices.length > 0) {
    speech.voice = allVoices[0]; // Use the first available voice
  }
  
  speech.text = message;
  speech.volume = 1; // Adjust volume if needed
  window.speechSynthesis.speak(speech);
  createMsg("assistantmsg", message); // Create message in chat
}

// Button event listeners
startBtn.addEventListener("click", () => {
  console.log("Starting recognition...");
  recognition.start();
});

stopBtn.addEventListener("click", () => {
  console.log("Stopping recognition...");
  recognition.stop();
});

// On page load, start time updates
window.addEventListener('load', () => {
  setupTime(); // Start time update
  
  // Delay readOut to allow voices to load, or skip it
  setTimeout(() => {
    if (speechSynthesis.getVoices().length > 0) {
      readOut(" ");
    }
  }, 500); // Adjust delay as needed
});
