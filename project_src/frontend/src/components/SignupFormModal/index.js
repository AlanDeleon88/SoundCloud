import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignupForm';



const SignupFormModal = () =>{
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <div className='sign-up-back-to-login-button' onClick={() => {setShowModal(true)}}>
                Signup
            </div>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <SignUpForm setShowModal={setShowModal}/>
                    </Modal>
                </>
            )}
        </>
    )
}

export default SignupFormModal;
