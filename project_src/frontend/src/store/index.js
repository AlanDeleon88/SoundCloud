import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import albumsReducer from './albums';
import songsReducer from './songs';
import artistReducer from './artist';
import songUrlReducer from './songUrl';
import currentAlbumReducer from './currentAlbum';
import currentSongReducer from './currentSong';
import exploreArtistsReducer from './exploreArtists';
import musicPlayerReducer from './musicPlayer';
import userPlaylistsReducer from './userPlaylist';


const rootReducer = combineReducers({
    session: sessionReducer,
    albums: albumsReducer,
    songs: songsReducer,
    artist: artistReducer,
    songUrl: songUrlReducer,
    currentAlbum: currentAlbumReducer,
    currentSong: currentSongReducer,
    exploreArtists: exploreArtistsReducer,
    musicPlayer : musicPlayerReducer,
    userPlaylists : userPlaylistsReducer
});

let enhancer;

if(process.env.NODE_ENV === 'production'){
    enhancer = applyMiddleware(thunk);
}
else{
    const logger = require('redux-logger').default;
    const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;
