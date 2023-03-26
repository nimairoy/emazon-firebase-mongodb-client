import React from 'react';
import './Product.css';

const Product = (props) => {
    console.log(props.product)
    const {img, name, price, seller, ratings} = props.product;
    return (
        <div className='single-product'>
            <img src={img} alt="" />
            <h4>{name}</h4>
            <h5>Price: ${price}</h5>
            <p>Manufacturer: {seller}</p>
            <p className='ratings'>Ratings: {ratings}</p>
            <button className='add-to-cart-button'>Add to cart</button>
        </div>
    );
};

export default Product;