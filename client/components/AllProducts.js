import React from 'react'
import {connect} from 'react-redux'
import {getProductsByCategoryFromServer} from '../store/product'
import {NavLink} from 'react-router-dom'
import {getCategoriesFromServer} from '../store/category'

const mapStateToProps = state => {
	return {
		products: state.product.products,
		categories: state.category
	}
}

const mapDispatchToProps = dispatch => ({
	getProducts: categoryId =>
		dispatch(getProductsByCategoryFromServer(categoryId)),
	getCategories: () => dispatch(getCategoriesFromServer())
})

export class AllProducts extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			categoryId: '',
			products: ''
		}
	}
	async componentDidMount() {
		if (this.props.getProducts) {
			await this.props.getProducts('')
			this.props.getCategories()
			const products = this.props.products
			this.setState({products: products})
		}
	}
	handleSelect = event => {
		this.setState({categoryId: event.target.value})
	}
	handleSubmit = async event => {
		event.preventDefault()
		console.log('handleSubmit', this.state.categoryId)
		const categoryId = this.state.categoryId
		await this.props.getProducts(categoryId)
		this.setState({products: this.props.products})
	}
	render() {
		if (this.state.products.length) {
			return (
				<div>
					<h3>All Shoes</h3>
					<form onSubmit={this.handleSubmit}>
						<label>
							Categories:
							<select
								name="categories"
								onChange={this.handleSelect}
							>
								<option value="">---</option>
								{this.props.categories.map(category => {
									return (
										<option
											key={category.id}
											value={category.id}
										>
											{category.name}
										</option>
									)
								})}
							</select>
							<button type="submit" className="delete">
								Select
							</button>
						</label>
					</form>
					<ul>
						{this.state.products.map(product => {
							return (
								<li key={product.id}>
									<div>
										<NavLink
											to={`/products/${product.id}`}
											product={product}
										>
											{product.name}
										</NavLink>
										<div>
											<p>{product.description}</p>
										</div>
										<div>
											{product.price}
											<div>
												<img src={product.photoUrl} />
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
