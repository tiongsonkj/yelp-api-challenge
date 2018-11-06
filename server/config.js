//pull in .env file
require('dotenv').config();

module.exports = {
	port: process.env.PORT || 3001,
	apiKey: process.env.REACT_APP_YELP_API_KEY
};