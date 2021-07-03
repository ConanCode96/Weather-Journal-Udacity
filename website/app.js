/* Global Variables */

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = 'b61e56e3da507411ef8cc97c1a7b51f5';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
console.log(newDate);

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', handleClickEvent);

function handleClickEvent(_e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeatherTemperature(BASE_URL, zipCode, API_KEY)
        .then((data) =>
            // Add data to POST request to "/addWeatherData" endpoint
            postData('/addWeatherData', { temperature: data.main.temp, date: newDate, user_response: feelings }))
        // Update the UI by fetching same data that's been POSTed earlier
        .then(() => updateUI())
        .catch(error => alert(error.message));
}

// Async GET
const getWeatherTemperature = async (baseURL, zipCode, api_key) => {
    const requestURL = baseURL + 'zip=' + zipCode + ',us' + '&' + 'appid=' + api_key
    console.log(requestURL)

    try{
        return await fetch(requestURL)
        .then(res => res.json())
        .catch(error => alert(error.message));
        // return await result;
    }
    catch(error){
        throw new Error(error.message);
    }
}

// Async POST
const postData = async (url = '', data = {}) => {
    try{
        const postRequest = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log(postRequest)
    }
    catch(error){
        throw new Error(error.message);
    }
}

// Update user interface by fetching data from the '/getWeatherData' endpoint
const updateUI = async () => {
    try {
        const response = await fetch('/getWeatherData');
        const resData = await response.json();
        console.log(resData)
        document.getElementById('date').innerHTML = `Date: ${resData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${resData.temperature}`;
        document.getElementById('content').innerHTML = `Content: ${resData.user_response}`;
        console.log('updated successfully!')
    }
    catch(error){
        throw new Error(error.message);
    }
}