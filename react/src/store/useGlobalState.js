// Not sure if we'll need to end up using this.


import {useReducer} from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                isLoggedin: true
            };
        case "LOGOUT":
            return {
                isLoggedIn: false
            };
        default: {
            return state;
        }
    }
};

const useGlobalState = () => {
    const [globalState, globalDispatch] = useReducer(reducer, {
        isLoggedIn: false
    })

    return {globalState, globalDispatch};
};

export default useGlobalState;