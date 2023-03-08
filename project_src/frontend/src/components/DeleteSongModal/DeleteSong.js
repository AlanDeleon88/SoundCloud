import './DeleteSong.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserSong } from '../../store/songs';
import { loadUserAlbums } from '../../store/albums';
const DeleteSong = ({song, setShowDelete, setShowEditModal}) =>{
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user)

    const handleYes = async (e) =>{
        e.preventDefault();
        return await dispatch(deleteUserSong(song.id))
        .then(() => {
            setShowDelete(false);
            setShowEditModal(false);
            dispatch(loadUserAlbums(user.id))
        })
        .catch( async (res)=>{
            const data = await res.json();
            const errors = data.message;
            console.log(data);
            window.alert(errors); //!temp
        })
    }

    const handleNo = (e) =>{
        e.preventDefault();
        setShowDelete(false);

    }

    return(
        <div className="delete-window-container">
            <div className='delete-prompt'>
                Are you sure you want to delete this song?
            </div>
            <div className='button-container'>
                <button className='button yes' onClick={handleYes}>Yes</button>
                <button className='button no' onClick={handleNo}>No</button>
            </div>

        </div>
    )
}

export default DeleteSong;
