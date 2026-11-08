import "./index.css";

const API_KEY = process.env.API_KEY;
const submit = document.querySelector("#submit");
const img = document.querySelector('img');

submit.addEventListener('click', async (e)=> {
    e.preventDefault();
    const search = document.querySelector("#search");
    const searchResult = search.value;
    const data = await getApiData(searchResult);
    if (data) displayWeather(data);
});

async function getApiData(searchResult) {
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(searchResult)}?unitGroup=us&include=days&key=${API_KEY}&contentType=json`);
        console.log(response.status);

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.error(error);
    }
}
function displayWeather(data) {
    const today = data.days[0];
    const weatherDiv = document.querySelector("#weather");
    // weatherDiv.replaceChildren();

    const card = document.createElement("div");
    card.classList.add("WeatherList");

    const Address = document.createElement("h1");
    Address.classList.add("spacing");
    Address.textContent = data.resolvedAddress;

    const Temp = document.createElement("p")
    Temp.classList.add("weatherInfo");
    Temp.textContent = `${today.temp}°F,`;

    const Conditions = document.createElement("p");
    Conditions.classList.add("weatherInfo");
    Conditions.textContent = today.conditions;

    const highLow = document.createElement("p")
    highLow.classList.add("weatherInfo");
    highLow.textContent = `High: ${today.tempmax}°F / Low: ${today.tempmin}°F`;

    card.append(Address,Temp,Conditions,highLow);
    weatherDiv.append(card);
}
