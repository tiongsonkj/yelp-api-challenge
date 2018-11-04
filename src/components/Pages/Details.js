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
        const { picture, name } = this.props.business.business;

        return (
            <div>
                <button 
                    className="btn btn-success"
                    id="searchAgain"
                    onClick={this.searchAgain.bind(this)}
                >
                    Search again
                </button>

                <div id="detailCard" className="container">
                    <div className="row">
                    <div className="card">
                        <img className="card-img-top" src={picture} alt="business"/>
                        <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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