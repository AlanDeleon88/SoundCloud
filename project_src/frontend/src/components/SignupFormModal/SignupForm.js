import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup } from '../../store/session';
import {LogInForm} from '../LoginFormModal';

import './SignupForm.css'

const SignupForm = ({setShowModal}) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationErrorsSignup, setValidationErrorsSignup] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            username,
            password
        }
        console.log(password, confirmPassword);
        if(password === confirmPassword){

            return await dispatch(signup(user)) //! important pattern for error handling calls to the backend!!
            .then(()=>{

               history.push('/');
               setShowModal(false);

            })
            .catch(async (res) =>{
                const data = await res.json();
                const errors = data.errors;

                // console.log('response', errors);

                setHasSubmitted(true);
                // console.log('validation errors', validationErrors);

                if(data.errors && data) setValidationErrorsSignup(errors);

            })

        }
        return setValidationErrorsSignup(['Passwords Must Match!'])
        // console.log(validationErrors);

    }
    //TODO add a step sign up process, ask for email first, if valid, show rest of form. maybe.
    return(
        <>
                <form onSubmit={handleSubmit} className='signup-container'>
                    {validationErrorsSignup.length > 0 && (
                    <>
                        <ul className='error-list'>
                            {validationErrorsSignup.map((error, i) => {
                                return (
                                    <li key={i}>
                                        {error}
                                    </li>
                                )
                            })}

                        </ul>

                    </>)}
                    <div className='signup-header'>Signup</div>

                    <div className='signup-inputs'>
                        <div className='sign-up-input-bundle'>
                            <label htmlFor='firstName'>First Name</label>
                            <input id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} className='signup-input-text'/>
                        </div>

                        <div className='sign-up-input-bundle'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} className='signup-input-text'/>

                        </div>

                        <div className='sign-up-input-bundle'>
                            <label htmlFor='email'>E-mail</label>
                            <input id='email' value={email} onChange={(e) =>setEmail(e.target.value)} className='signup-input-text'/>
                        </div>

                        <div className='sign-up-input-bundle'>
                            <label htmlFor='username'>Username</label>
                            <input id='username' value={username} onChange={(e) =>setUsername(e.target.value)} className='signup-input-text'/>

                        </div>

                        <div className='sign-up-input-bundle'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' value={password} onChange={(e) =>setPassword(e.target.value)} className='signup-input-text'/>

                        </div>

                        <div className='sign-up-input-bundle'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input type='password' id='confirmPassword' value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)} className='signup-input-text'/>
                        </div>

                        <button type='submit' className='signup-button'>Signup</button>

                        <div className='sign-up-back-to-login-container'>
                            Already have an account?
                            <div className='sign-up-back-to-login-button' onClick={() => { setShowModal(false)} }>
                                Log in here
                            </div>
                        </div>
                    </div>
                </form>

        </>
    )
}

export default SignupForm;
