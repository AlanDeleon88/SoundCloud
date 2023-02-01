import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'


const HomeAboutLinksComponent = () =>{

    return(
        <div className='logged-nav-bar-about-bundle'>
            <NavLink to='/' className={'logged-nav-bar-home-link'}> <i className="fa fa-cloud" aria-hidden="true"></i>MixNebula</NavLink>
            <div className= "logged-nav-bar-about-links-container">
                <a href='https://github.com/AlanDeleon88' className="logged-about-links">
                    <AiFillGithub />
                </a>
                <a href='https://www.linkedin.com/in/alan-de-leon-b54621212/' className="logged-about-links">
                    <AiFillLinkedin />
                </a>
            </div>
        </div>
    )
}

export default HomeAboutLinksComponent
