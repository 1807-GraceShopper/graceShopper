import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {getOrdersByUserServer} from '../store/orders'
import {getProductsFromServer} from '../store/product'

const mapStateToProps = state => ({
	user: state.user,
	userOrders: state.orders.userOrders,
	products: state.product.products
})

const mapDispatchToProps = dispatch => ({
	getOrders: userId => dispatch(getOrdersByUserServer(userId)),
	getProducts: () => dispatch(getProductsFromServer())
})

class AllUserOrders extends React.Component {
	componentDidMount() {
		const userId = this.props.user.id
		console.log('userId', userId)
		this.props.getOrders(userId)
		this.props.getProducts('')
	}
	getProductName = id => {
		const product = this.props.products.filter(singleProd => {
			return singleProd.id === id
		})
		console.log('product', product)
		return product[0].name
	}
	render() {
		if (this.props.userOrders.length && this.props.products.length) {
			return (
				<div>
					<h3>All Orders</h3>
					<ul>
						{this.props.userOrders.map(order => {
							console.log('order', order)
							return (
								<li key={order.id}>
									<div>
										<NavLink to={`/orders/${order.id}`}>
											Order Information
										</NavLink>
										<div>
											Price: $ {order.price}
											<div>
												<div>Order Status: {order.status}</div>
												<div>
													Date ordered:{' '}
													{order.timeOrdered}
												</div>
											</div>
										</div>
										{order.orderItems
											? order.orderItems.map(
													orderItem => {
														return (
															<div
																key={
																	orderItem.id
																}
															>
																<NavLink
																	to={`/products/${
																		orderItem.productId
																	}`}
																>
																	Product:{' '}
																	{this.getProductName(
																		orderItem.productId
																	)}
																</NavLink>
																<div>
																	Quantity:{' '}
																	{
																		orderItem.quantity
																	}
																</div>
															</div>
														)
													}
											  )
											: ''}
									</div>
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
