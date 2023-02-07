const SET_TRACKS = 'musicPlayer/SET_TRACKS'
const NEXT_TRACK = 'musicPlayer/NEXT_TRACK'
const PREV_TRACK = 'musicPlayer/PREV_TRACK'
const PLAY = 'musicPlayer/PLAY'
const PAUSE = 'musicPlayer/PAUSE'

const default_state={
    tracks : [],
    current_track: {},
    is_playing: false,

}

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


export default function musicPlayerReducer(state=default_state, action){
    let newState = {}
    let index;
    switch(action.type){
        case SET_TRACKS:
            newState = {...default_state}
            newState.tracks.push(...action.payload)
            newState.current_track = newState.tracks[0]
            return newState

        case NEXT_TRACK:
            newState = {...state}
            index = findTrackIndex(newState);

            if(!index || newState.tracks.length === 0) return newState;

            newState.current_track = newState.tracks[index + 1]

            if(!newState.current_track){
                newState.current_track = newState.tracks[index]
                return newState
            }
            else return newState

        case PREV_TRACK:
            newState = {...state}
            index = findTrackIndex(newState);
            if(!index || newState.tracks.length ===0 ) return newState

            newState.current_track = newState.tracks[index - 1]

            if(!newState.current_track){
                newState.current_track = newState.tracks[index]
                return newState
            }
            else return newState

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
