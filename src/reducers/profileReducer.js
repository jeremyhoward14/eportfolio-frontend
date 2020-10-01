import { GET_PROFILE, PROFILE_LOADING } from '../actions/types';

const initialState = {
    user: [],
    loading: false
}


export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }  
        default:
            return state;
    }
}