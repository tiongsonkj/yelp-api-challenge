import React, { Component } from 'react';
import Jumbotron from '../Jumbotron/Jumbotron';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import $ from 'jquery';

// redux
import { connect } from 'react-redux';
import { setBusiness } from '../../actions/actions.js';



class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            businesses: [],
            chosenBusiness: []
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

        // this.onClick = this.onClick.bind(this);
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
            'data': {location: '60540'},
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
                // console.log(response.businesses);

                //map through the businesses array and add them to our new array
                response.businesses.map(business => {
                   return array.push(business);
                })

                this.setState({ businesses: array });
        });
    };

    grabBusiness = data => {

        // when we click on the more info button of this specific card...
        // grab the specific business data 
        console.log(data);
        const currentBusinessData = {
            categories: data.categories,
            coordinates: data.coordinates,
            id: data.id,       
            location: data.location, 
            name: data.name,                            
            phoneNum: data.display_phone,
            picture: data.image_url,
            price: data.price,            
            rating: data.rating
        }

        // console.log(currentBusinessData);
        this.props.setBusiness(currentBusinessData, this.props.history.push('/details'));
    }

    render() {
        // console.log(this.state.businesses[0]);
        const businessDisplay = this.state.businesses.map(business => (
            <div key={business.id} className="card">
                <img className="card-img-top" src={business.image_url} alt="Business"/>
                <div className="card-body">
                    <h5 className="card-title">{business.name}</h5>
                    <p className="card-text">
                        {business.location.address1}<br/>{business.location.city}, {business.location.zip_code}
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={this.grabBusiness.bind(this, business)}
                    >
                    More Info
                    </button>
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

export default connect(null, { setBusiness })(Main);