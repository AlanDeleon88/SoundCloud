import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addUserAlbum } from '../../store/albums';
import uploadFile from '../../utils/uploadFile';
import {MdInsertPhoto, MdOutlineAddPhotoAlternate} from 'react-icons/md'
import './CreateAlbum.css'

const CreateAlbumForm = ({setShowModal}) =>{
    const[title, setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const updateTitle = e =>{
        setTitle(e.target.value)
    }

    const updateDescription = e =>{
        setDescription(e.target.value)
    }


    return(
        <div className='create-album-main-container'>
            <div className='create-album-header'>
                Create an album
            </div>

            <div className='create-album-form-container'>
                <div className='create-album-upload-img-container'>
                    <div className='create-album-img-header'>
                        Add album art
                    </div>
                    <div className='create-album-img-preview-container'>
                        { imageUrl ?
                            (

                                <img src={imageUrl} className='create-album-img'/>
                            )
                            :
                            (
                                <div className='create-album-img-place-holder'>
                                    <MdOutlineAddPhotoAlternate />
                                </div>
                            )
                        }

                    </div>

                    <div className='create-album-img-upload-button'
                    onClick={() =>{
                        document.getElementById('create-album-file-input').click()
                    }}>
                        <input type='file' accept='image/*' style={{display:'none'}} id='create-album-file-input'/>
                        Upload an image
                    </div>
                </div>

                <div className='create-album-input-container'>
                    <form onSubmit={''} className='create-album-input-form'>
                        <label>
                            Title
                        </label>
                        <input type='text' value={title} onChange={updateTitle} className='create-album-input'/>
                    </form>

                    <form onSubmit={''} className='create-album-input-form'>
                        <label>
                            Description
                        </label>
                        <input type='text' value={description} onChange={updateDescription} className='create-album-input'/>
                    </form>

                </div>

            </div>
            <div className='create-album-buttons-container'>
                <div className='create-album-buttons create-album'>
                    Create Album
                </div>
                <div className='create-album-buttons cancel-album'>
                    Cancel
                </div>

            </div>

        </div>
    )

}

export default CreateAlbumForm
