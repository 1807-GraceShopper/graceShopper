import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {getOrdersFromServer, getOrdersByStatusServer} from '../store/orders'
import {getProductsFromServer} from '../store/product'

const mapStateToProps = state => ({
	user: state.user,
	orders: state.orders.orders,
	products: state.product.products
})

const mapDispatchToProps = dispatch => ({
	getOrders: () => dispatch(getOrdersFromServer()),
	getProducts: () => dispatch(getProductsFromServer()),
	getOrdersByStatus: status => dispatch(getOrdersByStatusServer(status))
})

class OrderAdmin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			changedStatus: false
		}
	}
	componentDidMount() {
		const status = this.state.selectedStatus
		this.props.getOrdersByStatus(status)
		this.props.getProducts()
	}
	handleSelect = event => {
		this.setState({selectedStatus: event.target.value})
		this.props.getOrdersByStatus(event.target.value)
		this.setState({changedStatus: true})
	}
	getProductName = id => {
		const product = this.props.products.filter(singleProd => {
			return singleProd.id === id
		})
		return product[0].name
	}
	render() {
		if (this.props.orders.length && this.props.products.length) {
			return (
				<div>
					<h3>All Orders</h3>
					<form>
						<label>
							Statuses:
							<select
								name="statuses"
								onChange={this.handleSelect}
							>
								<option value="">---</option>
								<option value="Created">Created</option>
								<option value="Processing">Processing</option>
								<option value="Cancelled">Cancelled</option>
								<option value="Completed">Completed</option>
							</select>
						</label>
					</form>
					<ul>
						{this.props.orders.map(order => {
							return (
								<li key={order.id}>
									<div>
										<NavLink to={`/orders/${order.id}`}>
											Order Information
										</NavLink>
										<div>
											Price: $ {order.price}
											<div>
												<div>
													Order Status: {order.status}
												</div>
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
		} else
			return (
				<div>
					<h3>All Orders</h3>
					<form>
						<label>
							Statuses:
							<select
								name="statuses"
								onChange={this.handleSelect}
							>
								<option value="">---</option>
								<option value="Created">Created</option>
								<option value="Processing">Processing</option>
								<option value="Cancelled">Cancelled</option>
								<option value="Completed">Completed</option>
							</select>
						</label>
					</form>
					<div>No orders exist for this category</div>
				</div>
			)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderAdmin)
