import { csrfFetch} from "./csrf";


const LOAD_ALBUMS = 'albums/LOAD_ALBUMS';
const ADD_ALBUM = 'albums/ADD_ALBUMS';
const DELETE_ALBUM = 'albums/DELETE_ALBUM';
const EDIT_ALBUM = 'albums/EDIT_ALBUM';

const loadAlbums = (albums) => {
    return{
        type:LOAD_ALBUMS,
        albums: albums
    }
}

const addAlbum = (album) => {
    return {
        type:ADD_ALBUM,
        album,
    }
}

export const addUserAlbum = (album) => async (dispatch) => {
    const {title, description, imageUrl} = album;
    const response = await csrfFetch('/api/albums',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            title,
            description,
            imageUrl
        })
    })

    if(response.ok){
        const newAlbum = await response.json();
        console.log(newAlbum);
        dispatch(addAlbum(newAlbum));
    }
}

export const loadUserAlbums = (id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/artists/${id}/albums`);
    if(response.ok){
        const albums = await response.json();
        // console.log('thunk', albums);
        dispatch(loadAlbums(albums.Albums));
        return albums;
    }

}

const setInitialState = () =>{
    return {};
}

const albumsReducer = (state = setInitialState(), action) =>{
    let newState = {...state}
    // console.log(action.albums);
    const albums = action.albums;
    switch(action.type){
        case LOAD_ALBUMS:
        // console.log('ALBUM REDUCER', albums.userAlbums);
        // console.log(newState);
        newState = {};
        albums.forEach(album =>{
            if(!newState[album.id]) newState[album.id] = album;

        })
        // console.log(newState);
        // newState = albums
        return newState;
        case ADD_ALBUM:
            const album = action.album;
            console.log(action.album);
            newState[album.id] = album;
            return newState;

        default:
            return state;
    }
}

export default albumsReducer;
