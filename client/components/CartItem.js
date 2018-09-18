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
        associatedProduct = products.filter(product => {
          return product.id === cartItem.productId
        })[0]
        maxValue = associatedProduct.quantity
    }
    return (
        <form id="cartItemForm">
            <div className="ui one column stackable center aligned page grid">
                <img
                    className="cart-sizing"
                    src={associatedProduct ? associatedProduct.photoUrl : ''}
                />
            </div>
            <br />
            <br />
            <div className="ui one column stackable center aligned page grid">
              <div className="ui column">
                <div className="ui link list">
                <NavLink to={`/products/${cartItem.productId}`} className="item">
                    {associatedProduct ? associatedProduct.name : ''}
                </NavLink>
                </div>
            <br />
            <div>Price: ${cartItem.price * cartItem.quantity}</div>
            <div>Quantity:
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
            <br />
                <button
                    type="button"
                    className="ui red basic mini button"
                    onClick={() => props.removeFromCart(cartItem.id)}
                >
                    Remove Item
                </button>
                <hr />
                </div>
            </div>
        </form>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartItem)
