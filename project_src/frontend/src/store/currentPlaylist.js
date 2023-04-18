import { csrfFetch } from "./csrf";


const SET_PLAYLIST = 'currentPlaylist/SET_PLAYLIST'

const setPlaylist = (payload) => {
    return{
        type: SET_PLAYLIST,
        payload
    }
}

export const getPlaylistById = (id) => async dispatch =>{
    const response = await csrfFetch(`/api/playlists/${id}`)
    if(response.ok){
        const playlist = await response.json()
        dispatch(setPlaylist(playlist))
        return null
    }
}

const currentPlaylistReducer = (state = {}, action) =>{
    let newState = {...state}

    switch(action.type){
        case SET_PLAYLIST:
            newState = action.payload
            return newState

        default:
            return state
    }
}

export default currentPlaylistReducer
