import React from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';

const Orders = () => {
    const carts = useLoaderData();
    console.log(carts)
    return (
        <div className='shop-container'>
            <div className="products-container">
                    <h1>Products in cart {carts.length}</h1>
            </div>
            <div className="cart-container">
                <Cart cart={carts} />
            </div>
        </div>
    );
};

export default Orders;