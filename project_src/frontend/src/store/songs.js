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

export const addSingle = (song) => async (dispatch) =>{
    const {title, songUrl, imageUrl, description} = song

    const response = await csrfFetch(`/api/songs`,{
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
        dispatch(addSong(newSong))
        return newSong
    }
}

export const loadSplashSongs = () => async (dispatch) => {
    const response = await csrfFetch('/api/songs?page=1&size=20');
    if(response.ok){
        const songs = await response.json();
        dispatch(loadSongs(songs.Songs));
    }

}

export const getUserSongs = (id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/artists/${id}/songs`)

    if(response.ok){
        const data = await response.json()
        dispatch(loadSongs(data.Songs))
        return null;
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

export const updateSong = (song) => async (dispatch) =>{
    const {id, title, description} = song;
    // console.log('THUNK!',song);
    const response = await csrfFetch(`/api/songs/${id}`, {
        method:'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            title,
            description,
        })
    })
    if(response.ok){
        const updatedSong = await response.json();
        dispatch(addSong(updatedSong));
        return updatedSong;
    }
}

export const addSongToAlbum = (songObj) => async dispatch =>{
    const {songId, albumId} = songObj
    const response = await csrfFetch(`/api/songs/${songId}/add_to_album`,{
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            albumId: albumId
        })
    })

    if(response.ok){
        const data = await response.json()
        dispatch(addAlbumSong(data))
        return null

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
