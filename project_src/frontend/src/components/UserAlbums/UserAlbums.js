import { useDispatch, useSelector } from "react-redux";
import { Route, useRouteMatch, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadUserAlbums } from "../../store/albums";
import AlbumDetail from "../AlbumDetail";
import AddAlbumFormModal from "../AddAlbumModal";
import './UserAlbums.css'
import { getArtist } from "../../store/artist";


const UserAlbums = (props) =>{ //? accepts user id from what ever is gonna render it, will check ids to see if albums belong to current user.
    const params = useParams();
    const paramId = params.userId;
    const id = props.id || paramId;
    const [isLoaded, setIsLoaded] = useState(false);
    const [myAlbum, setMyAlbum] = useState(false);
    const dispatch = useDispatch();
    const albums = Object.values(useSelector(state=>state.albums));
    const artist = useSelector(state=>state.artist);
    const currentUser = useSelector(state=>state.session.user);
    const match = useRouteMatch();

    //!need to add logic for if a user has no albums, they can still see add album button.
    // if(currentUser){
    //     console.log('user', currentUser.id);
    // }
    //  console.log('album user', albums[0].userId);

    useEffect(()=>{
        // console.log("USER ALBUMS LOADING FOR SOME REASON");
        dispatch(loadUserAlbums(id))
        .then(()=>{
            setIsLoaded(true)
        },[dispatch])


    },[dispatch, id])

    useEffect(() =>{
        dispatch(getArtist(id));
    },[dispatch])

    useEffect(() =>{
        if((albums.length > 0) && (currentUser)){
            // console.log('IM RUNNNING!!');
            if(albums[0].userId === currentUser.id){

                setMyAlbum(true);

            }
            else{
                setMyAlbum(false);
            }
        }
        if(match.url === '/me/albums'){
            setMyAlbum(true);
        }
    },[currentUser, match.url, albums])

    //! change thunk action to make fetch to /artists/id/albums

    return(
        <>
            {isLoaded &&
            (

            <div className='album-list'>
                <Route exact path={match.url}>

                    <div className="user-header">
                        <img className='user-album-img'src='https://i.imgur.com/WYC4sLx.png'/>
                        <h1 className="artist-header">{artist.username}'s Albums</h1>

                    </div>

                </Route>

                <ul className='album-list-style'>

                    {
                        albums.map(album =>{
                            return(
                                <li key={album.id} className='album-list-item'>

                                        <AlbumDetail album={album}/>


                                </li>
                            )
                        })

                    }


                    <Route exact path={match.url}>
                        {myAlbum && (
                            <>
                                <div className='add-album-bundle'>
                                    {albums.length <= 0 && (
                                        <h2>Add a new Album</h2>
                                    )}

                                    <AddAlbumFormModal album={null}/>

                                </div>

                            </>
                        )}

                    </Route>


                    </ul>

            </div>

            )}


        </>
    )
}

export default UserAlbums;
