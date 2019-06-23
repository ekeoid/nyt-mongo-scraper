# New York Times Mongo Scraper
Unit 18 Homework - Mongo DB


## Overview
In this assignment, a web app lets users view and leave comments on the latest news. These articles are sourced from New York Times and using packages like `Mongoose` and `Cheerio` to scrape news from another site and placing it on this site allow low level curation.

You can visit the application here: [Heroku App Deployment](https://frozen-spire-72759.herokuapp.com/)

You can find the instructions for this assignment here: [homework-instructions.md](https://github.com/ekeoid/UNC-Bootcamp-2019-Class/blob/master/01-Class-Content/18-mongo-mongoose/02-Homework/Instructions/homework_instructions.md)

## Technologies Used

- Node.JS [`runtime`](https://nodejs.org/en/docs/)
- express [`npm-package`](https://www.npmjs.com/package/express)
- express-handlebars [`npm-package`](https://www.npmjs.com/package/express-handlebars)
- mongoose [`npm-package`](https://www.npmjs.com/package/mongoose)
- cheerio [`npm-package`](https://www.npmjs.com/package/cheerio)
- axios [`npm-package`](https://www.npmjs.com/package/axios)
- jQuery [`library`](https://api.jquery.com/)
- Bootstrap [`framework`](https://getbootstrap.com/docs/4.3/getting-started/introduction/)

## Features

- **Feature 1**
  1. Note deletion, deletes throughout both collection (Articles + Notes). However did not explore article deletion to chain delete notes.


## Usage
- Click "Scrape".
- Save articles.
- Make notes.
- Delete notes.
- Delete Articles.

## Design

## Challenges
- Post and Put do not send response to refresh page. Even when adding redirects, refreshed, the content would not update. Had to use frontend page reload.


