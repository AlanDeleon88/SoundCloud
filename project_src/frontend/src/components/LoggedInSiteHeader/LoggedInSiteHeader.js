import './LoggedInSiteHeader.css'
import HomeAboutLinksComponent from './HomeAboutLinksComponent'
import UserNavAreaComponent from './UserNavAreaComponent'
import { useSelector } from 'react-redux'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'


const LoggedInSiteHeader = () =>{

    const user = useSelector(state=>state.session.user)

    return(
        <>
            <div className='logged-nav-outer-container'>


            <div className='logged-nav-bar-container'>
                    <div className='logged-nav-bar-home-about-container'>

                        <HomeAboutLinksComponent />

                    </div>
                    <div className='logged-nav-search-bar'>
                        {/*Replace with search component */}
                        <input type='text' placeholder='Search Artists'/>
                    </div>

                    {
                        user ?
                        (
                            <>
                                <div className='logged-user-area-container'>
                                    <UserNavAreaComponent user={user}/>
                                </div>
                            </>
                        )
                        :
                        (
                            <>
                                    <div className='login-modal-container'>
                                        <LoginFormModal />
                                    </div>
                                    {/* <SignupFormModal /> */}
                            </>
                        )


                    }

                </div>
            </div>
        </>
    )
}

export default LoggedInSiteHeader
