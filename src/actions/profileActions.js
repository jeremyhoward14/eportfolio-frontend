import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING } from "../actions/types";
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getProfile = () => dispatch => {
    dispatch(setProfileLoading());

    // GET DATA
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}