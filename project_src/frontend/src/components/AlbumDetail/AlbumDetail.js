import './AlbumDetail.css'
import {useState} from 'react'

const AlbumDetail = ({album}) => {
    const {title, id, previewImage, userId} = album;
    //TODO when you click on the element change the icon arrow to an arrow pointing down.
    //TODO when a user clicks on the album a drop down of its songs will render.
    return(
        <>
            <div className="album-container">
                <div className='chevron'>
                    <i className="fas fa-chevron-right"></i>
                </div>
                <div className='album-title'>
                    {title}
                </div>
                <div className='edit-album'>
                    Edit
                </div>
            </div>

        </>
    )

}

export default AlbumDetail;
