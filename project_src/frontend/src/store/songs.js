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

const addSong = (song) => {
    return {
        type:ADD_SONG,
        song

    }
}

const deleteSong = (id) => {
    return {
        type: DELETE_SONG,
        id
    }
}

const setInitialState = () =>{
    return {}
}

export const deleteUserSong = (id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/songs/${id}`, {
        method: 'DELETE'
    })

    if(response.ok){
        dispatch(deleteSong(id));
    }
}

export const addAlbumSong = (song) => async (dispatch) => {
    const {title, songUrl, imageUrl, description, albumId} = song;
    // console.log(song);
    const response = await csrfFetch(`/api/albums/${albumId}/songs`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            title,
            description,
            imageUrl,
            url: songUrl
        })
    })

    if(response.ok){
        const newSong = await response.json();
        // console.log('add song THUNK', newSong.song);
        dispatch(addSong(newSong.song));
        return newSong;
    }
}

export const loadSplashSongs = () => async (dispatch) => {
    const response = await csrfFetch('/api/songs?page=2&size=10');
    if(response.ok){
        const songs = await response.json();
        dispatch(loadSongs(songs.Songs));
    }

}

export const loadAlbumSongs = (id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/albums/${id}`)
    if(response.ok){
        const album = await response.json();
        // console.log('THUNK',album.Songs);
        dispatch(loadSongs(album.Songs));
        return album.Songs;
    }
}

const songsReducer = (state = setInitialState(), action) =>{
    let newState = {...state};
    switch(action.type){
        case LOAD_SONGS:
            const songs = action.payload;
            // newState.songs = {};
            // console.log('reducer side', songs);
            // console.log(newState);
            newState = {};
            songs.forEach(song =>{
                if(newState[song.id] === undefined){
                    newState[song.id] = song;
                }
            })
            // console.log(newState);
            // console.log(newSongState);
            // newState = {...songs}
            return newState;
        case ADD_SONG:
            const newSong = action.song;
            // console.log('REDUCER', newSong);
            newState[newSong.id] = newSong;
            return newState;
        case DELETE_SONG:
           delete newState[action.id];
           return newState;
        default:
            return state;
    }
}

export default songsReducer;
