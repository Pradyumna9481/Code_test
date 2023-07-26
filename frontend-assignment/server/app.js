// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', async (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    try{
        const data = req.body.data;   //assuming clients are sending the data
        const weatherAPIUrl = 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly/${data}';
        
        const res = await axios.get(weatherAPIUrl);
        const weatherData = res.data;

        res.sendStatus(200).json(weatherData);
    }catch (error){
        console.error("Error in waether report:", error);
        res.status(500).json({error:"Failed to fetch weather data"});
    }   
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));