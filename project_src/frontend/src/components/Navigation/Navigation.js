import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";
const Navigation = () => {
    const currentUser = useSelector(state=>state.session.user);
    // console.log(currentUser);
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
                ) :
                (
                    <ProfileButton />
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
