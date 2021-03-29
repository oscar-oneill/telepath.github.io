'use strict'
const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const snoowrap = require("snoowrap");
const { toJson, Subreddit } = require("snoowrap");

const app = express();
const port = process.env.PORT || 9000;
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.json());

var otherRequester = new snoowrap({
  userAgent: process.env.userAgent,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  username: process.env.username,
  password: process.env.password,
});

// Landing Page Data Stream
app.get('/data', async (req, res) => {
    await otherRequester.getSubreddit("all").getHot({ limit: 35 })
    .then(toJson)
    .then(json => {
        res.status(200).send(json)
    })
     .catch((err) => {
        console.log('An error has occurred:', err);
        res.status(500).send({"message:": err})
    })   
});

// Subreddit
app.get('/subreddit/:subreddit', (req, res) => {
    res.status(200).sendFile(__dirname + "/public/subreddit.html")
});

app.post('/subreddit', (req, res) => {
    const subreddit = req.body.queryString.pathname.toString();
    const sub = subreddit.slice(11);

    otherRequester.getSubreddit(sub).getNew({ limit: 35 })
    .then(toJson)
    .then(json => { 
        res.status(200).send(json)
    })
    .catch((err) => {
        console.log('An error occurred: ', err);
        res.status(500).send({"message: ": err})
    })
});

// Reddit User
app.get('/user/:username', (req, res) => {
    res.status(200).sendFile(__dirname + "/public/users.html")
});

app.post('/redditor', (req, res) => {
    const username = req.body.queryString.pathname.toString();
    const user = username.slice(6);
    console.log(user);

    otherRequester.getUser(user).getSubmissions({ limit: 35 })
    .then(toJson)
    .then(json => { 
        res.status(200).send(json)
    })
    .catch((err) => {
        console.log('An error occurred: ', err);
        res.status(500).send({"message: ": err})
    })
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});