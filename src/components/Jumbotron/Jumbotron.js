import React from 'react';

const Jumbotron = ({
    // props brought in
    onSubmit,
    onChange,
    value,
    error,
}) => {
    return (
        <div className="jumbotron">
            <div className="container text-center">
                <h6 className="text-center">Search for a business in Naperville!</h6>
                <hr className="bg-white"/>
                <div className="row" id="searchbar">
                    <div className="col-md-6">
                        <form onSubmit={onSubmit}>
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    className={error ? "form-control is-invalid" : "form-control"}
                                    id="search-term" 
                                    placeholder="Search..."
                                    onChange={onChange}
                                    value={value}
                                />
                                <button type="submit" className="btn btn-outline-dark btn-search-event">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {error ? 
                    <div className="row" style={{ margin: '5px 0 0 0'}}>
                        <div className="text-danger">Please enter something in the search bar!</div>
                    </div> : ''
                }
            </div>
        </div>
    )
}

export default Jumbotron;