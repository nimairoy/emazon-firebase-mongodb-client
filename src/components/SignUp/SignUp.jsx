import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className="wrapper">
            <div className='form-container'>
                <h2 className='form-title'>Please Sign up !!</h2>
                <form>
                    <div className="form-control">
                        <label htmlFor="">Email</label>
                        <input required type="email" name="email" id="" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="">Password</label>
                        <input required type="password" name="password" id="" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="">Confirm Password</label>
                        <input required type="password" name="password" id="" />
                    </div>
                    <div className="form-control">
                        <input className='login-btn' type="submit" value="Signup" id="" />
                    </div>
                    <p className='newtologin'>Already have an account? <Link to='/login'> login</Link></p>
                    <span className='or'>or</span>
                    <div className="form-control">
                        <button className='signingooglebutton'><img className='googleIcon' src="/public/google.png" alt="" /> Continue With Google</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;