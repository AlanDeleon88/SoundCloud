import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";
import { useEffect, useState } from "react";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
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


            <ul className='nav-bar'>

                <li>
                    <NavLink to='/'>Home</NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>


        </>
    )
}

export default Navigation;
