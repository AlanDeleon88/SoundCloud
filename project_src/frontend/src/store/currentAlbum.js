import { csrfFetch } from "./csrf"

const SET_ALBUM = 'currentAlbum/SET_ALBUM'


const setAlbum = (payload) => {
    return{
        type: SET_ALBUM,
        payload
    }
}

export const getAlbum = (id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/albums/${id}`);
    if(response.ok){
        const album = await response.json()
        // console.log('currentAlbum THUNK', album);
        dispatch(setAlbum(album));
        return album;
    }
}


const currentAlbumReducer = (state = {}, action) =>{
    let newState = {...state}
    // console.log(newState);
    switch(action.type){
        case SET_ALBUM:
            newState = action.payload;
            newState.songs = {}
            action.payload.Songs.forEach(el => {
                newState.songs[el.id] = el;
            })
            delete action.payload.Songs;


            return newState;

        default:
            return state;
    }

}

export default currentAlbumReducer
