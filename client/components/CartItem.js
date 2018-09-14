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
            <div className="list-group-item min-content cart-item">
                <div className="media cart-item-content">
                    <div className="media">
                        <div className="media-left container">
                            <img className='media-object' src={product.photoUrl} height={40} weight={40} />
                        </div>
                    </div>
                    <div>
                        {/* <h3><NavLink to=</h3> */}
                    </div>
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);