import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCartFlatbedSuitcase, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Cart = ({cart, handleClearCartButton}) => {
    // const cart = props.cart; // option 1
    // const {cart} = props; // option 2
    // console.log(cart)

    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;

    for(const product of cart){
        // 2nd way 
        // if(product.quantity===0){
        //     product.quantity = 1;
        // }
            // 1st way
        // product.quantity = product.quantity || 1; 

        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity
    }

    const tax = totalPrice*7/100;

    const grandTotal = totalPrice + totalShipping + tax;

    return (
        <div className='cart'>
            <div className="cart-title">
                <h3>Order Summary</h3>
            </div>                
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h4 className='grand-total'>Grand Total: ${grandTotal.toFixed(2)}</h4>
            <div onClick={handleClearCartButton} className='clear-cart-btn'>
                <p>Clear Cart</p>
                <FontAwesomeIcon className='clear-icon' icon={faTrashCan} />
            </div>
            <div className='checkout-cart-btn'>
                <p>Proceed Checkout</p>
                <FontAwesomeIcon className='clear-icon' icon={faCartFlatbedSuitcase} />
            </div>
        </div>
    );
};

export default Cart;