const SET_TRACKS = 'musicPlayer/SET_TRACKS'
const SET_LIST_TRACK = 'musicPlayer/SET_LIST_TRACK'
const NEXT_TRACK = 'musicPlayer/NEXT_TRACK'
const PREV_TRACK = 'musicPlayer/PREV_TRACK'
const PLAY = 'musicPlayer/PLAY'
const PAUSE = 'musicPlayer/PAUSE'

const default_state={
    tracks : [],
    current_track: {},
    is_playing: false,

}

const setListTracksAction = (AlbumListObject) =>({
    /*
        payload: {
            trackIndex: 3,
            tracks, [...album/playlist tracks]
        }

    */
        type: SET_LIST_TRACK,
        payload: AlbumListObject

})

//!takes an array of song objects
const setTracksAction = (tracks) =>({
    type:SET_TRACKS,
    payload: tracks
})

const nextTrackAction = () =>({
    type:NEXT_TRACK
})

const prevTrackAction = () =>({
    type:PREV_TRACK
})

const playAction = () =>({
    type: PLAY
})

const pauseAction = () =>({
    type:PAUSE
})

const findTrackIndex = (state) =>{
    let index;
    for(let i = 0; i < state.tracks.length; i++){
        let song = state.tracks[i]
        if(song.id === state.current_track.id){
            index = i
        }
    }
    return index

}

export const prevTrack = () => async dispatch =>{
    dispatch(prevTrackAction())
    return null
}

export const nextTrack = () => async dispatch =>{
    dispatch(nextTrackAction())
    return null
}

export const setTracks = (tracks) => async dispatch =>{
    dispatch(setTracksAction(tracks))
    return null
}

export const pausePlayer = () => async dispatch =>{
    dispatch(pauseAction())
    return null
}

export const playPlayer = () => async dispatch =>{
    dispatch(playAction())
    return null
}

export const setListTrack = (trackListObj) => async dispatch =>{
    dispatch(setListTracksAction(trackListObj))
    return null
}

export default function musicPlayerReducer(state=default_state, action){
    let newState = {}
    let index;
    switch(action.type){
        case SET_TRACKS:
            // console.log(default_state);
            newState = {
                tracks : [],
                current_track: {},
                is_playing: false,
            }
            // newState = {...default_state}
            newState.tracks.push(...action.payload)
            newState.current_track = newState.tracks[0]
            newState.is_playing = true;
            return newState

        case SET_LIST_TRACK:{
            newState = {
                tracks : [],
                current_track: {},
                is_playing: false,
            }
            newState.tracks.push(...action.payload.tracks)
            newState.current_track = newState.tracks[action.payload.trackIndex]
            newState.is_playing = true;
            return newState
        }

        case PLAY:
            newState = {...state}
            newState.is_playing = true
            return newState

        case PAUSE:
            newState = {...state}
            newState.is_playing = false;
            return newState

        case NEXT_TRACK:
            newState = {...state}
            index = findTrackIndex(newState);
            // console.log(index);

            if(newState.tracks.length === 0) return newState;

            // newState.current_track = newState.tracks[index + 1]
            // console.log('length of tracks', newState.tracks.length);
            if(index < newState.tracks.length - 1){
                // console.log('in the array', index);
                newState.current_track = newState.tracks[index + 1]
                return newState
            }
            else{
                newState.current_track = newState.tracks[0]
                return newState
            }

        case PREV_TRACK:
            newState = {...state}
            index = findTrackIndex(newState);
            if(newState.tracks.length === 0 ) return newState

            // newState.current_track = newState.tracks[index - 1]
            // console.log(index);
            if(index - 1 < 0){
                // console.log('I ENDEDUP HERE TO LOOP');
                newState.current_track = newState.tracks[newState.tracks.length-1]
                return newState
            }
            else{
                //  console.log('HEY I DIDNT LOOP');
                newState.current_track = newState.tracks[index - 1]
                return newState
            }

        case PLAY:
            newState ={...state}
            newState.is_playing = true
            return newState;

        case PAUSE:
            newState = {...state}
            newState.is_playing = false
            return newState;

        default:
            return state
    }
}
