import "./index.css";

const API_KEY = process.env.API_KEY;
const submit = document.querySelector("#submit");
const img = document.querySelector('img');

submit.addEventListener('click', (e)=> {
    e.preventDefault();
    const search = document.querySelector("#search");
    const searchResult = search.value;
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(searchResult)}?unitGroup=us&include=days&key=${API_KEY}&contentType=json`)
    .then(function(response) {
        console.log(response.status);
        return response.json();
    })
    .then(data => console.log(data))
    .catch(function(error) {
        console.error(error)
    });
});
