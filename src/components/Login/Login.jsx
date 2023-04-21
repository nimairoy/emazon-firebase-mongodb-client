import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Login = () => {

    const {user, signInWithEmail } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    const from = location.state?.from?.pathname || '/';

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [show, setShow] = useState(false);

    const handleSingIn = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        setError('');
        setSuccess('');

        signInWithEmail(email, password)
        .then(result => {
            const logedUser = result.user;
            console.log(logedUser);
            setSuccess('Login Successfully');
            form.reset();
            navigate(from, {replace: true});
        })
        .catch(error => {
            setError(error.message);
        })

    }


    return (
        <div className="wrapper">
            <div className='form-container'>
                <h2 className='form-title'>Please Login !!</h2>
                <form onSubmit={handleSingIn}>
                    <div className="form-control">
                        <label htmlFor="">Email</label>
                        <input required type="email" name="email" id="" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="">Password</label>
                        <input required type={show ? 'text' : 'password'} name="password" id="" />
                        <p className="show-hide-button" onClick={()=> setShow(!show)}>
                            <small>
                                {
                                    show ? <span>Hide Password</span> : <span>Show Password</span>
                                }
                            </small>
                        </p>
                    </div>
                    <div className="form-control">
                        <input className='login-btn' type="submit" value="Login" id="" />
                    </div>
                    <p className='newtologin'>New to Emazon? <Link to='/signup'> Create new account</Link></p>
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

export default Login;