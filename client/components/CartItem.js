import React from 'react'
import {connect} from 'react-redux'
import {removeItemFromCart, setQuantityOfItem} from '../store/cart'
import {NavLink} from 'react-router-dom'

const mapStateToProps = state => {
    return {
        cart: state.cart,
        user: state.user,
        products: state.product.products
    }
}

const mapDispatchToProps = dispatch => ({
    removeFromCart: id => dispatch(removeItemFromCart(id)),
    setQuantity: cartItem => dispatch(setQuantityOfItem(cartItem))
})

const CartItem = props => {
    let maxValue
    let associatedProduct
    const {cartItem, products, handleChange} = props
    if (!products || products.length < 1) return <div>Loading...</div>
    if (cartItem.productId) {
        associatedProduct = products[cartItem.productId]
        maxValue = associatedProduct.quantity
    }
    return (
        <form id="cartItemForm">
            <div>
                <img
                    src={associatedProduct ? associatedProduct.photoUrl : ''}
                />
            </div>
            <div>
                <NavLink to={`/products/${cartItem.productId}`}>
                    {associatedProduct ? associatedProduct.name : ''}
                </NavLink>
                <button
                    type="button"
                    onClick={() => props.removeFromCart(cartItem.id)}
                >
                    Remove Item
                </button>
            </div>
            <div>{cartItem.price * cartItem.quantity}</div>
            <div>
                <input
                    type="number"
                    name="quantity"
                    value={cartItem.quantity}
                    onChange={e => handleChange(cartItem, e)}
                    min={1}
                    max={maxValue}
                    step={1}
                />
            </div>
        </form>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartItem)
