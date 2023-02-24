import './DeleteSong.css'
import { useDispatch } from 'react-redux';
import { deleteUserSong } from '../../store/songs';
const DeleteSong = ({song, setShowDelete}) =>{
    const dispatch = useDispatch();

    const handleYes = async (e) =>{
        e.preventDefault();
        return await dispatch(deleteUserSong(song.id))
        .then(() => {
            setShowDelete(false);
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
