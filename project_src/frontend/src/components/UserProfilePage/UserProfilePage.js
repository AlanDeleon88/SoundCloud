import { useEffect, useState } from "react"
import { useHistory, useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import tempProfilePicture from '../LoggedInSiteHeader/temp_images/profile_placeholder.png'
import tempCover from '../LoggedInSiteHeader/temp_images/temp_cover.png'
import './UserProfilePage.css'
const UserProfilePage = () =>{
    const [isLoaded, setIsLoaded] = useState(false)
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

                <div className="user-page-header-container">
                    <div className="user-page-profile-pic-container">
                        <img src={tempProfilePicture} className="user-page-profile-pic"/>
                    </div>
                    <div className="user-page-username-container">
                        TEST USERNAME
                    </div>
                    <div className="user-page-edit-cover-container">

                    </div>
                </div>
                <img className="user-page-cover-img" src={tempCover}/>
                {/* <div className="user-page-cover-img-container">
                    <img className="user-page-cover-img"  src={tempCover}/>
                </div> */}

                <div>
                    TEST BAR HERE
                </div>

            </div>
        </>
    )

}

export default UserProfilePage
