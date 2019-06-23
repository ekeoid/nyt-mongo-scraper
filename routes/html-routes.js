const express = require("express");
const db = require("../models");

const cheerio = require("cheerio");
const axios = require("axios");
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
    // res.status(200).send("Hello World!");
    res.render("home", { body: "Welcome. Click scrape to get started."});
});

router.get("/scrape", function(req, res) {
    const URL = "https://www.nytimes.com";

    console.log(_msg(req), "Scraping: " + URL);

    axios.get(URL).then(function(response) {
    
        const $ = cheerio.load(response.data);
        const articles = [];

        $("article").each(function(i, element) {

            let result = {};    

            result.title = $(this)
                .find("h2")
                .text()
                .trim();
            result.link = $(this)
                .find("a")
                .attr("href") ?
                URL +
                $(this)
                    .find("a")
                    .attr("href")
                    .trim()
                : null;
            result.description = $(this)
                .find("p")
                .text() 
            || $(this)
                .find("li")
                .text()
                .trim();
            result.image = $(this)
                .find("img")
                .attr("src");

            if (result.title !== "") {
                articles.push(result);
            }
            
            
            // db.Article.create(result)
            //     .then(function(dbArticle) {
            //     console.log(dbArticle);
            // })
            // .catch(function(err) {
            //     console.log(err);
            // });
            
        });
        console.log("Scraping Complete");
        // console.log(articles);
        res.render("home", {articles});
        // res.redirect("/");
    });
});

router.get("/api", function(req, res) {
    console.log(_msg(req), "Querying database for all results");

    db.Article.find({})
        .then(function(dbArticles) {
            // res.render("api", {dbArticles: JSON.stringify(dbArticles, null, 2 )});
            res.json(dbArticles);
        })
        .catch(function(err) {
            res.json(err);
        });
});

router.get("/clearall", function(req, res) {
    console.log(_msg(req), "Clearing database");

    db.Article.deleteMany({}, function(error, articles) {

        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            
            db.Note.deleteMany({}, function(error, notes) {
                
                if (error) {
                    console.log(error);
                    res.send(error);
                }
                else {
                    console.log({articles, notes});
                    res.send({articles, notes});
                }
            });

        }
    });
});

//route to save an article
router.post("/save", function(req, res) {
    console.log(_msg(req), "Saving article");
    console.log(req.body);
    
    let newArticle = new db.Article(req.body);
    
    newArticle.save(function(error, doc) {

        if (error) {
            console.log(error);
        } else {
            res.send("Article has been saved: { _id: " + newArticle._id + " }");
        }
    })
});

//route to display articles
// This will get the articles we scraped from the mongoDB
router.get("/articles", function(req, res) {
    console.log(_msg(req), "Getting every saved article");
    
    db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
        // res.json(dbArticle);
        res.render("articles", {articles: dbArticle});
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
        res.json(err);
    });

});


// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", function(req, res) {
    console.log(_msg(req), "Getting article _id: " + req.params.id);
    
    db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
    })
    .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
router.post("/articles/:id", function(req, res) {
    console.log(_msg(req), "Updating article _id: " + req.params.id);

    db.Note.create(req.body)
    .then(function(dbNote) {
        console.log({ note: dbNote });
        return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push: {note: dbNote._id }}, { new: true });
    })
    .then(function(dbArticle) {
        console.log({ article: dbArticle });
        // res.json(dbArticle);
        // res.redirect(req.get('referer'));
        db.Article.find({})
            .then(function(dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
                // res.json(dbArticle);
                res.render("articles", {articles: dbArticle});
            })
            .catch(function(err) {
            // If an error occurred, send it to the client
                res.json(err);
            });
    })
    .catch(function(err) {
        console.log(err);
        res.json(err);
    });
});

// Route for deleting a saved Article
router.post("/delete/:id", function(req,res) {
    console.log(_msg(req), "Deleting article _id: " + req.params.id);

    db.Article.deleteOne({ _id: req.params.id })
    .then(function(dbArticle) {
        console.log({ article: dbArticle });
        // res.json(dbArticle);
        console.log("trying to redirect");
        res.redirect("/articles");
    })
    .catch(function(err) {
        console.log(err);
        res.json(err);
    });
});

// Route for deleting note by id
// db.getCollection('articles')
//  .update({ note: ObjectId("5d0ab37ebdef5644ec1c2d5f")}, {$pull: { note: ObjectId("5d0ab37ebdef5644ec1c2d5f") }})
router.put("/notes/:id", function (req, res) {
    console.log(_msg(req), "Deleting note _id: " + req.params.id);

    db.Note.deleteOne({ _id: req.params.id })
        .then(function(dbNote) {
            console.log({ note: dbNote });
            return db.Article.updateOne({ note: req.params.id }, {$pull: { note: req.params.id }}, { new: true });        
        })
        .then(function(dbArticle) {
            console.log({ article: dbArticle });
            res.json(dbArticle);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });

});


module.exports = router;