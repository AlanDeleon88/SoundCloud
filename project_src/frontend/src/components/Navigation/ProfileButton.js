import './ProfileButton.css'
import {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';



const ProfileButton = ({user}) =>{
    const [showMenu, setShowMenu] = useState(false);
    const userDropDownMenu = [user.username, user.email]
    const dispatch = useDispatch();




    const handleClick = () => {
        setShowMenu(!showMenu);
    }
    // console.log(showMenu);

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
    }

    return (
        <>
            <i className="fa-solid fa-user" onClick={handleClick}></i>
            {showMenu && (
                <>
                    <div className='drop-down-menu'>
                        <ul style={{listStyle: 'none'}} className='user-info-list'>
                            {
                                userDropDownMenu.map((listItem, i) => {
                                    return(
                                        <li key={i} className='menu-list-item'>
                                            {listItem}
                                        </li>
                                    )
                                })
                            }
                            <li className='menu-list-item log-out-button' onClick={handleLogOut}>
                                Logout
                            </li>

                        </ul>

                    </div>
                </>
            )}

        </>
    )
}

export default ProfileButton;
