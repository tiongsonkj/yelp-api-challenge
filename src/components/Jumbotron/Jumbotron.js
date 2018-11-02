import React, { Component } from 'react';

class Jumbotron extends Component {
    render () {
        return (
            <div className="jumbotron">
                <div className="container text-center">
                    {/* <img src= "assets/images/logo.png" className="img-thumbnail animated zoomInDown" alt="binoculars-man" id="logo"/> */}
                    <h6 className="text-center">Search for a business in Naperville!</h6>
                    <hr className="bg-white"/>
                    <div className="row" id="searchbar">
                    <div className="col-md-6">
                        <form action="">
                            <div className="input-group">
                                <input type="text" className="form-control" id="search-term" placeholder="Search. . ."/>
                                <span className="input-group-addon" id="search-icon">
                                    <button className="btn btn-outline-dark btn-search-event">
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Jumbotron;