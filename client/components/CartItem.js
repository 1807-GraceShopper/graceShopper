//NOTE: NOT DONE!

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
    constructor(props) {
        super(props);
        this.state = {
            cartItem: {}
        }
        this.onQuantityChange = this.onQuantityChange.bind(this);
    }

    componentDidMount() {
        const cartItem = this.props.cart.find(item => item.id === Number(this.props.match.params.id));
        this.setState({
            cartItem
        });
    }

    onQuantityChange(event) {
        event.preventDefault();
        let itemCopy = Object.assign({}, this.state.cartItem);
        itemCopy.quantity = event.target.quantity;
        this.setState({
            cartItem : itemCopy
        });
        this.props.setQuantity(this.state.cartItem);
    }

    render () {
        const { cart, products } = this.props;
        if (!cart || cart.length <= 0) return <div />
        const cartItem = cart.find(citem => citem.id === Number(this.props.match.params.id));
        if (!this.state.cartItem) return (<div><h1>Cart Item does not exist</h1></div>);
        const associatedProduct = products.find(product => product.id === cartItem.productId);
        return(
            <div>
                <form id="cartItemForm">
                    <div> </div> {/* image div */}
                    <div> </div> {/* name, delete option*/}
                    <div> </div> {/* price*/}
                    <div> </div> {/* quantity, put input here*/}
                    <input type="number" name="quantity" value={this.state.cartItem.quantity} onChange={this.onQuantityChange} min={1} max={associatedProduct.quantity} step={1} />
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);