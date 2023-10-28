//import express
const express = require('express');

//setting up express to create an app
const app = express();
//configure to parse requests with JSON payloads
app.use(express.json());

//sets initial port
const PORT = process.env.PORT || 3000;
//starts server to begin listening
app.listen(PORT, () => {
    console.log("Now listening on localhost:3000", PORT);
});