import './AlbumDetail.css'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import AlbumSongsList from '../AlbumSongsList';
import { csrfFetch } from '../../store/csrf';

const AlbumDetail = ({album}) => {
    const {title, id, previewImage, userId} = album;
    const [showSongs, setShowSongs] = useState(false);

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
        setShowSongs(!showSongs)

    }

    // console.log(myAlbum);
    return(
        <>

        <Switch>

            <Route exact path={`${match.url}`}>
                <div className="album-container" onClick={handleAlbumClick}>

                    <div className='album-list-title'>
                    <NavLink to={`${match.url}/${title}/songs`}> {title} </NavLink>
                    </div>

                        {myAlbum &&(
                            <>
                                <div className='edit-album'>
                                    Edit
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
