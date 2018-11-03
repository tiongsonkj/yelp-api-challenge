import React, { Component } from 'react';
import Jumbotron from '../Jumbotron/Jumbotron';
// import axios from 'axios';
import $ from 'jquery';



class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            businesses: []
        }

        this.base_url = "http://localhost:3001";

        this.axiosConfig = {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS"
            }
        };

        this.cors_anywhere_url = 'https://cors-anywhere.herokuapp.com';
        
        this.yelp_search_url = 'https://api.yelp.com/v3/businesses/search';

        this.token = 'Bearer cRXokvfb2tTyvP0J0U01MCoe3FdERmBbYHnQv-yfbeuIoGZQQdomPnRA_72uuYRJzKVrzqAh_zoA1AkW408AGOhBLzWnd0uyxTc6ew2KWfLm4WILFBDRscYfWU_cW3Yx';

        // this.loadYelpData = this.loadYelpData.bind(this);
    
    }



    componentDidMount() {
        // axios.get(this.cors_anywhere_url + "/" + this.yelp_search_url, {
        //     params: {
        //         latitude: 41.77359,
        //         longitutde: -88.15968
        //     }
        // }, this.axiosConfig)
        // .then(response => {
        //     console.log(response);
        // });

        this.loadYelpData();        
    }

    loadYelpData() {
        const requestObject = {
            'url': this.cors_anywhere_url + "/" + this.yelp_search_url,
            'data': {location: '92697'},
            headers: {'Authorization': this.token},
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('AJAX error, jqXHR = ', jqXHR, ', textStatus = ',
                textStatus, ', errorThrown = ', errorThrown)
            }
        }
        
        let array = [];
        $.ajax(requestObject)
            .done(response => {
                // this.setState({ businesses: response });
                console.log(response.businesses);

                //map through the businesses array and add them to our new array
                response.businesses.map(business => {
                    array.push(business);
                })
                console.log(array);
                this.setState({ businesses: array });
        });
    }

    render() {
        console.log(this.state.businesses[0]);
        const businessDisplay = this.state.businesses.map(business => (
            <div key={business.id} className="card">
                <img className="card-img-top" src={business.image_url} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{business.name}</h5>
                    <p className="card-text">
                        {business.location.address1}<br/>{business.location.city}, {business.location.zip_code}
                    </p>
                    <a href="#" className="btn btn-primary">More Info</a>
                </div>
            </div>
        ));

        return (
            <div>
                <Jumbotron />

                <div className="container">
                    <div className="row">
                        {businessDisplay}
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;