import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';



const Product = (props) => {
    const {img, name, price, seller, ratings} = props.product;

   const handleAddToCart = props.handleAddToCart;

    return (
        <div className='single-product'>
            <img src={img} alt="" />
            <h4>{name}</h4>
            <h5>Price: ${price}</h5>
            <p>Manufacturer: {seller}</p>
            <p className='ratings'>Ratings: {ratings}</p>
            <button onClick={()=> handleAddToCart(props.product)} className='add-to-cart-button'>Add to cart <FontAwesomeIcon icon={faShoppingCart} /></button>
        </div>
    );
};

export default Product;