// use local storage to manage cart data
const addToDb = _id => {
    let shoppingCart = getShoppingCart();
    // add quantity
    const quantity = shoppingCart[_id];
    if (!quantity) {
        shoppingCart[_id] = 1;
    }
    else {
        const newQuantity = quantity + 1;
        shoppingCart[_id] = newQuantity;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
}

const removeFromDb = _id => {
    const shoppingCart = getShoppingCart();
    if (_id in shoppingCart) {
        delete shoppingCart[_id];
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    }
}

const getShoppingCart = () => {
    let shoppingCart = {};

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('shopping-cart');
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart);
    }
    return shoppingCart;
}

const deleteShoppingCart = () => {
    localStorage.removeItem('shopping-cart');
}

export {
    addToDb,
    removeFromDb,
    getShoppingCart,
    deleteShoppingCart
}
