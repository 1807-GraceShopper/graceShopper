import ProductToken from '../utils/ProductToken';
import { loadCartFromLocalStorage, writeCartIntoLocalStorage } from '../utils/localStorage';

const initialState = [];

//ACTION TYPES

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_ITEM_IN_CART = 'UPDATE_ITEM_IN_CART';
const GET_CART = 'GET_CART';
const GET_CART_PRICE = 'GET_CART_PRICE';

//ACTION CREATORS
export const add = (product) => ({
    type: ADD_TO_CART,
    product
});

export const remove = (id) => ({
    type: REMOVE_FROM_CART,
    id
});

const get = (cart) => ({
    type: GET_CART,
    cart
});

const getPrice = (cart) => ({
    type: GET_CART_PRICE,
    cart
})

//REDUCER

export default function reducer(cart, action) {
    if (cart === undefined) {
        cart = loadCartFromLocalStorage();
    }
    let nextState;
    switch(action.type) {
        case ADD_TO_CART:
            const pToken = new ProductToken(action.product);
            // //should add if statement for when product exists already.
            // const matchingItem = cart.find(product => product.productId === pToken.productId);
            // if (matchingItem) {
            //     //     let updatedItem = matchingItem;
            //     console.log(matchingItem);
            //     pToken.setQuantity(matchingItem.quantity+1);
            //     // matchingItem.incrementQuantity();
            //     return cart.map(product => (
            //         product.productId === pToken.productId ? pToken: product
            //     ));
            // }
            // else {
                // let token = new ProductToken(action.product);
            nextState = [...cart, pToken];
            writeCartIntoLocalStorage(nextState);
            return nextState;
            // }
        case REMOVE_FROM_CART:
            nextState = cart.filter(product => product.productId !== action.productId);
            writeCartIntoLocalStorage(nextState);
            return nextState.filter(product => product.productId !== action.productId);
        case GET_CART:
            nextState = cart;
            writeCartIntoLocalStorage(nextState);
            return action.cart;
        case GET_CART_PRICE:
            return cart.reduce((accumulator, currentItem) => currentItem.price*currentItem.quantity + accumulator, 0);
        default:
            return cart;
    }
}

//THUNK MIDDLEWARE

export function fetchCartFromStorage() {
    return (dispatch) => {
        const cart = loadCartFromLocalStorage();
        dispatch(get(cart));
    }
}

// export function saveCartIntoStorage(cart) {
//     const stringifiedCart = JSON.stringify(cart);
//     window.localStorage.setItem('cart', stringifiedCart);
//     console.log(window.localStorage);
//   }

export function addItemToCart(product) {
    return (dispatch) => {
        dispatch(add(product));
    }
};
