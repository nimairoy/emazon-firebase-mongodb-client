import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRightLong} from '@fortawesome/free-solid-svg-icons';
import './Shop.css';
import { Link } from 'react-router-dom';

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

    useEffect(()=>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1. get id from the stored cart
        for(const id in storedCart){
            // step 2. get product by the id
           const addedProduct = products.find(product => product.id === id);
           // step 3. add quantity from the addedProduct
           if(addedProduct){
                 const quantity = storedCart[id];
                 addedProduct.quantity = quantity;  
                 // step 4. push the product into the savedCart array
                 savedCart.push(addedProduct);     
           }                     
           console.log(addedProduct)
        }
        //step 5. set the cart
        setCart(savedCart);

    },[products]);

    const handleAddToCart = (product) => {
        let newCart = [];
        // const newCart = [...cart, product];
        // console.log(newCart)

        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart= [...remaining, exists];
        }

        setCart(newCart);
        // console.log(cart)
         addToDb(product.id);
    }


    //handle clear cart button
    const handleClearCartButton = () => {
        setCart([]);
        deleteShoppingCart();
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
                <Cart 
                    cart={cart} 
                    handleClearCartButton={handleClearCartButton}
                >
                    <Link to={'/orders'}>
                        <div className='checkout-cart-btn'>
                            <p>Review Order</p>
                            <FontAwesomeIcon className='clear-icon' icon={faArrowRightLong} />
                        </div>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;