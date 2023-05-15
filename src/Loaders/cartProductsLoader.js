import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoaders = async() => {
    const loadedProducts = await fetch('http://localhost:5000/products');
    const products = await loadedProducts.json();

    // if cart data in database, you have to use async await function
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step 1. get id from the storedcart products
    for(const _id in storedCart){
        // step.2 get product by the id
        const addedProduct = products.find( product => product._id === _id);
        // step .3 check product if there is exist
        if(addedProduct){
            const quantity = storedCart[_id];
             addedProduct.quantity = quantity;
            //  step .4 push the product 
            savedCart.push(addedProduct);
        }
    }
    //notes:  if you need to return two or more things from a function then the way is:
    // 1. return [firstThing, SecondThing]
    // 2. return {firstThing, SecondThing}

    // step . 5 return 
    return savedCart;
}


export default cartProductsLoaders;

