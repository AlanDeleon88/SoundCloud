import './ProfileButton.css'
import {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';



const ProfileButton = ({user}) =>{
    const [showMenu, setShowMenu] = useState(false);
    // const userDropDownMenu = [user.username, user.email, 'Albums']
    const dispatch = useDispatch();
    const history = useHistory();
    let username = user.username;
    const handleClick = () => {
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        if(!showMenu) return

        const closeMenu = () => {
            setShowMenu(false);
        }
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    const handleLogOut = async (e) => {
        await dispatch(logout());
        history.push('/')
    }

    return (
        <>
            <i className="fa-solid fa-user" onClick={handleClick}></i>
            {showMenu && (
                <>
                    <div className='drop-down-menu'>
                        <ul style={{listStyle: 'none'}} className='user-info-list'>
                            {

                            /* {
                                userDropDownMenu.map((listItem, i) => {
                                    return(
                                        <li key={i} className='menu-list-item'>
                                            {listItem}
                                        </li>
                                    )
                                })
                            } */
                            }
                            <li className='user-info-list-item'>{user.username}</li>
                            <li className='user-info-list-item'>{user.email}</li>
                            <li className='user-info-list-item album-link'><NavLink to={`/me/albums`}> My Albums </NavLink></li>
                            <li className='menu-list-item' onClick={handleLogOut}>
                                <button className='log-out-button'>Logout</button>
                            </li>

                        </ul>

                    </div>
                </>
            )}

        </>
    )
}

export default ProfileButton;
