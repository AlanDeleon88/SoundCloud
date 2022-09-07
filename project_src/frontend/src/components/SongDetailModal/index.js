import React, {useState } from 'react';
import { Modal } from '../../context/Modal';
import SongDetail from './SongDetail';
import './SongDetail.css'

const SongDetailModal = ({song, album, artist}) => {
    const [showModal, setShowModal] = useState(false);


    //!might have to render the songs in here instead of on the album song list page.
    return (
        <>
            <div onClick={() => setShowModal(true)}>

                {song.title}

            </div>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <SongDetail showModal={setShowModal} song={song} album={album} artist={artist}/>
                    </Modal>
                </>
            )}
        </>
    )
}

export default SongDetailModal;
