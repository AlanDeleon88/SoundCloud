import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignupForm';



const SignupFormModal = () =>{
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button onClick={() => setShowModal(true)}>Signup</button>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <SignUpForm />
                    </Modal>
                </>
            )}
        </>
    )
}

export default SignupFormModal;
