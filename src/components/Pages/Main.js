import React, { Component } from 'react';
import Jumbotron from '../Jumbotron/Jumbotron';
import axios from 'axios';
import replacementImage from '../../assets/no_image_available.jpg';
import Spinner from '../Spinner/Spinner';

// redux
import { connect } from 'react-redux';
import { setBusiness } from '../../actions/actions.js';

class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            businesses: [],
            chosenBusiness: [],
            search: '',
            error: false
        }
        
        this.base_url = "http://localhost:3001";
    }



    componentDidMount() {
        this.loadYelpData();   
    }

    onChange = event => {
        this.setState({search: event.target.value})
    }

    loadYelpData = () => {
        let array = [];
        axios.get(this.base_url)
            .then(response => {
                response.data.map(business => {
                    return array.push(business);
                });

                this.setState({ businesses: array });
        });
    };

    onSubmit = event => {
        event.preventDefault();

        // grab state
        const searchTerm = this.state.search;
        
        if (searchTerm === '') {
            // change error to true so that the search bar can change
            this.setState({ error: true });
            return false;
        } else {
            this.setState({ error: false });

            // empty the business state array for the spinner            
            this.setState({ businesses: []});
            let array = [];

            axios.get(this.base_url + `/getsearch/${searchTerm}`)
                .then(response => {
                    response.data.map(business => {
                        return array.push(business);
                    })

                    this.setState({
                        businesses: array,
                        search: ''
                    });
            });
        }
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
        // convert meters into miles
        this.state.businesses.map(business => {
            const meters = business.distance;
            const miles = meters * 0.00062137;

            // change the distance value in the array
            return business.distance = miles.toFixed(2);
        });

        const businessDisplay = this.state.businesses.map(business => (
            <div key={business.id} className="card">
                <img className="card-img-top" src={business.image_url ? business.image_url : replacementImage} alt="Business"/>
                <div className="card-body">
                    <h5 className="card-title">{business.name}</h5><hr/>
                    <p className="card-text">{business.distance} miles away</p><hr/>
                    <p className="card-text">
                        {business.location.address1}<br/>{business.location.city}, {business.location.state} {business.location.zip_code}
                    </p>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.grabBusiness.bind(this, business)}
                    >
                    More Info
                    </button>
                </div>
            </div>
        ));

        return (
            <div>
                <Jumbotron 
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    value={this.state.search}
                    error={this.state.error}
                />

                <div className="container">
                    <div className="row">
                        {this.state.businesses.length === 0 ? <Spinner/> : businessDisplay}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { setBusiness })(Main);