//Elements
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const time = document.querySelector("#time");

//Weather
function weather(location) {
  const weatherCont = document.querySelector(".temp").querySelectorAll("*");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      weatherCont[0].textContent = `Location : ${data.name}`;
      weatherCont[1].textContent = `Country : ${data.sys.country}`;
      weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
      weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
      weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherCont[5].textContent = `Original Temperature : ${ktc(data.main.temp)}`;
      weatherCont[6].textContent = `Feels like ${ktc(data.main.feels_like)}`;
      weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
      weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };
  xhr.send();
}

weather("Chennai");

//Kelvin to Celsius
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}

//Time Setup
window.onload = () => {
  setInterval(() => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    time.textContent = `${hrs} : ${mins} : ${secs}`;
  }, 1000);
};

//Speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Continuous listening
recognition.continuous = true;

// sr result means response
recognition.onresult = function (event) {
  let baseTrans = event.resultIndex;
  let transcript = event.results[baseTrans][0].transcript.toLowerCase();
  console.log(`my words: ${transcript}`);

  // Friendly commands
  if (transcript.includes("calista")) {
    readOut("Hi sir, I am here. Please give me a task.");
  }
  // Other commands...
};

// Start button works
startBtn.addEventListener("click", () => {
  console.log("Starting recognition...");
  recognition.start();
});

// Stop button works
stopBtn.addEventListener("click", () => {
  console.log("Stopping recognition...");
  recognition.stop();
});

// Readout function
function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  const allVoices = speechSynthesis.getVoices();
  speech.voice = allVoices[6]; // Adjust if needed
  speech.text = message;
  speech.volume = 1; // Adjust volume if too loud
  window.speechSynthesis.speak(speech);
}
