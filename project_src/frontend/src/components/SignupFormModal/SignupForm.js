import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup } from '../../store/session';
import {LogInForm} from '../LoginFormModal';

import './SignupForm.css'

const SignupForm = ({showModal}) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
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
               showModal(false);

            })
            .catch(async (res) =>{
                const data = await res.json();
                const errors = data.errors;

                // console.log('response', errors);

                setHasSubmitted(true);
                console.log('validation errors', validationErrors);

                if(data.errors && data) setValidationErrors(errors);

            })

        }
        return setValidationErrors(['Passwords Must Match!'])
        // console.log(validationErrors);

    }
    //TODO add a step sign up process, ask for email first, if valid, show rest of form. maybe.
    return(
        <>
            {validationErrors.length > 0 && (
            <>
                <ul className='error-list'>
                    {validationErrors.map((error, i) => {
                        return (
                            <li key={i}>
                                {error}
                            </li>
                        )
                    })}

                </ul>

            </>)}
            <div className='signup-container'>
                <div className='signup-header'>Signup</div>
                <form onSubmit={handleSubmit}>

                    <div className='signup-inputs'>
                        <label htmlFor='firstName'>First Name</label>
                        <input id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

                        <label htmlFor='lastName'>Last Name</label>
                        <input id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)}/>

                        <label htmlFor='email'>E-mail</label>
                        <input id='email' value={email} onChange={(e) =>setEmail(e.target.value)}/>

                        <label htmlFor='username'>Username</label>
                        <input id='username' value={username} onChange={(e) =>setUsername(e.target.value)}/>

                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' value={password} onChange={(e) =>setPassword(e.target.value)}/>

                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type='password' id='confirmPassword' value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)}/>

                        <button type='submit' className='signup-button'>Signup</button>
                    </div>
                </form>

                <div>

                </div>
            </div>
        </>
    )
}

export default SignupForm;
