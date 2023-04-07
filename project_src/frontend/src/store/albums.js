import { csrfFetch} from "./csrf";


const LOAD_ALBUMS = 'albums/LOAD_ALBUMS';
const ADD_ALBUM = 'albums/ADD_ALBUMS';
const DELETE_ALBUM = 'albums/DELETE_ALBUM';
const UPDATE_ALBUM = 'albums/EDIT_ALBUM';

const updateAlbum = (album) => {
    return{
        type: UPDATE_ALBUM,
        album
    }
}

const deleteAlbum = (id) => {
    return {
        type:DELETE_ALBUM,
        id
    }
}

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

export const loadFeaturedAlbums = () => async (dispatch) =>{
    const response = await csrfFetch(`/api/albums?page=1&size=2`);

    if(response.ok){
        const data = await response.json()
        dispatch(loadAlbums(data.albums))
        return null
    }
}

export const updateUserAlbum = (album) => async (dispatch) =>{
    const {title, description, imageUrl, id} = album;
    const response = await csrfFetch(`/api/albums/${id}`,{
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            title,
            description,
            imageUrl
        })
    })

    if(response.ok) {
        const updatedAlbum = await response.json();
        dispatch(updateAlbum(updatedAlbum));
        return null;
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
        // console.log(newAlbum);
        dispatch(addAlbum(newAlbum));
        return null
    }
}

export const loadUserAlbums = (id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/artists/${id}/albums`);
    if(response.ok){
        const albums = await response.json();
        // console.log('thunk', albums);
        dispatch(loadAlbums(albums.albums));
        return albums;
    }

}

export const deleteUserAlbum = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${id}`,{
        method: 'DELETE'
    });
    if(response.ok){
        // const message = await response.json();
        dispatch(deleteAlbum(id));
        return null
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
            // console.log(action.album);
            newState[album.id] = album;
            return newState;

        case UPDATE_ALBUM:
            const updateAlbum = action.album;
            console.log('updated Album', updateAlbum);
            newState[updateAlbum.id] = updateAlbum;
            return newState;
        case DELETE_ALBUM:
            const id = action.id;
            delete newState[id];
            return newState;

        default:
            return state;
    }
}

export default albumsReducer;
