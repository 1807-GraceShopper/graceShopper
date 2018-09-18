import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {getOrdersByUserServer} from '../store/orders'

const mapStateToProps = state => ({
  user: state.user,
  userOrders: state.orders.userOrders,
  products: state.product.products
})

const mapDispatchToProps = dispatch => ({

	getOrders: userId => dispatch(getOrdersByUserServer(userId))
})

class AllUserOrders extends React.Component {
	componentDidMount() {
		const userId = this.props.user.id
		this.props.getOrders(userId)
	}
	render() {
		if (this.props.userOrders.length && this.props.products.length) {
			return (
				<div>
					<br />
					<h2 className="ui one column stackable center aligned page grid">All Orders</h2>
					<br />
					<ul className="ui link list">
						{this.props.userOrders.map(order => {
							return (
								<li key={order.id}>
									<div>
										<NavLink to={`/orders/${order.id}`} className="item">
											Order Information
										</NavLink>
										<div>Order Status: {order.status}</div>
									</div>
									<br />
								</li>
							)
						})}
					</ul>
				</div>
			)
		} else return null
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(AllUserOrders)
