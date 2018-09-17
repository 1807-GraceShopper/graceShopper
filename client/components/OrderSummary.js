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
    console.log('singleOrder', order)
    return (
      <div>
        <h3 className="listHeader center">Order Summary</h3>
        <div>{order.price}</div>
        <div>{order.quantity}</div>
        <div>{order.timeOrdered}</div>
      </div>
    )
  }
}

const ConnectedOrderSummary = withRouter(connect(mapStateToProps)(OrderSummary))
export default ConnectedOrderSummary
