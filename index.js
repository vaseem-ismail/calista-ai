// Elements
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const time = document.querySelector("#time");
const msgs = document.querySelector(".messages");

let openedTab; // Variable to store the reference to the opened tab

// Weather function
function weather(location) {
  const weatherCont = document.querySelector(".temp").querySelectorAll("*");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      weatherCont[0].textContent = `Location: ${data.name}`;
      weatherCont[1].textContent = `Country: ${data.sys.country}`;
      weatherCont[2].textContent = `Weather type: ${data.weather[0].main}`;
      weatherCont[3].textContent = `Weather description: ${data.weather[0].description}`;
      weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherCont[5].textContent = `Original Temperature: ${ktc(data.main.temp)}`;
      weatherCont[6].textContent = `Feels like: ${ktc(data.main.feels_like)}`;
      weatherCont[7].textContent = `Min temperature: ${ktc(data.main.temp_min)}`;
      weatherCont[8].textContent = `Max temperature: ${ktc(data.main.temp_max)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };
  xhr.send();
}

weather("Chennai"); // Calling weather function

// Kelvin to Celsius conversion function
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}

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

  // Check and respond to commands
  handleCommands(transcript);

  recognition.onend = function () {
    console.log("Recognition ended, restarting...");
    recognition.start(); // Restart recognition automatically after it ends
  };
};

// Function to handle voice commands
function handleCommands(transcript) {
  // Friendly commands
  if (transcript.includes("hey what is your name") || transcript.includes("tell about yourself")) {
    readOut("I am Calista, created to help the user on the web.");
  }
  if (transcript.includes("hi p a") || transcript.includes("calista")) {
    readOut("Hi sir, I am here. Please give me a task.");
  }
  if (transcript.includes("who is teena morin") || transcript.includes("who is onee-san") || transcript.includes("who is teens")) {
    readOut("Teena Morin is a batch 4 student in FSSA. She likes anime a lot, particularly she is a fan of Ryomen Sukuna and Satoru Gojo.");
  }
  if (transcript.includes("how are you") || transcript.includes("about your health")) {
    readOut("I am fine. How about you, Mohamed?");
  }
  if (transcript.includes("the moon is lovely isn't it")) {
    readOut("Brother, I already have a lover.");
  }
  if (transcript.includes("i am in a bad mood")) {
    readOut("What happened today?");
  }
  if (transcript.includes("no it's not today")) {
    readOut("What happened?");
  }

  // App launching logic with single-tab reuse
  if (transcript.includes("take the nap") || transcript.includes("sleep")) {
    readOut("Taking a nap and mic off.");
    recognition.stop();
  }
  if (transcript.includes("hey calista") || transcript.includes("hey cals")) {
    readOut("Hi sir, I am here. Please give me a task.");
    recognition.start(); // Start the speech recognition on "Hey Calista"
  }

  // Opening URLs with tab reuse
  if (transcript.includes("show my task") || transcript.includes("open my task")) {
    readOut("Here is your task.");
    window.open("https://moodle.myfssa.in/my/courses.php")||openOrReuseTab("https://moodle.myfssa.in/my/courses.php");
  }
  if (transcript.includes("open youtube") || transcript.includes("start youtube")) {
    readOut("Starting YouTube.");
    window.open("https://www.youtube.com/")||openOrReuseTab("https://www.youtube.com/");
  }
  if (transcript.includes("open google")) {
    readOut("Starting Google.");
    window.open("https://www.google.com/")||openOrReuseTab("https://www.google.com/");
  }
  if (transcript.includes("open telegram")) {
    readOut("Starting Telegram.");
    window.open("https://web.telegram.org/k/")||openOrReuseTab("https://web.telegram.org/k/");
  }
  // Time check command
if (transcript.includes("what is the time now") || transcript.includes("tell me the time")) {
  let date = new Date();
  let currentTime = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
  readOut(`The current time is ${currentTime}`);
}
  if (transcript.includes("play moondiety") || transcript.includes("play moon diety")) {
    readOut("Playing Interworld Moondiety.");
    window.open("https://www.youtube.com/watch?v=r02oOsAxuFI")||openOrReuseTab("https://www.youtube.com/watch?v=r02oOsAxuFI");
  }
  if (transcript.includes("play interworld") || transcript.includes("play inter world")) {
    readOut("Got it.");
    window.open("https://www.youtube.com/watch?v=lJvRohYSrZM&list=RDEM1VCZpNibN7kC5N1lwsCe-A&start_radio=1")||openOrReuseTab("https://www.youtube.com/watch?v=lJvRohYSrZM&list=RDEM1VCZpNibN7kC5N1lwsCe-A&start_radio=1");
  }
}

// Function to open or reuse the same tab
function openOrReuseTab(url) {
  if (!openedTab || openedTab.closed) {
    // If no tab is opened or the previous tab is closed, open a new one
    openedTab = window.open(url, "_blank");
  } else {
    // Reuse the same tab
    openedTab.location.href = url;
    openedTab.focus();
  }
}

// Function to create a message in the chat
function createMsg(who, msg) {
  let newmsg = document.createElement("p");
  newmsg.innerText = msg;
  newmsg.setAttribute("class", who);
  msgs.appendChild(newmsg);
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

// Voice Setup function
function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  const allVoices = speechSynthesis.getVoices();
  speech.voice = allVoices[7]; // Adjust this index based on your available voices
  speech.text = message;
  speech.volume = 1; // Adjust volume if needed
  window.speechSynthesis.speak(speech);
  createMsg("jmsg", message); // Create message in chat
}

// On page load, start time updates and initialize other functions
window.addEventListener('load', () => {
  setupTime(); // Start time update
  readOut(" "); // Avoid default voice on load
});


// Creating chatting pad with alignment
function createMsg(who, msg) {
  let newmsg = document.createElement("p");
  newmsg.innerText = msg;
  newmsg.setAttribute("class", who);
  
  // Apply different classes based on who the message is from
  if (who === "usermsg") {
    newmsg.classList.add("user-msg"); // Class for user messages (align right)
  } else {
    newmsg.classList.add("assistant-msg"); // Class for assistant messages (align left)
  }

  msgs.appendChild(newmsg);
}

// Modify the `readOut` function to also create a message
function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  const allVoices = speechSynthesis.getVoices();
  speech.voice = allVoices[7]; // Adjust this index based on your available voices
  speech.text = message;
  speech.volume = 1; // Adjust volume if needed
  window.speechSynthesis.speak(speech);
  createMsg("assistantmsg", message); // Create message for assistant
}

// Speech recognition setup
recognition.onresult = function (event) {
  let baseTrans = event.resultIndex;
  let transcript = event.results[baseTrans][0].transcript.toLowerCase();
  console.log(`my words: ${transcript}`);
  createMsg("usermsg", transcript); 
}