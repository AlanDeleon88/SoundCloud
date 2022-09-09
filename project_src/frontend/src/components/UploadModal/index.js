import React, {useState, useEffect} from 'react';
import { Modal } from '../../context/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { restoreUser } from '../../store/session';
import SignUpForm from '../SignupFormModal/SignupForm';
import LogInFormPage from '../LoginFormModal/LoginForm';
import { useHistory } from 'react-router-dom';
import './Upload.css'



const UploadModal = () =>{
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.session.user);


    useEffect(() =>{
        dispatch(restoreUser())
    },[dispatch]) //!causing infinite loop if i add any other dependencies.

    const handleOnUpload = (e) =>{
        e.preventDefault();
        if(currentUser){
            history.push('/me/albums')
        }
        else{
            setShowModal(true);
        }

    }


    return (
        <>
            <button onClick={handleOnUpload} className='upload-button'>Upload Songs and Albums</button>
            {showModal && (
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <SignUpForm showModal={setShowModal}/>
                        <div className='login-signup-div'>Or Login</div>
                        <LogInFormPage showModal={setShowModal}/>
                    </Modal>
                </>
            )

        }
        </>
    )
}

export default UploadModal;
