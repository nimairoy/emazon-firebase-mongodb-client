import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { removeFromDb } from '../../utilities/fakedb';
import { deleteShoppingCart } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCartFlatbedSuitcase } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
    const savedCart = useLoaderData();
    // console.log(savedCart)
    // useState
    const [cart, setCart] = useState(savedCart)

    // handle the cart remove hanlder function
    const handleCartRemoveItem = (_id) => {
        // console.log(_id)
        const remaining = cart.filter(product => product._id !== _id);
        setCart(remaining);
        removeFromDb(_id);
    }

    //handle clear cart button
    const handleClearCartButton = () =>{
        setCart([]);
        deleteShoppingCart();
    }


    return (
        <div className='shop-container'>
            <div className="reviewItem-container">
                    {
                        cart.map(product => <ReviewItem
                             key={product._id}
                             product ={product} 
                             handleCartRemoveItem={handleCartRemoveItem}                         
                            ></ReviewItem>)
                    }
            </div>
            <div className="cart-container">
                <Cart 
                     cart={cart} 
                     handleClearCartButton ={ handleClearCartButton }
                 >
                    <Link to={'/checkout'}>
                        <div className='checkout-cart-btn'>
                            <p>Proceed Checkout</p>
                            <FontAwesomeIcon className='clear-icon' icon={faCartFlatbedSuitcase} />
                        </div>
                    </Link> 
                 </Cart>
            </div>
        </div>
    );
};

export default Orders;