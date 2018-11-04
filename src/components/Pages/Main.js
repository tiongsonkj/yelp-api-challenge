import React, { Component } from 'react';
// import Jumbotron from '../Jumbotron/Jumbotron';
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
            chosenBusiness: [],
            search: ''
        }

        this.onChange = this.onChange.bind(this);

        // this.base_url = "http://localhost:3001";

        // this.axiosConfig = {
        //     headers: {
        //       "Content-Type": "application/json;charset=UTF-8",
        //       "Access-Control-Allow-Origin": "*",
        //       "Access-Control-Allow-Headers": "*",
        //       "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS"
        //     }
        // };

        this.cors_anywhere_url = 'https://cors-anywhere.herokuapp.com';
        this.yelp_search_url = 'https://api.yelp.com/v3/businesses/search';
        this.token = 'Bearer cRXokvfb2tTyvP0J0U01MCoe3FdERmBbYHnQv-yfbeuIoGZQQdomPnRA_72uuYRJzKVrzqAh_zoA1AkW408AGOhBLzWnd0uyxTc6ew2KWfLm4WILFBDRscYfWU_cW3Yx';
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

    onChange(e) {
        this.setState({search: e.target.value})
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
                //map through the businesses array and add them to our new array
                response.businesses.map(business => {
                   return array.push(business);
                })

                this.setState({ businesses: array });
        });
    };

    searchForBusiness = input => {

    };

    grabBusiness = data => {
        // store data content in an object
        const currentBusinessData = {
            categories: data.categories,
            coordinates: data.coordinates,
            id: data.id,       
            location: data.location, 
            name: data.name,                            
            phoneNum: data.display_phone,
            picture: data.image_url,
            price: data.price,            
            rating: data.rating,
            yelpPageLink: data.url
        }

        // call action, then go to details page
        this.props.setBusiness(currentBusinessData, this.props.history.push('/details'));
    };

    render() {
        console.log(this.state);
        const businessDisplay = this.state.businesses.map(business => (
            <div key={business.id} className="card">
                <img className="card-img-top" src={business.image_url} alt="Business"/>
                <div className="card-body">
                    <h5 className="card-title">{business.name}</h5>
                    <p className="card-text">
                        {business.location.address1}<br/>{business.location.city}, {business.location.state} {business.location.zip_code}
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
                <div className="jumbotron">
                    <div className="container text-center">
                        {/* <img src= "assets/images/logo.png" className="img-thumbnail animated zoomInDown" alt="binoculars-man" id="logo"/> */}
                        <h6 className="text-center">Search for a business in Naperville!</h6>
                        <hr className="bg-white"/>
                        <div className="row" id="searchbar">
                        <div className="col-md-6">
                            <form action="">
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="search-term" 
                                        placeholder="Search..."
                                        onChange={this.onChange}
                                        value={this.state.search}
                                    />
                                    <span className="input-group-addon" id="search-icon">
                                        <button onClick={this.searchForBusiness} className="btn btn-outline-dark btn-search-event">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>

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