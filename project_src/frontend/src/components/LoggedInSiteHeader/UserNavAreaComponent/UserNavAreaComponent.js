import placeholderProfile from '../temp_images/profile_placeholder.png';
import './UserNavAreaComponent.css';
import{useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/session';
import { NavLink, useHistory } from 'react-router-dom';
import { RiAlbumFill, RiLogoutBoxRLine } from "react-icons/ri";
import {GiMusicalNotes} from 'react-icons/gi'
import {BsMusicNoteList} from 'react-icons/bs'
//RiAlbumFill

const UserNavAreaComponent = ({user}) =>{
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleProfileClick = e => {
        setShowMenu(true)
    }

    const handleLogOut = e=>{
        dispatch(logout()).then(res =>{

            history.push('/')
        })
    }

    const handleAlbumClick = e =>{
        //Temp route, will eventually lead to profile page
        history.push(`/${user.username}/${user.id}/albums`)
    }

    const handleTracksClick = e =>{
        history.push(`/${user.username}/${user.id}`)
    }

    const handlePlaylistClick = e =>{
        history.push(`/${user.username}/${user.id}/playlists`)
    }

    useEffect(() => {
        if(!showMenu) return

        const closeMenu = () => {
            setShowMenu(false);
        }
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    return(
        <>
            <div className='logged-profile-upload-container'>
            <button style={{'opacity' : '0'}}>
                Upload
            </button>
            <div className='logged-profile-container' onClick={handleProfileClick}>
                <div className='logged-profile-pic-container'>
                    <img src={user.profile_picture} className='logged-profile-pic'/>
                </div>
                <div className='logged-profile-username'>
                    {user.username}
                </div>
            </div>
        </div>
        {showMenu &&
            <div className='logged-drop-down-menu-container'>
                <div className='logged-drop-down-item logged-tracks'>
                    <GiMusicalNotes />
                    <div className='logged-list-text' onClick={handleTracksClick}>
                        Tracks

                    </div>
                </div>
                <div className='logged-drop-down-item logged-albums' onClick={handleAlbumClick}>

                    <RiAlbumFill />
                    <div className='logged-list-text'>
                        Albums
                    </div>

                </div>
                <div className='logged-drop-down-item logged-playlist' onClick={handlePlaylistClick}>
                    <BsMusicNoteList />
                    <div className='logged-list-text'>
                        Playlist

                    </div>
                </div>
                <div className='logged-drop-down-item logged-logout' onClick={handleLogOut}>
                    <RiLogoutBoxRLine />
                    <div className='logged-list-text'>
                        Log out

                    </div>
                </div>
            </div>
        }
    </>
    )
}

export default UserNavAreaComponent
