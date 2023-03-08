import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { login } from '../../store/session';
import {useHistory} from 'react-router-dom';
import { Modal } from '../../context/Modal';
import SignupForm from '../SignupFormModal/SignupForm';
import SignupFormModal from '../SignupFormModal';

import './LoginForm.css'


const LogInFormPage = ({showModal}) =>{
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [showSignup, setShowSignUp] = useState(false)
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            credential,
            password
        }
        // console.log(user);
        await dispatch(login(user)) //! important pattern for error handling calls to the backend!!
        .then(()=>{

           history.push('/');
           showModal(false);

        })
        .catch(async (res) =>{
            const data = await res.json();
            // console.log(data.errors);
            data.errors && setValidationErrors(data.errors);
            setHasSubmitted(true);
            console.log(validationErrors);
        })

    }

    return (
        <>
            <div className='login-container'>
                {validationErrors.length > 0 && (
                <>
                    <ul>
                        {validationErrors.map(error => {
                            return (
                                <li>
                                    {error}
                                </li>
                            )
                        })}

                    </ul>

                </>)}
                <div className='login-header'>
                    Login to your account
                </div>

                <form onSubmit={handleSubmit} className='form-container'>

                        <div className='login-email-container'>
                            <label htmlFor='usernameOrEmail' className='login-label'>Email</label>
                            <input id='userNameOrEmail' type='text' value={credential} required onChange={(e) => setCredential(e.target.value)} className='login-form-input'/>
                        </div>

                        <div className='login-password-container'>
                            <label htmlFor='credential' className='login-label'>Password</label>
                            <input id='credential' type='password' value={password}  required onChange={(e) => setPassword(e.target.value)} className='login-form-input'/>
                        </div>

                        <div className='login-buttons-container'>
                            <button type='submit' className='login-button mix-neb-button mix-neb-confirm'>Login</button>
                            <button className='login-button-demo mix-neb-button mix-neb-confirm' onClick={async (e) =>{
                                    e.preventDefault();
                                    const user ={
                                        credential:'Demo-lition',
                                        password: 'password'
                                    }
                                    await dispatch(login(user)) //! important pattern for error handling calls to the backend!!
                                    .then(()=>{

                                    history.push('/');
                                    showModal(false);

                                    })

                                }}> Demo Login
                                </button>
                            </div>
                                <div className='login-signup-prompt'>
                                    Already have an account? <div className='login-signup-link'>
                                        <SignupFormModal />
                                    </div>
                                </div>
                </form>



            </div>
        </>
    )

}

export default LogInFormPage;
