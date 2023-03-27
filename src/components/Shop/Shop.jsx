import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        // fetch('products.json')
        // .then(res => res.json())
        // .then(data => setProducts(data))
        const loadData = async() => {
            const res = await fetch('products.json');
            const data = await res.json();
            setProducts(data)
            // console.log(products)
        }
        loadData();
    },[]);

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        console.log(newCart)
        setCart(newCart);
        console.log(cart)
    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                                             product = {product}
                                             key = {product.id}
                                             handleAddToCart = {handleAddToCart} />)    
                }
            </div>

            <div className="cart-container">                
                <h3>Order Summary</h3>                
                <p>Selected Item: {cart.length}</p>
            </div>
        </div>
    );
};

export default Shop;