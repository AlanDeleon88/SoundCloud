import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uploadFile from '../../utils/uploadFile';
import { addUserAlbum } from '../../store/albums';
import { getArtist } from '../../store/artist';
import {MdInsertPhoto, MdOutlineAddPhotoAlternate} from 'react-icons/md'
import{AiFillCloseCircle} from 'react-icons/ai'
import './CreateAlbum.css'

const CreateAlbumForm = ({setShowModal}) =>{
    const[title, setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const dispatch = useDispatch();
    const [validationErrors, setValidationErrors] = useState([]);
    const user = useSelector(state =>state.session.user)

    const updateTitle = e =>{
        setTitle(e.target.value)
    }

    const updateDescription = e =>{
        setDescription(e.target.value)
    }

    const handleAlbumClick =  async e =>{
        let albumObj = {
            title: title,
            description: description,
            imageUrl : imageUrl
        }
        // console.log(albumObj);
        return await dispatch(addUserAlbum(albumObj)).then(() =>{
            dispatch(getArtist(user.id))
            setShowModal(false)
            return null
        })
        .catch(async (res) =>{
            if(res){
                const data = await res.json()
                const errors = data.errors

                if(data.errors && data){
                    setValidationErrors(errors)
                }

            }
        })
    }

    const updateImage = e =>{
        const image = e.target.files[0]
        if(image){
            uploadFile(image, 'image').then(res =>{
                setImageUrl(res)
            }).catch(async (res) =>{
                const data = await res.json()
                console.log(data);
            })
        }
    }


    const handleDelete = e =>{
        setImageUrl('')
        // console.log('HEY CLICKED');
    }


    return(
        <div className='create-album-main-container'>
            <div className='create-album-header'>
                Create an album
            </div>
            { validationErrors &&
                <>
                    {validationErrors.map(error =>{
                        return(
                            <div className='create-album-errors error'>
                                {error}
                            </div>
                        )
                    })}
                </>

            }

            <div className='create-album-form-container'>
                <div className='create-album-upload-img-container'>
                    <div className='create-album-img-header'>
                        Add album art
                    </div>
                    <div className='create-album-img-preview-container'>
                        { imageUrl ?
                            (

                                <>

                                    <img src={imageUrl} className='create-album-img'/>
                                    <div className='create-album-img-delete'  onClick={handleDelete}>
                                        Delete image
                                    </div>

                                </>


                            )
                            :
                            (
                                <div className='create-album-img-place-holder'>
                                    <MdOutlineAddPhotoAlternate  />
                                </div>
                            )
                        }

                    </div>

                    <div className='create-album-img-upload-button'
                    onClick={() =>{
                        document.getElementById('create-album-file-input').click()
                    }}>
                        <input type='file' accept='image/*' style={{display:'none'}} onChange={updateImage} id='create-album-file-input' onClick={(e) => e.target.value = null}/>
                        Upload an image
                    </div>
                </div>

                <div className='create-album-input-container'>
                    <div className='create-album-input-form'>
                        <label>
                            Title
                        </label>
                        <input type='text' value={title} onChange={updateTitle} className='create-album-input'/>
                    </div>

                    <div className='create-album-input-form'>
                        <label>
                            Description
                        </label>
                        <input type='text' value={description} onChange={updateDescription} className='create-album-input'/>
                    </div>

                </div>

            </div>
            <div className='create-album-buttons-container'>
                <div className='create-album-buttons create-album' onClick={handleAlbumClick}>
                    Create Album
                </div>
                <div className='create-album-buttons cancel-album' onClick={()=>{setShowModal(false)}}>
                    Cancel
                </div>

            </div>

        </div>
    )

}

export default CreateAlbumForm
