const express = require('express');
const restify = require('restify');
const config = require('./config');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser');
const Cors = require('cors');

const app = express();

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false })); //??
app.use(bodyParser.json());

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app

// gets businesses in zip code 60540 and sorts closest by distance
app.get('/', (req, res, next) => {
    
    const searchRequest = {
        location: '60540',
        sort_by: 'distance'
    }

    const client = yelp.client(config.apiKey);
    
    client.search(searchRequest).then(response => {
        const businesses = response.jsonBody.businesses;
        res.send(businesses)
        
        }).catch(e => {
        console.log(e);
    });
});

app.get("/getsearch/:term", (req, res, next) => {
    
    // console.log(req.params.term);
    const searchTerm = req.params.term;

    const searchRequest = {
        term: searchTerm,
        location: '60540',
        sort_by: 'distance'
    };
    const client = yelp.client(config.apiKey);

    client.search(searchRequest).then(response => {
        // console.log(response.jsonBody.businesses);
        const businesses = response.jsonBody.businesses;
        res.send(businesses);
        // console.log(request)    
        
        }).catch(e => {
        console.log(e);
    });
});

app.listen(config.port, () => {
    console.log(`listening to port 3001 ${config.port}`);
});