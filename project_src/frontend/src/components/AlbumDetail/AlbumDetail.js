import './AlbumDetail.css'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { deleteUserAlbum } from '../../store/albums';
import DeleteAlbumModal from '../DeleteAlbumModal';
import EditAlbumFormModal from '../EditAlbumModal';
import AlbumSongsList from '../AlbumSongsList';



const AlbumDetail = ({album}) => {
    const {title, id, previewImage, userId} = album;

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
    },[])
    const handleAlbumClick = (e) =>{
        // history.push(`${match.url}/${title}/songs`)

    }

    const handleEditClick = (e) => {
        //TODO make an edit album modal, pass in album as prop.
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
