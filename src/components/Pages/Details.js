import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { clearBusiness } from '../../actions/actions';
import { connect } from 'react-redux';

import PropTypes from 'prop-types'; //WHAT IS THIS?! WHAT DOES IT DO?!

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            business: []
        }
    }

    searchAgain(e) {
        e.preventDefault();
        this.props.clearBusiness(this.props.history.push('/'));
    }

    render() {
        const { picture, name, location, price, rating, categories, phoneNum, yelpPageLink} = this.props.business.business;
       
        const category = categories.map((cat, index) => (
            <li className="categoryTitle" key={index}>{cat.title}</li>
        ));
       
        console.log(this.props.business.business); 
        return (
            <div>
                <button 
                    className="btn btn-success"
                    id="searchAgain"
                    onClick={this.searchAgain.bind(this)}
                >
                    Search again
                </button>

                <div id="detailCardContainer" className="container">
                    <div className="row">
                    <div id="detailCard" className="card">
                        <img id="detailCardImg" className="card-img-top" src={picture} alt="business"/>
                        <div className="card-body">
                            <h3>{name}</h3><hr/>
                            <div className="row">
                                <div id="otherCategoriesCol" className="col-6">
                                    <b>Categories:</b><br/>
                                    <ol>
                                        {category}
                                    </ol>
                                </div>
                                <div id="addressCol" className="col-6">
                                    <b>Address:</b><br/>
                                    <p>{location.address1}<br/>{location.city}, {location.state} {location.zip_code}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div id="otherCategoriesCol" className="col-6">
                                    <b>Phone:</b><br/>
                                    <p>{phoneNum}</p>
                                    <a href={yelpPageLink} target="_blank">Yelp Business Page</a>
                                </div>
                                <div id="addressCol" className="col-6">
                                    <b>Price:</b><br/>
                                    <p>{price}<span style={{color: '#d3d3d3'}}>/&#36;&#36;&#36;&#36;</span></p>
                                    <b>Rating:</b><br/>
                                    <p>{rating}<span style={{color: '#d3d3d3'}}>/5</span></p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Details.propTypes = {
    business: PropTypes.object.isRequired
}

// bring in state from store
const mapStateToProps = state => ({
    isLoading: state.isLoading,
    business: state.business
})

export default connect(mapStateToProps, { clearBusiness })(Details);