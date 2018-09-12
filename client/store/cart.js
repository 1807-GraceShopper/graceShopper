import ProductToken from '../utils/ProductToken';

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

export default function reducer(cart = initialState, action) {
    switch(action.type) {
        case ADD_TO_CART:
            //should add if statement for when product exists already.
            const matchingItem = cart.find(product => product.productId === action.product.id);
            if (matchingItem) {
                let updatedItem = matchingItem;
                updatedItem.incrementQuantity();
                return cart.map(product => (
                    action.product.id === product.productId ? updatedItem : product
                ));
            }
            else {
                let token = new ProductToken(action.product);
                return [...cart, token];
            }
        case REMOVE_FROM_CART:
            return cart.filter(product => product.productId !== action.productId);
        case GET_CART:
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
        const cart = JSON.parse(window.localStorage.getItem('cart'));
        dispatch(get(cart));
    }
}