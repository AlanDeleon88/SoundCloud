import { csrfFetch} from "./csrf";
const LOAD_SONGS = 'songs/LOAD_SONGS';
const ADD_SONG = 'songs/ADD_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';
const UPDATE_SONG = 'songs/UPDATE_SONG';

const loadSongs = (payload) => {
    return{
        type:LOAD_SONGS,
        payload
    }
}

const setInitialState = () =>{
    return {
        songs: null,
    }
}


export const loadAlbumSongs = (id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/albums/${id}`)
    if(response.ok){
        const album = await response.json();
        console.log('THUNK',album.Songs);
        dispatch(loadSongs(album.Songs));
        // return album.Songs;
    }
}

const songsReducer = (state = setInitialState(), action) =>{
    let newState = {...state};
    switch(action.type){
        case LOAD_SONGS:
            const songs = action.payload;
            // console.log('reducer side', songs);
            newState = {...songs}
            return newState;
        default:
            return state;
    }
}

export default songsReducer;
