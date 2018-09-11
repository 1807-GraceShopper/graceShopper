import React from 'react'
import {connect} from 'react-redux'
import {getProductsFromServer} from '../store/product'
import {NavLink} from 'react-router-dom'

const mapStateToProps = state => {
	return {
		products: state.product.products
	}
}

const mapDispatchToProps = dispatch => ({
	getProducts: () => dispatch(getProductsFromServer())
})

export class AllProducts extends React.Component {
	componentDidMount() {
		this.props.getProducts()
	}
	render() {
		if (this.props.products.length) {
			return (
				<div>
					<h3>All Shoes</h3>
					<ul>
						{this.props.products.map(product => {
							return (
								<li key={product.id}>
									<div>
										<NavLink to={`/products/${product.id}`}>
											{product.name}
										</NavLink>
										<div>
											<p>{product.description}</p>
										</div>
										<div>
											{product.price}
											<div>
												<img src={product.imageUrl} />
											</div>
										</div>
									</div>
								</li>
							)
						})}
					</ul>
				</div>
			)
		} else {
			return null
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
