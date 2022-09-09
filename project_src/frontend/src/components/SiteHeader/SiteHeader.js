import Navigation from "../Navigation";
import './SiteHeader.css'

const SiteHeader = ({isLoaded}) => {

    return(
        <>
            <div className='header'>
                
                <div className="nav-container">

                    <Navigation isLoaded={isLoaded} />

                </div>

            </div>

        </>
    )
}


export default SiteHeader;
