import { csrfFetch } from "./csrf"

const SET_ARTIST = 'focusArtist/SET_ARTIST'

const setArtistAction = (user) =>({
    type:SET_ARTIST,
    payload:user
})

export const getArtist = (id) => async dispatch =>{
    const response = await csrfFetch(`/api/artists/${id}`)

    if(response.ok){
        const data = await response.json()
        dispatch(setArtistAction(data.artist))
    }
}


export default function focusArtistReducer(state={}, action){
    let newState ={}

    switch(action.type){
        case SET_ARTIST:
            newState = {...action.payload}
            return newState
        default:
            return state
    }
}
