import tempProfilePicture from '../../LoggedInSiteHeader/temp_images/profile_placeholder.png'
import tempCover from '../../LoggedInSiteHeader/temp_images/temp_cover.png'
import {BsFillCameraFill} from 'react-icons/bs'
import './UserProfileHeader.css'

const UserProfileHeader = ({user, currentUser, userId}) =>{


    return(

    <>
        <div className="user-page-header-container">
            <div className="user-page-profile-pic-container">

            <div className="user-page-profile-edit-container">
                <img src={tempProfilePicture} className="user-page-profile-pic"/>
                { currentUser &&
                <>
                    { currentUser.id === userId ?
                        (
                            <>
                            <button className='edit-profile-pic-button'>
                                <BsFillCameraFill />
                                    <div style={{'marginLeft' : '5px'}}>
                                            Update image
                                    </div>
                            </button>

                            </>
                        )
                        :
                        (

                            <>
                                <button className='edit-profile-pic-button placeholder' onClick={() =>{}}>
                                    <BsFillCameraFill />
                                        <div style={{'marginLeft' : '5px'}}>
                                                Update image
                                        </div>
                                </button>
                            </>
                        )

                    }

                </>

                }
            </div>

                <div className="user-page-username-container" >
                    TEST USERNAME
                </div>

            </div>
        <div className="user-page-edit-cover-container">
            {currentUser &&
                <>

                    { currentUser.id === userId &&
                            <button className="edit-cover-button">
                                <BsFillCameraFill />
                                <div style={{'marginLeft' : '5px'}}>
                                    Update image
                                </div>
                            </button>

                        }
                </>

            }
        </div>
        </div>
        <img className="user-page-cover-img" src={tempCover}/>

            {/* place holder if a user does not have a set cover img */}

        {/* <div className='user-page-cover-place-holder'> </div> */}



    </>

    )

}

export default UserProfileHeader
