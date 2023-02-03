import { useEffect, useState } from "react"
import { useHistory, useParams, Route} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {BsFillCameraFill} from 'react-icons/bs'
import tempProfilePicture from '../LoggedInSiteHeader/temp_images/profile_placeholder.png'
import tempCover from '../LoggedInSiteHeader/temp_images/temp_cover.png'
import './UserProfilePage.css'
import UserProfileHeader from "./UserProfileHeader"

const UserProfilePage = () =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const [showProfileButton, setShowProfileButton] = useState(false)
    const [showCoverButton, setShowCoverButton] = useState(false)
    const currentUser = useSelector(state=>state.session.user)
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
                    TEST BAR HERE
                </div>
                <div className="user-page-content-container">
                    Profile content here
                </div>

            </div>
        </>
    )

}

export default UserProfilePage
