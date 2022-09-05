import './AlbumDetail.css'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { deleteUserAlbum } from '../../store/albums';
import AlbumSongsList from '../AlbumSongsList';


const AlbumDetail = ({album}) => {
    const {title, id, previewImage, userId} = album;

    const [myAlbum, setMyAlbum] = useState(false);
    // const songs = Object.values(useSelector(state=>state.songs));
    const user = useSelector(state=>state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    //TODO get songs state after we dispatch for get album songs.

   //TODO make a seperate songs list page for each album, willl be easier to manage songs state.

    //TODO probably have to use redux song stores if I want to render the songs page on another page.

    //TODO create an action creator to update the state of albums with current album when a user clicks on a link here.?
    useEffect(() =>{
        if(user){
            if(userId === user.id){
                setMyAlbum(true);
            }
        }
    },[])
    const handleAlbumClick = (e) =>{
        // history.push(`${match.url}/${title}/songs`)

    }

    const handleEditClick = (e) => {

    }

    const handleDeleteClick = async (e) =>{
        // console.log(album.id);
        //TODO Look up a way to add a confirmation alert or window to make sure user wants to delete album.
        return await dispatch(deleteUserAlbum(album.id))
        .catch( async (res)=>{
            const data = await res.json();
            const errors = data.errors;
            window.alert(errors); //!temp
        })
    }

    // console.log(myAlbum);
    return(
        <>

        <Switch>

            <Route exact path={`${match.url}`}>
                <div className="album-container" onClick={handleAlbumClick}>

                    <div className='album-list-title' >
                    <NavLink to={`${match.url}/${title}/songs`} className='link-title'> {title} </NavLink>
                    </div>

                        {myAlbum &&(
                            <>
                                <div className='album-controls'>

                                    <button className='edit-album' onClick={handleEditClick}>
                                        Edit
                                    </button>
                                    <button className='delete-album' onClick={handleDeleteClick}> <i className="fa fa-trash" aria-hidden="true"></i> </button>

                                </div>
                            </>
                        )}

                </div>

            </Route>

            <Route path={`${match.url}/${title}/songs`}>

                    <AlbumSongsList album={album}/>

            </Route>

        </Switch>












        </>
    )

}

export default AlbumDetail;
