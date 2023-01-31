import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";
import { useEffect, useState } from "react";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css'
const Navigation = ({isLoaded}) => {
    const [currentUser, setCurrentUser] = useState({});
    const user = useSelector(state=>state.session.user);
    //  console.log(user);

    useEffect(() =>{
        setCurrentUser(user);
        // console.log('user changed!');
    },[user])
    let sessionLinks;

    if(currentUser){
        sessionLinks = (
            <>
                <ProfileButton user={currentUser} />
            </>
        )
    }
    else{
        sessionLinks =(
            <>
                <LoginFormModal />
                <SignupFormModal />
            </>
        )
    }
    return(
        <>


            <div className='nav-bar'>


                    <div className="home-about-container">
                        <NavLink to='/' className={'home-link'}> <i className="fa fa-cloud" aria-hidden="true"></i>MixNebula</NavLink>
                        <div className= "about-links">

                        </div>
                    </div>

                    <div className="session-links">

                        {isLoaded && sessionLinks}

                    </div>


            </div>


        </>
    )
}

export default Navigation;
