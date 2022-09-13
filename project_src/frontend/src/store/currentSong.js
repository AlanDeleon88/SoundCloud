import { csrfFetch } from "./csrf";

const SET_SONG = 'currentSong/SET_SONG'

const setSong = (payload) =>{
    return {
        type: SET_SONG,
        payload
    }
}

export const getSong = (id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/songs/${id}`);
    if(response.ok){
        const song = await response.json();
        dispatch(setSong(song));
        return song;
    }
}

const currentSongReducer = (state = {}, action) =>{
    let newState = {...state}
    switch(action.type){
        case SET_SONG:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default currentSongReducer;
