import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const SignUp = () => {
    const { createUser } = useContext(AuthContext);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [show, setShow] = useState(false);

    const handleSignUp = event => {

        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        console.log(email, password, confirmPassword);

        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Your password did not match');
            return;
        }
        else if (password.length < 8) {
            setError('Password must be 8 Characters');
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('Provide at least two numbers');
            return;
        }
        else if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Provide at least two Capital letters');
            return;
        }
        else if (!/(?=.*[!@)(*&^%$#@)])/.test(password)) {
            setError('Provide at least one spacial character');
            return;
        }
        // user create function called and sign up user with email password
        createUser(email, password)
            .then(result => {
                const logedUser = result.user;
                console.log(logedUser);
                setSuccess('User created Successfully');
                form.reset();
                setError('');
            })
            .catch(error => {
                setError(error.message);
                setSuccess('');
            })


    }

    return (
        <div className="wrapper">
            <div className='form-container'>
                <h2 className='form-title'>Please Sign up !!</h2>
                <form onSubmit={handleSignUp}>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input required type="email" name="email" id="" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input required type={show ? 'text' : 'password'} name="password" id="" />
                        <p className='show-hide-button' onClick={()=>setShow(!show) }>
                            <small>
                                {
                                    show ? <span>Hide Password</span> : <span>Show Password</span>
                                }
                             </small>
                        </p>
                    </div>
                    <div className="form-control">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input required type="password" name="confirmPassword" id="" />
                    </div>
                    <div className="form-control">
                        <input className='login-btn' type="submit" value="Signup" id="" />
                    </div>
                    <p className='newtologin'>Already have an account? <Link to='/login'> login</Link></p>
                    <span className='or'>or</span>
                    <div className="form-control">
                        <button className='signingooglebutton'><img className='googleIcon' src="/public/google.png" alt="" /> Continue With Google</button>
                    </div>
                    <p className='error-text'>{error}</p>
                    <p className='success-text'>{success}</p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;