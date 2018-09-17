import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeItemFromCart, setQuantityOfItem} from '../store/cart'
import {getProductsFromServer} from '../store/product'
import CartItem from './CartItem'
import Checkout from './stripe'
import {Elements, StripeProvider} from 'react-stripe-elements'
import {NavLink} from 'react-router-dom'

const mapStateToProps = state => {
    // REVIEW: be intentional about logging
    console.log('state', state)
    return {
        products: state.product.products,
        cart: state.cart,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({
    removeFromCart: id => dispatch(removeItemFromCart(id)),
    setItemQuantity: cartItem => dispatch(setQuantityOfItem(cartItem)),
    getProducts: () => dispatch(getProductsFromServer())
})

//NOTE: DUMMY FOR NOW, just lists each of the order items.
export class CartView extends Component {
    // REVIEW: consider constructor free components
    state = {
        products: [],
        cart: []
    }

    async componentDidMount() {
        if (this.props.getProducts) {
            const products = await this.props.getProducts()
            this.setState({
                products: products,
                cart: this.props.cart
            })
        }
    }

    handleChange = async (cartItem, e) => {
        cartItem.quantity = e.target.value
        await this.props.setItemQuantity(cartItem)
        const cart = this.props.cart
        this.setState({
            cart: cart
        })
    }

    render() {
        if (!this.props.products) return <div />
        return (
            <div>
                <ul>
                    {this.props.cart.map(cartItem => {
                        return (
                            <CartItem
                                key={cartItem.id}
                                cartItem={cartItem}
                                products={this.props.products}
                                handleChange={this.handleChange}
                            />
                        )
                    })}
                </ul>
                <NavLink to="/shippingInfo">
                    <button type="button">Proceed To Checkout</button>
                </NavLink>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartView)
