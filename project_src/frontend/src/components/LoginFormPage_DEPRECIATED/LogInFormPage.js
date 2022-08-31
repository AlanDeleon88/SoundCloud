import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { login } from '../../store/session';
import {useHistory} from 'react-router-dom';

import './LogInFormPage.css'


const LogInFormPage = () =>{
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
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
            <div className='login-container'>

                <form onSubmit={handleSubmit}>
                        <div className='login-input'>
                            <label htmlFor='usernameOrEmail'>Username or Email</label>
                            <input id='userNameOrEmail' type='text' value={credential} required onChange={(e) => setCredential(e.target.value)} />


                            <label htmlFor='credential'>password</label>
                            <input id='credential' type='password' value={password}  required onChange={(e) => setPassword(e.target.value)} />

                        </div>

                    <button type='submit' className='login-button'>Login</button>
                </form>

            </div>
        </>
    )

}

export default LogInFormPage;
