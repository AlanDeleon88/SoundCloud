import { useEffect, useState } from 'react'
import './PlaylistImage.css'

const PlaylistImage = ({songs, forAddToPlaylist, forFeaturedList}) =>{
    const [songImgs, setSongImgs] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() =>{
        let songObj = {}

        songs.forEach(song =>{
            if(song.Album){
                songObj[song.Album.previewImage] = song.Album.previewImage
            }
            else{
                songObj[song.previewImage] = song.previewImage
            }
        })
        let imgArr = Object.values(songObj)
        setSongImgs([imgArr[0],imgArr[1],imgArr[2],imgArr[3]])
        setIsLoaded(true)

    },[songs])


    return(
        <>
            <div className={forAddToPlaylist ? "playlist-img-main-container-small" : forFeaturedList ? "playlist-img-featured-main-container" : "playlist-img-main-container"}>
                { isLoaded &&
                    <>
                        {songImgs.map((img,i) =>{
                            return(
                                <>{img ?
                                        (
                                            <>
                                                <img src={img} alt='' className={forAddToPlaylist ? 'playlist-img-quad-small': forFeaturedList ? "playlist-img-quad-featured" : 'playlist-img-quad'} key={i}/>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <div className={forAddToPlaylist ? 'playlist-img-placeholder-small' :  forFeaturedList ? "playlist-img-placeholder-featured" : 'playlist-img-placeholder'} key={i}>

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
