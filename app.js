const apikey="98aa696733fd096b7765cddfd7282f1e";
const form=document.querySelector("form");

form.addEventListener('submit',function(e){
    e.preventDefault();
    const cityName=document.getElementById('city-name').value;
    // console.log(cityName);
    cityName.value=
    getWeatherData(cityName);
})

async function getWeatherData(cityName){
    try{
    let url=`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apikey}`;
        // console.log(url);
    const response=await fetch(url);
    const data=await response.json();
    showweatherInfo(data);
    }catch(err){
        alert(`sorry! city name is not in my database`);

    }
}
function showweatherInfo(data){
    console.log(data);
    const weatherInfo=document.getElementById('weather-info');
    let imgIcon="http://openweathermap.org/img/w/"+data.weather[0].icon+'.png';
    weatherInfo.innerHTML=`
    <h2>Countrycode:${data.sys.country}</h2>
    <h3>CityName:${data.name}</h3>
    <p>Temperature:${data.main.temp}F|${Math.round(data.main.temp-273.14)}&degC
   <p>Humidity:${data.main.humidity}%</p>
   <p>Air pressure:${data.main.pressure}hps</p>
   <p>Weather:${data.weather[0].description}<img src=${imgIcon} height=30 width=60</p>
   <p>wind speed:${data.wind.speed}m/s</p>
     `;
}
function SpeechToText(){
    var cityName =document.getElementById("city-name");
    var msg =document.getElementById("msg");
    if(SpeechRecognition||webkitSpeechRecognition)
    {
        var SpeechRecognition=SpeechRecognition||webkitSpeechRecognition;

        var recognition=new SpeechRecognition();

        recognition.onstart=function(){
            msg.innerHTML="<b>I am Listtenting U,Please speak City Name..</b>";
        };

        recognition.continuous=true;

        recognition.onspeechend=function(){
            msg.innerHTML="<b>I Stopped Listening ,Hope You speak Something..</b>";
            recognition.stop();
        };
        recognition.onerror=function(event){
            msg.innerHTML="<b>Error Occurred in Recognition:"+event.error+"</b>";
        };
        recognition.onresult=function(event){
            var text =event.results[0][0].transcript;
            var accuracy =event.results[0][0].confidence;
            output.innerHTML="<b> You speak: </b>"+ text ;
            // cityName.innerHTML=text;
            document.getElementById('city-name').value=text;
            };

            recognition.start();
    
        }else{
        alert("Sorry! Browser can't Supported...");
    }
}