import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadUserAlbums } from "../../store/albums";
import AlbumDetail from "../AlbumDetail";
import AddAlbumFormModal from "../AddAlbumModal";
import './UserAlbums.css'


const UserAlbums = ({id}) =>{ //? accepts user id from what ever is gonna render it, will check ids to see if albums belong to current user.
    const [isLoaded, setIsLoaded] = useState(false);
    const [myAlbum, setMyAlbum] = useState(false);
    const dispatch = useDispatch();
    const albums = Object.values(useSelector(state=>state.albums));
    const currentUser = useSelector(state=>state.session.user);
    const match = useRouteMatch();

    // if(currentUser){
    //     console.log('user', currentUser.id);
    // }
    //  console.log('album user', albums[0].userId);

    useEffect(()=>{
        dispatch(loadUserAlbums(id))
        .then(()=>{
            setIsLoaded(true)
        })

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
    })

    //! change thunk action to make fetch to /artists/id/albums
    const handleAddClick = (e) =>{

    }

    return(
        <>
            {isLoaded &&
            (

            <div className='album-list'>
                <Route exact path={match.url}>

                    <h1>User Header place holder</h1>

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
