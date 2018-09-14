import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeItemFromCart, incrementCartItem, decrementCartItem, setQuantityOfItem } from '../store/cart';
import { NavLink } from 'react-router-dom';
// import { CartItem } from './CartItem';

const mapStateToProps = state => {
    return {
        products: state.products,
        cart: state.cart,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({
    removeFromCart: id => dispatch(removeItemFromCart(id)),
    setItemQuantity: cartItem => dispatch(setQuantityOfItem(cartItem))
});

//NOTE: DUMMY FOR NOW, just lists each of the order items.
export class CartView extends Component {
    
    // handleChange(cartItem) {
    //     this.props.setQuantityOfItem(cartItem);
    // }

    render() {
        return (
            <ul>
                {this.props.cart.map(cartItem => {
                    return (
                        <li key={cartItem.id}>
                            <div>
                                <NavLink to={`/products/${cartItem.productId}`}>
                                    {/* {this.props.products[cartItem.productId].name} */}
                                    Product Link
                                </NavLink>
                            </div>
                            {/* <div>
                                <img src={`/products/${this.props.products[cartItem.productId].photoUrl}`} />
                            </div> */}
                            <div>
                                Price: {cartItem.price*cartItem.quantity}
                            </div>
                            <div>
                                Quantity: {cartItem.quantity}
                            </div>
                        </li>
                    );
                })}
            </ul>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartView);