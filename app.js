const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

let entries = [];
app.locals.entries = entries;

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/new-entry", function(req, res) {
    res.render("new-entry");
});

app.post("/new-entry", function(req, res) {
    if(!req.body.title || !req.body.body) {
        res.status(400).send("Title and Body needed");
    }
    entries.push({
        title: req.body.title,
        body: req.body.body,
        published: new Date()
    });
    res.redirect("/");
});

app.use(function(req, res) {
    res.status(404).render("404");
});

app.listen(3000, function(req, res) {
    console.log("Guestbook App Started");
});