import './AlbumDetail.css'
import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import DeleteAlbumModal from '../DeleteAlbumModal';
import EditAlbumFormModal from '../EditAlbumModal_DEPRECIATED';
import AlbumSongsList from '../AlbumSongsList';



const AlbumDetail = ({album}) => {
    const {title, previewImage, userId} = album;

    const [myAlbum, setMyAlbum] = useState(false);
    const user = useSelector(state=>state.session.user);
    const match = useRouteMatch();
    //TODO add actual album urls to albums in the seeders.

    useEffect(() =>{
        if(user){
            if(userId === user.id){
                setMyAlbum(true);
            }
        }
    },[user, userId])
    const handleAlbumClick = (e) =>{
        // history.push(`${match.url}/${title}/songs`)

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

                                    {/* <button className='edit-album' onClick={handleEditClick}>
                                        Edit
                                    </button> */}
                                    <EditAlbumFormModal album={album}/>

                                    <DeleteAlbumModal album={album}/>
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
