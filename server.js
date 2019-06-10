const express = require("express");
const logger = require("morgan");

//const mongoose = require("mongoose");
//const mongojs = require("mongojs");
//const axios = require("axios");
//const cheerio = require("cheerio");

// const expressHandlebars = require("express-handlebars");
// const router = express.Router();
//app.engine("handlebars", expressHandlebars({
//    defaultLayout: "main"
//}));
//app.set("view engine", "handlebars");

var app = express();
const PORT = process.env.PORT || 3000;

// and uncolored for all other codes.
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Database configuration


// Hook mongojs config to db variable


// Log any mongojs errors to console

// Routes
//const htmlRoutes = require("./routes/html-routes");
//app.use(htmlRoutes);

app.get("/", function(req, res) {
    res.send("Hello world");
});

// Start the app server
app.listen(PORT, function() {
    let message = "\n";

    message += "App listening on: ";
    message += "\x1b[0m\x1b[36m" + "http://localhost:";
    message += "\x1b[1m\x1b[36m" + PORT;
    message += "\x1b[0m";

    console.log(message);
});
