
// Elements
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const time = document.querySelector("#time");
const msgs = document.querySelector(".messages");


//Creating chatting pad
function createMsg(who, msg) {
  let newmsg = document.createElement("p")
  newmsg.innerText = msg;
  newmsg.setAttribute("class", who)
  msgs.appendChild(newmsg);
}

// Weather
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
  createMsg("usermsg", transcript)


  recognition.onend = function () {
    console.log("Recognition ended, restarting...");
    recognition.start(); // Restart recognition automatically after it ends
  };

  // Friendly commands
  if (transcript.includes("hey what is your name") || transcript.includes("tell about your self")) {
    readOut("I am Calista created to help the user in web");
  }
  if (transcript.includes("hi p a") || transcript.includes("calista")) {
    readOut("Hi sir, I am here. give me a task.");
  }
  if (transcript.includes("who is teena morin") || transcript.includes("who is onee-san") || transcript.includes("who is teens")) {
    readOut("Teena Morin is batch 4 student in F S S A. She likes anime a lot, particularly she is a fan of Ryomen Sukuna and Satoru Gojo");
  }
  if (transcript.includes("how are you") || transcript.includes("about your health")) {
    readOut("I am fine How about you Mohamed");
  }
  if (transcript.includes("the moon is lovely isn't it")) {
    readOut("Brother I already have lover");
  }
  if (transcript.includes("i am in bad mood")) {
    readOut("What happens today");
  }
  if (transcript.includes("no it's not today")) {
    readOut("What happens");
  }


  // App launching logic


  //ChatGPT
  if (transcript.includes("open chat g p t") || transcript.includes("start chat g p t")) {
    exec('start "" "C:\\Program Files\\ChatGPT"', (error, stdout, stderr) => {       //I want to add the correct path remember
      if (error) {
        console.error(`Error opening app: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`Standard Error: ${stderr}`);
        return;
      }
      console.log(`${stdout} opened successfully`);
      readOut("Starting ChatGPT");
    });
  }
  if (transcript.includes("take the nap") || transcript.includes("sleep")) {
    readOut("");
    recognition.stop();
  }
  // Start recognition when "Hey Calista" is heard
  if (transcript.includes("hey calista") || transcript.includes("hey cals")) {
    readOut("Hi sir, I am here. Please give me a task.");
    recognition.start(); // Start the speech recognition on "Hey Calista"
  }


  if (transcript.includes("show my task") || transcript.includes("open my task")) {
    readOut("Here is your task");
    window.open("https://moodle.myfssa.in/my/courses.php");
  }
  if (transcript.includes("open youtube") || transcript.includes("start youtube")) {
    readOut("Starting Youtube");
    window.open("https://www.youtube.com/");
  }
  if (transcript.includes("open google")) {
    readOut("Starting Google");
    window.open("https://www.google.com/")
  }
  if (transcript.includes("open telegram")) {
    readOut("Starting Telegram");
    window.open("https://www.telegram.com/")
  }
  if (transcript.includes("what is the time now") || transcript.includes("tell me the time")) {
    let currentTime = setupTime();
    readOut(`The current time is ${currentTime}`);
  }
};

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
  createMsg("jmsg")
}

// On page load, start time updates and initialize other functions
window.addEventListener('load', () => {
  setupTime(); // Start time update
  readOut(" "); // Avoid default voice on load
});
