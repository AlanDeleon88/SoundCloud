import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignupForm';



const SignupFormModal = () =>{
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button onClick={() => setShowModal(true)} className='home-sign'>Signup</button>
            {showModal &&(
                <>
                    <Modal onClose={() => setShowModal(false)}>
                        <SignUpForm showModal={setShowModal}/>
                    </Modal>
                </>
            )}
        </>
    )
}

export default SignupFormModal;
