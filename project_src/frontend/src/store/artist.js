import { csrfFetch} from "./csrf";
const SET_ARTIST = 'artist/SET_ARTIST';
const REMOVE_ARTIST= 'artist/REMOVE_ARTIST';

 const setArtist = (payload) =>{
    return {
        type: SET_ARTIST,
        payload
    }

}

export const getArtist = (id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/artists/${id}`);
    if(response.ok){
        const artist = await response.json();
        dispatch(setArtist(artist));
        // console.log(artist);
        return null
    }

}

const setInitialState = () =>{
    return{
        artist: {}
    }
}

const artistReducer = (state = setInitialState(), action) =>{
    let newState = {... state};
    switch(action.type){
        case SET_ARTIST:
        newState = {...action.payload.artist};

        return newState;
        default:
            return state;
    }
}

export default artistReducer;
