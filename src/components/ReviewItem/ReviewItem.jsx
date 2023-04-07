import React from 'react';
import './ReviewItem.css';

const ReviewItem = ({product}) => {
    console.log(product)
    const {id, img, name, quantity, price, shipping} = product;
    return (
        <div className='reviewItem-card'>
            <img className='cart-image' src={img} alt="" />
            <div className="review-details">
                <h4>{name}</h4>
                <p>Pricing: {price}</p>
                <p>Quantity: {quantity}</p>
                <p>Shipping Charge: {shipping}</p>
            </div>
            <div>
            <button>Delete</button>
            </div>
        </div>
    );
};

export default ReviewItem;