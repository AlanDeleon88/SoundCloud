import { csrfFetch } from "./csrf"
//TODO add thunk to remove user playlist

const SET_PLAYLISTS = 'userPlaylist/SET_PLAYLISTS'
const ADD_PLAYLIST = 'userPlaylist/ADD_PLAYLIST'

const setPlaylistsAction = (playlists) =>({
    type : SET_PLAYLISTS,
    payload: playlists
})

const addPlayListAction = (playlist) =>({
    type : ADD_PLAYLIST,
    payload: playlist
})


export const loadFeaturedPlaylists = (id) => async dispatch =>{
    const response = await csrfFetch(`/api/playlists?page=1&size=2`)

    if(response.ok){
        const data = await response.json()
        dispatch(setPlaylistsAction(data.playlists))
        return null
    }
}

export const loadUserPlaylists = (id) => async dispatch =>{
    const response = await csrfFetch(`/api/artists/${id}/playlists`)

    if(response.ok){
        const data = await response.json()

        dispatch(setPlaylistsAction(data.playlists))
        return null
    }
}

export const addUserPlaylistWithSong = (playlistObj) => async dispatch =>{
    // console.log(playlistObj);
    const {name, description, userId} = playlistObj
    const response = await csrfFetch(`/api/playlists`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            name: name,
            description: description
        })
    })

    if(response.ok){
        const data = await response.json()
        dispatch(loadUserPlaylists(userId))
        return data
    }
}

export const updateUserPlaylist = (playlist) => async dispatch =>{
    const {title, description, playlistId} = playlist
    const response = await csrfFetch(`/api/playlists/${playlistId}`,{
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            name: title,
            description: description
        })

    })
    if(response.ok){
        const data = await response.json();
        dispatch(addPlayListAction(data))
        return null
    }
}

export const removeUserPlaylist = (playlist) => async dispatch =>{
    const {id, userId} = playlist
    const response = await csrfFetch(`/api/playlists/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
    })
    if(response.ok){
        dispatch(loadUserPlaylists(userId))
        return null
    }
}

export const addSongToPlaylist = (playlist, song) => async dispatch =>{
    const response = await csrfFetch(`/api/playlists/${playlist.id}`,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            songId: song.id

        })

    })
    if(response.ok){
        // const data = await response.json()
        dispatch(loadUserPlaylists(playlist.userId))
        return null
    }

}

export const removeSongFromPlaylist = (playlist, song) => async dispatch =>{
    const response = await csrfFetch(`/api/playlists/${playlist.id}/song`, {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            songId: song.id
        })
    })
    if(response.ok){
        dispatch(loadUserPlaylists(playlist.userId))
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

        case ADD_PLAYLIST:
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        default:
            return state
    }
}
