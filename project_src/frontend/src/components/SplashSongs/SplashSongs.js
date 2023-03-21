
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { loadSplashSongs } from "../../store/songs";
import {MdArrowForwardIos} from 'react-icons/md'
import {MdArrowBackIosNew} from 'react-icons/md'
import SongCard from "../SongCard";
import './SplashSongs.css'
import uploadMultiFiles from "../../utils/uploadMultiFiles";


const SplashSongs = () => {
    const songs = Object.values(useSelector(state => state.songs));
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState([]);
    const scrollRef = useRef()
    const dispatch = useDispatch();

    const handleLeftArrow = e =>{
        scrollRef.current.scrollLeft -= 400


    }
    const handleRightArrow = e =>{
        scrollRef.current.scrollLeft += 400
    }

    const enterLeft = e =>{
        scrollRef.current.scrollLeft -= 20


        setTimeout(() =>{
            // console.log(scrollRef.current.scrollLeft);
            if(scrollRef.current.scrollLeft > 0){
                scrollRef.current.scrollLeft += 20
            }
        }, 250)

    }

    const enterRight = e =>{
        const prevScroll = scrollRef.current.scrollLeft
        scrollRef.current.scrollLeft += 20

        setTimeout(() =>{
            // console.log('scroll progress', scrollRef.current.scrollLeft);
            // console.log('current width', scrollRef.current.clientWidth);
            if(scrollRef.current.scrollLeft !== prevScroll){
                scrollRef.current.scrollLeft -= 20
            }
        }, 250)

    }



    useEffect(() =>{
        dispatch(loadSplashSongs())
        .then(() =>{
            setIsLoaded(true);
        })
        .catch(async (res) =>{
            const data = await res.json();
            const errors = data.errors;
            // console.log('errors', errors);

            if(data.errors && data) setErrors(errors);

        })

    },[dispatch])
    // console.log(songs);
    return (
        <>

            {isLoaded ? (
                <>

                <div className="featured-songs">
                    Featured Songs
                </div>
                <div className="splash-outer-container">
                    <div className="splash-arrow-container">
                        <MdArrowBackIosNew className="splash-arrow mix-neb-option-button" onClick={handleLeftArrow} onMouseEnter={enterLeft}/>
                    </div>
                    <div className='splash-container' ref={scrollRef}>

                        {


                            songs.map(song =>{

                                return(
                                    <div key={song.id}>
                                        <SongCard song={song}/>
                                    </div>
                                )

                            })


                        }


                    </div>
                    <div className="splash-arrow-container">
                        <MdArrowForwardIos className="splash-arrow mix-neb-option-button" onClick={handleRightArrow} onMouseEnter={enterRight}/>
                    </div>
                </div>

                </>
            )

            :

            (<h1>loading</h1>)}

        </>
    )



}

export default SplashSongs;
