import { NavLink, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadSplashSongs } from "../../store/songs";
import SongCard from "../SongCard";
import './SplashSongs.css'


const SplashSongs = () => {
    const songs = Object.values(useSelector(state => state.songs));
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(loadSplashSongs())
        .then(() =>{
            setIsLoaded(true);
        })
        .catch(async (res) =>{
            const data = await res.json();
            const errors = data.errors;
            console.log('errors', errors);

            if(data.errors && data) setErrors(errors);

        })

    },[dispatch])
    console.log(songs);
    return (
        <>

            {isLoaded ? (
                <>

                <div className="featured-songs">
                    Featured Songs
                </div>
                <ul className='splash-container'>

                    {


                        songs.map(song =>{

                            return(
                                <li key={song.id}>
                                    <SongCard song={song}/>
                                </li>
                            )

                        })


                    }

                </ul>
                </>
            )

            :

            (<h1>loading</h1>)}

        </>
    )



}

export default SplashSongs;
