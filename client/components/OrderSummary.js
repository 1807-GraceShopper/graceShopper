import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

class OrderSummary extends React.Component {
  render() {
    const order = this.props.order
    return (
      <div>
        <br />
        <h2 className="ui one column stackable center aligned page grid">Order Summary</h2>
        <br />
        <br />
        <div className="ui one column stackable center aligned page grid">
        <div>Price: ${order.price}</div>
        <div>Quantity: {order.quantity}</div>
        <div>Time Ordered: {order.timeOrdered}</div>
        </div>
      </div>
    )
  }
}

const ConnectedOrderSummary = withRouter(connect(mapStateToProps)(OrderSummary))
export default ConnectedOrderSummary
