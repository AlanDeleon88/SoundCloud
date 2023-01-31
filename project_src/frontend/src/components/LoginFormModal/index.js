import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';


const LoginFormModal = () => {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button onClick={() => setShowModal(true)} className='home-log'> Login </button>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginForm showModal={setShowModal}/>
                    </Modal>
                </>
            )}
        </>
    )

}

export default LoginFormModal;
