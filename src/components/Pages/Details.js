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
        console.log(this.props.business);

        return (
            <div>
                <button 
                    className="btn btn-success"
                    onClick={this.searchAgain.bind(this)}
                >
                    Search again
                </button>

                <div>
                    {/* {props} */}
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