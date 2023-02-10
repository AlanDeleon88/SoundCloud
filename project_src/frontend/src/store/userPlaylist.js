import { csrfFetch } from "./csrf"

const SET_PLAYLISTS = 'userPlaylist/SET_PLAYLISTS'

const setPlaylistsAction = (playlists) =>({
    type : SET_PLAYLISTS,
    payload: playlists
})


export const loadUserPlaylists = (id) => async dispatch =>{
    const response = await csrfFetch(`/api/artists/${id}/playlists`)

    if(response.ok){
        const data = await response.json()

        dispatch(setPlaylistsAction(data.playlists))
        return null
    }
}

export default function userPlaylistsReducer(state={}, action){
    let newState = {}
    switch(action.type){
        case SET_PLAYLISTS:
            action.payload.forEach(playlist =>{
                newState[playlist.id] = playlist;
            })
            return newState
        default:
            return state
    }
}
