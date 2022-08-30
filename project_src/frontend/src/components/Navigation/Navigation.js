import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";
import { useEffect, useState } from "react";
const Navigation = ({isLoaded}) => {
    const [currentUser, setCurrentUser] = useState({});
    const user = useSelector(state=>state.session.user);
    //  console.log(user);

    useEffect(() =>{
        setCurrentUser(user);
        // console.log('user changed!');
    },[user])
    // console.log(isLoaded);
    return(
        <>


            <ul className='nav-bar'>
                {!currentUser ? (
                    <>
                        <li>
                            <NavLink to='/login'>Login</NavLink>
                        </li>

                        <li>
                            <NavLink to='/signup'>Signup</NavLink>
                        </li>

                    </>
                )
                :
                (
                    <>

                        {isLoaded && (

                            <ProfileButton user={currentUser}/>

                        )}
                        
                    </>

                )

                 }
                <li>

                    <NavLink to='/'>Home</NavLink>
                </li>
            </ul>


        </>
    )
}

export default Navigation;
