const express = require('express');
const config = require('./config');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser');
const Cors = require('cors');

const app = express();

app.use(Cors());
app.use(bodyParser.json());

// gets businesses in zip code 60540 and sorts closest by distance
app.get('/', (req, res, next) => {
    
    const searchRequest = {
        location: '60540',
        sort_by: 'distance'
    }

    const client = yelp.client('cRXokvfb2tTyvP0J0U01MCoe3FdERmBbYHnQv-yfbeuIoGZQQdomPnRA_72uuYRJzKVrzqAh_zoA1AkW408AGOhBLzWnd0uyxTc6ew2KWfLm4WILFBDRscYfWU_cW3Yx');
    
    client.search(searchRequest).then(response => {
        const businesses = response.jsonBody.businesses;
        res.send(businesses)
        
        }).catch(e => {
        console.log(e);
    });
});

// gets businesses based on search term
app.get("/getsearch/:term", (req, res, next) => {
    
    // console.log(req.params.term);
    const searchTerm = req.params.term;

    const searchRequest = {
        term: searchTerm,
        location: '60540',
        sort_by: 'distance'
    };
    const client = yelp.client('cRXokvfb2tTyvP0J0U01MCoe3FdERmBbYHnQv-yfbeuIoGZQQdomPnRA_72uuYRJzKVrzqAh_zoA1AkW408AGOhBLzWnd0uyxTc6ew2KWfLm4WILFBDRscYfWU_cW3Yx');

    client.search(searchRequest).then(response => {
        const businesses = response.jsonBody.businesses;
        res.send(businesses);
        
        }).catch(e => {
        console.log(e);
    });
});

app.listen(config.port, () => {
    console.log(`listening to port ${config.port}`);
});