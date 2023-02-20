import { useEffect, useState } from 'react'
import './PlaylistImage.css'

const PlaylistImage = ({songs}) =>{
    const [songImgs, setSongImgs] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() =>{
        let songObj = {}

        songs.forEach(song =>{
            songObj[song.Album.previewImage] = song.Album.previewImage
        })
        let imgArr = Object.values(songObj)
        setSongImgs([imgArr[0],imgArr[1],imgArr[2],imgArr[3]])
        setIsLoaded(true)

    },[songs])


    return(
        <>
            <div className="playlist-img-main-container">
                { isLoaded &&
                    <>
                        {songImgs.map((img,i) =>{
                            return(
                                <>{img ?
                                        (
                                            <>
                                                <img src={img} alt='' className='playlist-img-quad' key={i}/>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <div className='playlist-img-placeholder' key={i}>

                                                </div>
                                            </>
                                        )
                                    }

                                </>
                            )
                        })}
                    </>

                }

            </div>
        </>
    )
}

export default PlaylistImage
