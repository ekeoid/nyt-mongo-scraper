const express = require("express");
const path = require("path");

const router = express.Router();


function _msg (req) {
    let message = "\n";
    let c = {
        blue_bg: "\x1b[44m",
        yellow_fg: "\x1b[33m",
        cyan_fg: "\x1b[36m",        
        bright: "\x1b[1m",
        default: "\x1b[0m"
    };

    message += c.default + "   " + c.blue_bg + " > " + c.bright + c.yellow_fg;
    message += req.method;
    message += " " + c.default + "  ";
    message += c.bright + c.cyan_fg;
    message += req.url;
    message += c.default + " ";
    
    return message;
}

// route is superceded by index.html in public from 
// app.use(express.static("public"));
router.get("/", function (req, res) {
    
    console.log(_msg(req), "Loading default home page");
    res.status(200).send("Hello World!");
    
});

module.exports = router;