import React, { useContext } from 'react';
import logo from '../../images/Logo.svg';
import './Header.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    // handle sign out event handler 
    const handleSignOut = () => {
        logOut()
        .then(()=> {
            alert('Sign Out Successfully');
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    return (
        <nav className='header'>
            <Link to={'/'}><img className='logo' src={logo} alt="" /></Link>

            helooooooooooooooooooooooooooooooooooooooooooooo
            <div className='nav-items'>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                { user 
                ? 
                <>
                    <Link onClick={handleSignOut} >Sign out</Link>
                    <span className='userEmail'>{user.email}</span>
                </>
                 : 
                 ''
                 }
            </div>
        </nav>
    );
};

export default Header;