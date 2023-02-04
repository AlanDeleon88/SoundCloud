import { useEffect, useState } from "react"
import { useHistory, useParams, Route, Switch, NavLink, useRouteMatch} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {BsFillCameraFill} from 'react-icons/bs'
import tempProfilePicture from '../LoggedInSiteHeader/temp_images/profile_placeholder.png'
import tempCover from '../LoggedInSiteHeader/temp_images/temp_cover.png'
import './UserProfilePage.css'
import UserProfileHeader from "./UserProfileHeader"
import TrackComponent from "../TrackComponent"
import ReactAudioPlayer from "react-audio-player"
import AddSongModal from "../AddSongModal"
const UserProfilePage = () =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const [showProfileButton, setShowProfileButton] = useState(false)
    const [showCoverButton, setShowCoverButton] = useState(false)
    const currentUser = useSelector(state=>state.session.user)
    const match = useRouteMatch();
    let {username,userId} = useParams();
    userId = Number(userId)
    const history = useHistory();
    const dispatch = useDispatch();
    // console.log(typeof userId);
    // console.log(username);

    useEffect(() =>{

    },[dispatch])

    return(
        <>
            <div className="user-page-main-container">
                <UserProfileHeader user='' currentUser={currentUser} userId={userId}/>

                <div className="user-page-nav-bar-container">
                    {/* Make these nav links for active class later  */}
                    <NavLink to={`${match.url}`} exact={true} className='user-page-nav-link' activeClassName="user-page-nav-active">
                        All
                    </NavLink>
                    <NavLink to={`${match.url}/tracks`} className='user-page-nav-link' activeClassName="user-page-nav-active">
                        Tracks
                    </NavLink>
                    <NavLink to={`${match.url}/albums`} className='user-page-nav-link' activeClassName="user-page-nav-active">
                        Albums
                    </NavLink>
                    <NavLink to={`${match.url}/playlists`} className='user-page-nav-link' activeClassName="user-page-nav-active">
                        Playlists
                    </NavLink>
                </div>
                <div className="user-page-content-container">
                    <div className="user-page-content">
                        <Switch>
                            <Route path={`${match.url}`} exact={true}>
                                All of my stuff
                                {/* <TrackComponent /> */}
                                <ReactAudioPlayer src='https://aa-sound-cloud.s3.us-west-1.amazonaws.com/1675133731452.mp3' controls/>
                                
                            </Route>
                            <Route path={`${match.url}/tracks`}>
                                Tracks
                            </Route>
                            <Route path={`${match.url}/albums`}>
                                albums
                            </Route>
                            <Route path={`${match.url}/playlists`}>
                                Playlists
                            </Route>


                        </Switch>
                    </div>
                    <div className="user-page-stats-container">
                        State Badge Here
                    </div>
                </div>

            </div>
        </>
    )

}

export default UserProfilePage
