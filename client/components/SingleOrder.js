import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getSingleOrderFromServer} from '../store/orders'
import {getProductsFromServer} from '../store/product'

const mapStateToProps = state => {
  return {
    order: state.orders.singleOrder,
    products: state.product.products
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleOrder: id => dispatch(getSingleOrderFromServer(id)),
  getProducts: () => dispatch(getProductsFromServer())
})

export class SingleOrder extends Component {
  componentDidMount() {
    if (this.props.getSingleOrder) {
      const orderId = Number(this.props.match.params.id)
      this.props.getSingleOrder(orderId)
      this.props.getProducts()
    }
  }

  getProductName = id => {
    const product = this.props.products.filter(singleProd => {
      return singleProd.id === id
    })
    console.log('product', product)
    return product[0].name
  }

  render() {
    console.log('order', this.props.order)
    console.log('rpoducts', this.props.products)
    const order = this.props.order
    if (order && this.props.products) {
      return (
        <div>
          <h2>Order Summary</h2>
          <div>
            Price: $ {order.price}
            <div>
              <div>Order Status: {order.status}</div>
              <div>Date ordered: {order.timeOrdered}</div>
            </div>
          </div>
          {order.orderItems
            ? order.orderItems.map(orderItem => {
                return (
                  <div key={orderItem.id}>
                    <NavLink to={`/products/${orderItem.productId}`}>
                      Product: {this.getProductName(orderItem.productId)}
                    </NavLink>
                    <div>Quantity: {orderItem.quantity}</div>
                  </div>
                )
              })
            : ''}
        </div>
      )
    } else {
      return null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
