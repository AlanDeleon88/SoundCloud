import { csrfFetch } from "./csrf"

const GET_EXPLORE_ARTISTS = 'exploreArtists/GET_EXPLORE_ARTISTS'

const getExploreArtistAction = (artists) => ({
    type: GET_EXPLORE_ARTISTS,
    payload: artists
})


export const getExploreArtists = () => async dispatch =>{
    const response = await csrfFetch('/api/artists')
    if(response.ok){
        const data = await response.json()
        dispatch(getExploreArtistAction(data.artists))
        return null;
    }

}

export default function exploreArtistsReducer(state={}, action){
    let newState = {}
    switch(action.type){
        case GET_EXPLORE_ARTISTS:
            action.payload.forEach(artist =>{
                newState[artist.id] = artist
            })
            // newState = {...action.payload}
            return newState;
        default:
            return state
    }
}
