// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Setting up middleware
const bodyParser = require('body-parser');


// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Callback function to complete GET '/getWeatherData'
app.get('/getWeatherData', (_req, res) => res.send(projectData));


// POST route
app.post('/addWeatherData', addWeatherEntry)

function addWeatherEntry(request, response) {
    projectData.date = request.body.date;
    projectData.temperature = request.body.temperature;
    projectData.user_response = request.body.user_response;
    // projectData = [...request.body]
    // response.send();
    response.end();
    console.log(projectData);
}


// Setup Server
const port_id = 8008;
app.listen(port_id, () => console.log(`running on localhost: ${port_id}`));