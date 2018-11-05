import { SET_CURRENT_BUSINESS } from '../actions/types';

// initial state for reducer
const initialState = {
    business: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_BUSINESS:
            return {
                ...state,
                business: action.payload
            }
        default:
            return state;
    }
};