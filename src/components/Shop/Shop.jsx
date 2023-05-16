import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    // pagination
    const { totalProducts } = useLoaderData()
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const pageNumbers = [...Array(totalPages).keys()]
    // console.log(totalProducts)


    // useEffect(() => {
    //     // fetch('http://localhost:5000/products')
    //     // .then(res => res.json())
    //     // .then(data => setProducts(data))
    //     const loadData = async () => {
    //         const res = await fetch('http://localhost:5000/products');
    //         const data = await res.json();
    //         setProducts(data)
    //         // console.log(products)
    //     }
    //     loadData();
    // }, []);


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await response.json();
            setProducts(data)
        }
        fetchData();
    }, [currentPage, itemsPerPage])


    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {

                const savedCart = [];
                // step 1. get id from the stored cart
                for (const _id in storedCart) {
                    // step 2. get product by the id
                    const addedProduct = cartProducts.find(product => product._id === _id);
                    // step 3. add quantity from the addedProduct
                    if (addedProduct) {
                        const quantity = storedCart[_id];
                        addedProduct.quantity = quantity;
                        // step 4. push the product into the savedCart array
                        savedCart.push(addedProduct);
                    }
                    console.log(addedProduct)
                }
                //step 5. set the cart
                setCart(savedCart);
            })

    }, []);

    const handleAddToCart = (product) => {
        let newCart = [];
        // const newCart = [...cart, product];
        // console.log(newCart)

        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        // console.log(cart)
        addToDb(product._id);
    }


    //handle clear cart button
    const handleClearCartButton = () => {
        setCart([]);
        deleteShoppingCart();
    }

    // handle pagination selection option    
    const options = [5, 10, 20]
    const handleSelectChange = event => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0)
    }

    return (
        <>
            <div className='shop-container'>
                <div className='products-container'>
                    {
                        products.map(product => <Product
                            product={product}
                            key={product._id}
                            handleAddToCart={handleAddToCart} />)
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
            <div className='pagination'>
                <p style={{ marginBottom: '16px' }}>Current Page: {currentPage} and items per page: {itemsPerPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number}
                    </button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;