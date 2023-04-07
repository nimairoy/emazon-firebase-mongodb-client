import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


const ReviewItem = ({product, handleCartRemoveItem}) => {
    // console.log(product)
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
            <div className='trash-btn-container'>
                <button onClick={()=>handleCartRemoveItem(id)} className='trash-btn'>
                 <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
        </div>
    );
};

export default ReviewItem;