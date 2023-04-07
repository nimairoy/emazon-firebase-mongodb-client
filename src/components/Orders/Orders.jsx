import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { removeFromDb } from '../../utilities/fakedb';
import { deleteShoppingCart } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData();

    // useState
    const [cart, setCart] = useState(savedCart)

    // handle the cart remove hanlder function
    const handleCartRemoveItem = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
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
                             key={product.id}
                             product ={product} 
                             handleCartRemoveItem={handleCartRemoveItem}                         
                            ></ReviewItem>)
                    }
            </div>
            <div className="cart-container">
                <Cart 
                     cart={cart} 
                     handleClearCartButton ={ handleClearCartButton }
                 />
            </div>
        </div>
    );
};

export default Orders;