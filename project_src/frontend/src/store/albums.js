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

export const loadUserAlbums = (id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/artists/${id}/albums`);
    if(response.ok){
        const albums = await response.json();
        console.log('thunk', albums);
        dispatch(loadAlbums(albums));
        return albums;
    }

}

const setInitialState = () =>{
    return {albums: null};
}

const albumsReducer = (state = setInitialState(), action) =>{
    let newState = {...state}
    const albums = action.albums;
    switch(action.type){
        case LOAD_ALBUMS:
        // console.log('ALBUM REDUCER', albums.userAlbums);
        // console.log(newState);
        newState = albums.Albums;
        return newState;

        default:
            return state;
    }
}

export default albumsReducer;
