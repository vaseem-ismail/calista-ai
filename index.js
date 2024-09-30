





//Elements
const startBtn = document.querySelector("#start");//working
const stopBtn = document.querySelector("#stop");//working
const speakBtn = document.querySelector("#speak");//working

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
        weatherStatement = `sir the weather in ${data.name} is ${
          data.weather[0].description
        } and the temperature feels like ${ktc(data.main.feels_like)}`;
      } else {
        weatherCont[0].textContent = "Weather Info Not Found";
      }
    };
  
    xhr.send();
  }



weather("chennai");
  
  //kelvin to celcius
  function ktc(k){
    k = k - 273.15;
    return k.toFixed(2);
  }



//speech recognition setup        //working
const SpeechRecognition = window.SpeechRecognition ||window.webkitSpeechRecognition;
const recognition = new SpeechRecognition()
//sr start   (start button works) //working
recognition.onstart = function(){
    console.log("vr active");
}

//sr result means response //it works in between start and stop  //working
recognition.onresult = function(event){
    console.log(event);//It recognise voice make the condition true
    let baseTrans = event.resultIndex  //calling event result index
    let transcript = event.results[baseTrans][0].transcript;//Successfully declared transcript
    // console.log(transcript);//print what I spoke
    // readOut(transcript);//this is a test case that ai speeks
    
    transcript = transcript.toLowerCase();
    let userdata = localStorage.getItem("calista_setup");
    console.log(`my words:${transcript}`);
   
    if(transcript.includes("hay calista")||transcript.includes("hai calista")||transcript.includes("calista")|| transcript.includes("gallista")||transcript.includes("hey cals")||transcript.includes("hey kels")||transcript.includes("hey girls")){
        readOut("Hi sir what do you want");
        console.log("Hi sir what do you want");
    } 
    if(transcript.includes("close this")){
      readOut("closed")
      document.querySelector(".commands").style.display = "none"
      setup.style.display = "none"
    }
    if(transcript.includes("what are your commands")||transcript.includes("how can i talk with you")|| transcript.includes("how to use you")){
      readOut("these are the basic commands that I follow")
      document.querySelector(".commands").style.display = "block"
    }  
    if(transcript.includes("youtube")||transcript.includes("you tube")||transcript.includes("u tube")){
        readOut("opening youtube sir");
        window.open("https://www.youtube.com/");
    }
    if(transcript.includes("open google")||transcript.includes("google")){
        readOut("opening google sir");
        window.open("https://www.google.com/")
    }
    if(transcript.includes(" github") || transcript.includes(" git hub")||transcript.includes("github")){
        readOut("opening github sir");
        window.open("https://github.com/");
    }

    //google search
    if(transcript.includes("search for") || transcript.includes("find")){
        readOut("here's the result sir")
        let input = transcript.split("");
        input.splice(0,11);
        input.pop()
        input = input.join("").split(" ").join("+");
        console.log(input);
        window.open(`https://www.google.com/search?q=${input}`)
    }
    //instagram commands
  
    if(transcript.includes("instagram")){  //want to test remember////////
      readOut("opening instagram sir")
      WshShell = new ActiveXObject("instagram://");
      WshShell.Run("instagram://")||window.opem("https://www.instagram.com/")||window.start ("explorer.exe instagram://");
    }
    // if(transcript.includes("telegram")||transcript.includes(" tele gram")||transcript.includes("telegram")){
    //   readOut("ing telegram sir")
    //   window.("https://web.telegram.org/")
    // }
    if(transcript.includes("open my telegram")||transcript.includes("open my tele gram")||transcript.includes("my telegram")){
      readOut("open your telegram sir")
      window.open("https://web.telegram.org/k/")
    }
    if(transcript.includes("i am in depression")||transcript.includes("i am depressed")){
      readOut("stay alone sir you might be recover,something that doesnot change by us so forgot about that be happy")
    }
    if(transcript.includes("calista take little nap")||(transcript.includes("take some nap"))){
      readOut("sure taking nap sir")
    }
    if(transcript.includes("what are doing")||transcript.includes("what is your work")){
      readOut("working an assistant for you mam")
    }
    if(transcript.includes("how old are you")||transcript.includes("what is your age")||transcript.includes("age details")){
      readOut("i am sorry age details couldnot share with you")
    }
    if(transcript.includes("instagram web")||transcript.includes("open insta gram web")||transcript.includes("calista instagram web")){
      readOut("opening instagram web sir")
      window.open(`https://www.instagram.com/${JSON.parse(userdata).instagram}`)
    }
    // if(transcript.includes("i want to see the location in")||transcript.includes("show me the location of")){
    //  readOut("finding sir,...here it is")
    //  console.log(pop(transcript));
    //     function wantToSee(location) {
    //         const weatherCont = document.querySelector(".loc").querySelectorAll("*");
          
    //         let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
    //         const xhr = new XMLHttpRequest();
    //         xhr.open("GET", url, true);
    //         xhr.onload = function () {
    //           if (this.status === 200) {
    //             let data = JSON.parse(this.responseText);
    //             weatherCont[0].textContent = `Location : ${data.name}`;
    //             weatherCont[1].textContent = `Country : ${data.sys.country}`;
    //             weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
    //             weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
    //             weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    //             weatherCont[5].textContent = `Original Temperature : ${ktc(
    //               data.main.temp
    //             )}`;
    //             weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
    //             weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
    //             weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
    //             weatherStatement = `sir the weather in ${data.name} is ${
    //               data.weather[0].description
    //             } and the temperature feels like ${ktc(data.main.feels_like)}`;
    //           } else {
    //             weatherCont[0].textContent = "Weather Info Not Found";
    //           }
    //         };
          
    //         xhr.send();
    //       };
     
    //   wantToSee(`${pop(transcript)}`);
    // }

}




//sr stop  (stop button works) //working
recognition.onend = function(){
    console.log("vr deactiate");
}

//It will make my start button for a long time  //working
 recognition.continuous = true;


startBtn.addEventListener("click",()=>{   //this code start recognizing voice when i click button
    recognition.start()
})
stopBtn.addEventListener("click",()=>{    //this code stop recognizing voice when i click button
    recognition.stop()
})

//how Calista speek (output) //working
function readOut(message){
    const speech = new SpeechSynthesisUtterance()

    //different voices  //working
    const allVoices = speechSynthesis.getVoices()
    speech.voice = allVoices[84];

    speech.text = message;
    speech.volume = 5;
    window.speechSynthesis.speak(speech)
    // console.log("speaking out");
}




//I want to skip change voice not def.voice //this is not important
//window.onload
window.onload = function (){
    readOut("   ");//it makes first voice spoke none(empty5)
}






// //sample speech     //working
// speakBtn.addEventListener("click",()=>{
//     readOut("hi my name is caelista, how can i help you sir");
// });