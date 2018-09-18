import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getSingleOrderFromServer, updateStatusOnOrder} from '../store/orders'
import {getProductsFromServer} from '../store/product'
import mailer from '../utils/statusEmails'

const mapStateToProps = state => {
  return {
    order: state.orders.singleOrder,
    products: state.product.products,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleOrder: id => dispatch(getSingleOrderFromServer(id)),
  getProducts: () => dispatch(getProductsFromServer()),
  updateStatus: updateInfo => dispatch(updateStatusOnOrder(updateInfo))
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
    return product[0].name
  }

  handleSelect = event => {
    event.preventDefault()
    const id = Number(this.props.match.params.id)
    const updateInfo = {status: event.target.value, id: id}
    this.props.updateStatus(updateInfo)
  }

  render() {
    const order = this.props.order
    if (order && this.props.products && order.shippingInfo) {
      return (
        <div>
          <br />
          <h2 className="ui one column stackable center aligned page grid">Order Summary</h2>
          <br />
          <br />
          <div>
            Price: $ {order.price}
            <div>
              <div>Order Status: {order.status}</div>
              <div>Date ordered: {order.timeOrdered}</div>
              <div>User Email: {order.shippingInfo.email}</div>
            </div>
          </div>
          {order.orderItems
            ? order.orderItems.map(orderItem => {
                return (
                  <div className="ui link list" key={orderItem.id}>
                    <NavLink to={`/products/${orderItem.productId}`} className="item">
                      Product: {this.getProductName(orderItem.productId)}
                    </NavLink>
                    <div>Quantity: {orderItem.quantity}</div>
                  </div>
                )
              })
            : ''}
          {this.props.user.isAdmin ? (
            <form>
              <label>
                Change Status:
                <select name="statuses" onChange={this.handleSelect}>
                  <option value="">---</option>
                  <option value="Created">Created</option>
                  <option value="Processing">Processing</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
            </form>
          ) : (
            ''
          )}
        </div>
      )
    } else {
      return null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
