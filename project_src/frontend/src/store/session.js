
import { csrfFetch } from "./csrf";


const SET_USER = 'session/LOGIN';
const REMOVE_USER = 'session/LOGOUT';

const setUser = (user) => {
    return {
        type:SET_USER,
        user
    }
}

const removeUser = () => {
    return {
        type:REMOVE_USER,
    }
}

export const signup = (user) => async (dispatch) => {
    const {firstName, lastName, email, password, username} = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            username
        })
    })
    if(response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
        return user;
    }
}

export const login = (user) => async (dispatch) =>{
    const {credential, password} = user;

        const response = await csrfFetch('/api/session/login',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                credential,
                password
            }) //! should have keys of credential and password
        })

        if(response.ok){
            const user = await response.json();
            // console.log('test!!!!!!!!!', user);
            dispatch(setUser(user));
            return user;
        }

        return response;


}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session/logout',{
        method: 'DELETE'
    })
    if(response.ok) {
        dispatch(removeUser());
        return null
        //!some kind of return to let component know logout was successful.
    }
}

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    // return response;
    return data.user;
}

const setInitialState = () => {

    return {user: null};
};

const sessionReducer = (state = setInitialState(), action) =>{
    const newState = {...state}
    // console.log(newState);
    switch(action.type){
        case SET_USER:
            newState.user = action.user;
            return newState;

        case REMOVE_USER:
            newState.user = null
            return newState;

        default:
            return state;
    }

}

export default sessionReducer;
