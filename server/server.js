const express = require('express');
const restify = require('restify');
const config = require('./config');
const yelp = require('yelp-fusion');

const app = express();

// start server
const server = restify.createServer({
    name: config.name,
    version: config.version
});

server.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
});

server.pre((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', "Content-Type");
    next();
});

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'cRXokvfb2tTyvP0J0U01MCoe3FdERmBbYHnQv-yfbeuIoGZQQdomPnRA_72uuYRJzKVrzqAh_zoA1AkW408AGOhBLzWnd0uyxTc6ew2KWfLm4WILFBDRscYfWU_cW3Yx';

const searchRequest = {
    term:'Four Barrel Coffee',
    location: 'san francisco, ca'
};

server.get("/getsearch", (req, res, next) => {

    const client = yelp.client(apiKey);

    client.search(searchRequest).then(response => {
        const firstResult = response.jsonBody.businesses[0];
        const prettyJson = JSON.stringify(firstResult, null, 4);
        console.log(prettyJson);
        res.send(prettyJson);
        
        }).catch(e => {
        console.log(e);
    });
})