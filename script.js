const searchBtn=document.getElementById("searchBtn");
const cityInput=document.getElementById("cityInput");
const weatherCard=document.getElementById("weatherCard");
const cityName=document.getElementById("cityName");
const temperature=document.getElementById("temperature");
const humidity=document.getElementById("humidity");
const wind=document.getElementById("wind");
const description=document.getElementById("description");
const errorDiv=document.getElementById("error");
const loading=document.getElementById("loading");
const BASE_URL="https://wttr.in";
async function getWeather(city){
try{
loading.classList.remove("hidden");
weatherCard.classList.add("hidden");
errorDiv.classList.add("hidden");
const response=await fetch(`${BASE_URL}/${city}?format=j1`);
if(!response.ok) throw new Error("Failed to fetch weather data");
const data=await response.json();
const current=data.current_condition[0];
cityName.textContent=city.toUpperCase();
temperature.textContent=`🌡 Temperature: ${current.temp_C} °C`;
humidity.textContent=`💧 Humidity: ${current.humidity}%`;
wind.textContent=`💨 Wind Speed: ${current.windspeedKmph} km/h`;
description.textContent=`☁ Condition: ${current.weatherDesc[0].value}`;
weatherCard.classList.remove("hidden");
}catch(error){
errorDiv.textContent=error.message;
errorDiv.classList.remove("hidden");
}finally{
loading.classList.add("hidden");
}}
searchBtn.addEventListener("click",()=>{
const city=cityInput.value.trim();
if(city===""){errorDiv.textContent="Please enter a city name";errorDiv.classList.remove("hidden");return;}
getWeather(city);
});
cityInput.addEventListener("keypress",(e)=>{if(e.key==="Enter")searchBtn.click();});