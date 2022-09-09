const SET_URL = 'songUrl/SET_URL'


export const setUrl = (payload) => {
    return{
        type: SET_URL,
        payload
    }
}


const songUrlReducer = (state = {}, action) =>{
    let newState = {...state}
    // console.log(newState);
    switch(action.type){
        case SET_URL:
            newState = action.payload;
            return newState;

        default:
            return state;
    }

}

export default songUrlReducer
