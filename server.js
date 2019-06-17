const express = require("express");
const exphbs  = require("express-handlebars");

const mongoose = require("mongoose");

//const mongojs = require("mongojs");
//const axios = require("axios");
//const cheerio = require("cheerio");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Database configuration
// const db = require("./models");

// Handlebar configuration
app.engine(".hbs", exphbs({ 
    defaultLayout: "main",
    extname: ".hbs"
}));
app.set("view engine", ".hbs");

// Connect to the Mongo DB
const MONGODB = process.env.MONGODB_URI || "mongodb://localhost/nytscraper";
mongoose.connect(MONGODB, { 
    useNewUrlParser: true,
    useFindAndModify: false
});
const db = mongoose.connection;

// Log any mongojs errors to console
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Routes
const htmlRoutes = require("./routes/html-routes");
app.use(htmlRoutes);


// If mongoose connection successful, start the app server
db.once("open", function() {
    console.log("Acquired mongoose db link");

    app.listen(PORT, function() {
        let message = "\n";
        
        message += "App listening on: ";
        message += "\x1b[0m\x1b[36m" + "http://localhost:";
        message += "\x1b[1m\x1b[36m" + PORT;
        message += "\x1b[0m";
        
        console.log(message);
    });
});
    