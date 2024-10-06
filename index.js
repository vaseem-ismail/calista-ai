//Elements
const startBtn = document.querySelector("#start");//working
const stopBtn = document.querySelector("#stop");//working
// const speakBtn = document.querySelector("#speak");//working
const time = document.querySelector("#time");
//setting start button 
document.querySelector("#start").addEventListener("click", () => {
  recognition.start();
})

//Weather
// show waether   //this is the code for accurate whether whereever we go
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
      weatherCont[5].textContent = `Original Temperature : ${ktc(
        data.main.temp
      )}`;
      weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
      weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
      weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
      weatherStatement = `sir the weather in ${data.name} is ${data.weather[0].description
        } and the temperature feels like ${ktc(data.main.feels_like)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };

  xhr.send();
}


// weather("Chennai");
weather("Chennai");

//kelvin to celcius
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}


//Creating autocalista() fn
function autoCalista() {
  setTimeout(() => {
    recognition.start();
  }, 1000)
}



// Calista commands
let calistaComs = [];
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();
calistaComs.push();


// //Time Setup
// let date = new Date()
// let hrs = date.getHours()
// let mins = date.getMinutes()
// let secs = date.getSeconds();

//onload Window
 window.onload = () => {
  // time.textContent = `${hrs} : ${mins} : ${secs}`;
  setInterval(() => {
  let date = new Date()
  let hrs = date.getHours()
  let mins = date.getMinutes()
  let secs = date.getSeconds();
  time.textContent = `${hrs} : ${mins} : ${secs}`;
  }, 1000);

  //Calista commands setup
  calistaComs.forEach((e) => {
    document.querySelector("commands").innerHTML += `<p>#${e}</p><br\>`
  })
}
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
 
 
}

formatAMPM(date)
setInterval(() => {
  formatAMPM(date)
}, 60000);



//speech recognition setup        //working
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition()
//sr start   (start button works) //working
recognition.onstart = function () {
  console.log("vr active");
}

//sr result means response //it works in between start and stop  //working
recognition.onresult = function (event) {
  console.log(event);//It recognise voice make the condition true
  let baseTrans = event.resultIndex  //calling event result index
  let transcript = event.results[baseTrans][0].transcript;//Successfully declared transcript
  // console.log(transcript);//print what I spoke
  // readOut(transcript);//this is a test case that ai speeks

  transcript = transcript.toLowerCase();
  let userdata = localStorage.getItem("calista_setup");
  console.log(`my words:${transcript}`);


  //FRIENDLY COMMANDS

  if (transcript.includes("hay calista") || transcript.includes("hai calista") || transcript.includes("calista") || transcript.includes("gallista") || transcript.includes("hey cals") || transcript.includes("hey kels") || transcript.includes("hey girls")) {
    readOut("Hi sir I am here give a work");
    console.log("Hi sir I am here give a work");
  }
  if (transcript.includes("how are you")) {
    readOut("I am fine and I hope that you fine too");
  }



  //I need to add friendly commands




  if (transcript.includes("close this")) {
    readOut("closed")
    document.querySelector(".commands").style.display = "none"
    setup.style.display = "none"
  }
  if (transcript.includes("what are your commands") || transcript.includes("how can i talk with you") || transcript.includes("how to use you")) {
    readOut("these are the basic commands that I follow")
    document.querySelector(".commands").style.display = "block"
  }
  if (transcript.includes("youtube") || transcript.includes("you tube") || transcript.includes("u tube")) {
    readOut("opening youtube sir");
    window.open("https://www.youtube.com/");
  }
  if (transcript.includes("google") || transcript.includes("goo gle")) {
    readOut("opening google sir");
    window.open("https://www.google.com/")
  }
  if (transcript.includes(" github") || transcript.includes("git hub") || transcript.includes("github")) {
    readOut("opening github sir");
    window.open("https://github.com/");
  }

  //ChatGPT
  if (transcript.includes("chatgpt") || transcript.includes("chat gpt") || transcript.includes("open gpt")) {
    readOut("opening chatgpt sir");
    window.open("https://chatgpt.com/");
  }

  //firebase
  if (transcript.includes("firebase") || transcript.includes("fire base") || transcript.includes("fi re base")) {
    readOut("opening firebase");
    window.open("https://firebase.google.com/ ")
  }


  //google search
  if (transcript.includes("search for") || transcript.includes("find")) {
    readOut("here's the result sir")
    let input = transcript.split("");
    input.splice(0, 11);
    input.pop()
    input = input.join("").split(" ").join("+");
    console.log(input);
    window.open(`https://www.google.com/search?q=${input}`)
  }

  //Moodle Commands
  if (transcript.includes("open moodle")) {
    readOut("opening moodle sir")
    window.open("https://moodle.myfssa.in/my/courses.php")
  }
  //instagram commands
  if (transcript.includes("instagram")) {
    readOut("opening instagram sir")
    window.open("https://www.instagram.com/");
  }
  if (transcript.includes(" my telegram") || transcript.includes("my tele gram") || transcript.includes("tele gram")) {
    readOut("open your telegram sir")
    window.open("https://web.telegram.org/k/")
  }
  if (transcript.includes("i am in depression") || transcript.includes("stress")) {
    readOut("stay alone sir you might be recover,something that doesnot change by us so forgot about that be happy")
  }
  if (transcript.includes("calista take little nap") || (transcript.includes("take some nap"))) {
    readOut("sure taking nap sir")
  }
  if (transcript.includes("what are doing") || transcript.includes("what is your work")) {
    readOut("working an assistant for you mam")
  }
  if (transcript.includes("how old are you") || transcript.includes("what is your age") || transcript.includes("age details")) {
    readOut("i am sorry age details couldnot share with you")
  }
  if (transcript.includes("instagram web") || transcript.includes("open insta gram web") || transcript.includes("calista instagram web")) {
    readOut("opening instagram web sir")
    window.open(`https://www.instagram.com/${JSON.parse(userdata).instagram}`)
  }

}




//sr stop  (stop button works) //working
recognition.onend = function () {
  console.log("vr deactiate");
}

//It will make my start button for a long time  //working
//  recognition.continuous = true;


startBtn.addEventListener("click", () => {   //this code start recognizing voice when i click button
  recognition.start()
})
stopBtn.addEventListener("click", () => {    //this code stop recognizing voice when i click button
  recognition.stop()
})

//how Calista speek (output) //working
function readOut(message) {
  const speech = new SpeechSynthesisUtterance()

  //different voices  //working
  const allVoices = speechSynthesis.getVoices()
  speech.voice = allVoices[6];

  speech.text = message;
  speech.volume = 5;
  window.speechSynthesis.speak(speech)
  // console.log("speaking out");
}




//I want to skip change voice not def.voice //this is not important
//window.onload
window.onload = function () {
  readOut("   ");//it makes first voice spoke none(empty5)
}






// //sample speech     //working
// speakBtn.addEventListener("click",()=>{
//     readOut("hi my name is caelista, how can i help you sir");
// });