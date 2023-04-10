
// import { useSelector,useDispatch } from "react-redux"
import { pausePlayer, playPlayer, setListTrack } from '../store/musicPlayer'

export const handleBigPlayClick = (currentSongIndex, setCurrentSongIndex, current_track, dispatch ,album, playlist) =>{
    //* currentSongIndex, setCurrentSongIndex are state variables
    //* current_track is useSelector variable looking at the state of musicPlayer.current_track
    //* dispatch is react hook of useDispatch

    const {Songs, userId} = album ? album : playlist

    if(!playlist) playlist = {}
    if(!album) album = {}
    // if( (album && !album.Songs.length < 1) || (playlist && playlist.Songs.length < 1)){
    //     return null
    //    }

    if(album.Songs){
        if(album.Songs.length < 1) return null
    }

    if(playlist.Songs){
        if(playlist.Songs.length < 1) return null;
    }

   let trackObj = {
        trackIndex : currentSongIndex,
        tracks : Songs
   }



    if(trackObj.trackIndex){
        if(current_track['playlistId'] !== playlist['id'] || (album['id'] !== current_track['albumId']))  {
            dispatch(pausePlayer()).then(res =>{
                trackObj.trackIndex = 0;
                dispatch(setListTrack(trackObj))
                setCurrentSongIndex(0)
            })
        }
        else{
            dispatch(playPlayer())

        }

    }
    else{
        dispatch(pausePlayer()).then(res =>{
            dispatch(setListTrack(trackObj))
        })

    }
}


export const handleElementListClick = (setCurrentSongIndex, num, dispatch, album, playlist) =>{
    //* setCurrentSongIndex is passed in from the parent list's state variable
    //* num is the index from the mapped songList, expecting it to be i + i
    //* dispatch is a react hook useDispatch
    let trackObj ={
        trackIndex : num -1
    }
    if(album){

        trackObj['tracks'] = album.Songs;

        dispatch(pausePlayer()).then(res =>{
            setCurrentSongIndex(trackObj.trackIndex)
            dispatch(setListTrack(trackObj))
        })

    }
    else{
        trackObj['tracks'] = playlist.Songs
        dispatch(pausePlayer()).then(res =>{
            setCurrentSongIndex(trackObj.trackIndex)
            dispatch(setListTrack(trackObj))
        })
    }
}
