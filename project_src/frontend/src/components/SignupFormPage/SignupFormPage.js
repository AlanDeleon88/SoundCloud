import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup } from '../../store/session';


const SignupFormPage = () => {
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
        // console.log(user);
        if(password === confirmPassword){

            await dispatch(signup(user)) //! important pattern for error handling calls to the backend!!
            .then(()=>{

            //    history.push('/');


            })
            .catch(async (res) =>{
                const data = await res.json();
                // console.log(data.errors);
                data.errors && await setValidationErrors(data.errors);
                setHasSubmitted(true);
                // console.log(validationErrors);
            })

        }
        setValidationErrors(['Passwords Must Match!'])
        // console.log(validationErrors);
        return;
    }
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
            <div className='sign-up-container'>
                <form onSubmit={handleSubmit}>
                    <div className='sign-up-inputs'>
                        <label htmlFor='firstName'>First Name</label>
                        <input id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

                        <label htmlFor='lastName'>Last Name</label>
                        <input id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)}/>

                        <label htmlFor='email'>E-mail</label>
                        <input id='email' value={email} onChange={(e) =>setEmail(e.target.value)}/>

                        <label htmlFor='username'>Username</label>
                        <input id='username' value={username} onChange={(e) =>setUsername(e.target.value)}/>

                        <label htmlFor='password'>Password</label>
                        <input id='password' value={password} onChange={(e) =>setPassword(e.target.value)}/>

                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input id='confirmPassword' value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)}/>

                        <button type='submit' className='signup-button'>Signup</button>


                    </div>
                </form>

            </div>
        </>
    )
}

export default SignupFormPage;
