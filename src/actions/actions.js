import { SET_CURRENT_BUSINESS } from './types';

// set business
export const setBusiness = businessData => {
    return {
        type: SET_CURRENT_BUSINESS,
        payload: businessData
    }
};

// clear the business in the store
export const clearBusiness = () => dispatch => {
    dispatch(setBusiness({}));
}