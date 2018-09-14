import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeItemFromCart, incrementCartItem, decrementCartItem, setQuantityOfItem } from '../store/cart';
import { NavLink } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        cart: state.cart,
        user: state.user,
        products: state.products
    }
};

const mapDispatchToProps = dispatch => ({
    removeFromCart: id => dispatch(removeItemFromCart(id)),
    incrementItem: cartItem => dispatch(incrementCartItem(cartItem)),
    decrementItem: cartItem => dispatch(decrementCartItem(cartItem)),
    setQuantity: cartItem => dispatch(setQuantityOfItem(cartItem))
});

class CartItem extends Component {
    render () {
        const { cart, products } = this.props;
        if (!cart || cart.length <= 0) return <div />
        const cartItem = cart.find(citem => citem.id === this.props.match.params.id);
        if (!cartItem) return (<div><h1>Cart Item does not exist</h1></div>);
        const associatedProduct = products.find(product => product.id === cartItem.productId);
        return(
            <form onSubmit={this.handleSubmit} id="cartItemForm">
                <li className="media">
                    <div className="media-left">
                        <img className="media-object" src={associatedProduct.photoUrl} alt="image" />
                    </div>
                    <div className="media-body">
                        <h3><NavLink to={`/products/${cartItem.productId}`}>{associatedProduct.name}</NavLink></h3>
                            <input type="number" name="quantity" value={cartItem.quantity} min={1} max={associatedProduct.quantity} step={1} />

                    </div>
                </li>
            </form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);