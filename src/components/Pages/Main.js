import React, { Component } from 'react';
// import Jumbotron from '../Jumbotron/Jumbotron';
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

    loadYelpData() {
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
        const businessDisplay = this.state.businesses.map(business => (
            <div key={business.id} className="card">
                <img className="card-img-top" src={business.image_url ? business.image_url : replacementImage} alt="Business"/>
                <div className="card-body">
                    <h5 className="card-title">{business.name}</h5>
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
                <div className="jumbotron">
                    <div className="container text-center">
                        <h6 className="text-center">Search for a business in Naperville!</h6>
                        <hr className="bg-white"/>
                        <div className="row" id="searchbar">
                            <div className="col-md-6">
                                <form onSubmit={this.onSubmit}>
                                    <div className="input-group">
                                        <input 
                                            type="text" 
                                            className={this.state.error ? "form-control is-invalid" : "form-control"}
                                            id="search-term" 
                                            placeholder="Search..."
                                            onChange={this.onChange}
                                            value={this.state.search}
                                        />
                                        <button type="submit" className="btn btn-outline-dark btn-search-event">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {this.state.error ? 
                            <div className="row" style={{ margin: '5px 0 0 0'}}>
                                <div className="text-danger">Please enter something in the search bar!</div>
                            </div> : ''
                        }
                    </div>
                </div>

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