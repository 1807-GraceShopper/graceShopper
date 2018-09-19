import React from 'react'
import {connect} from 'react-redux'
import {
	getProductsByCategoryFromServer,
	deleteProductFromServer,
	searchProduct
} from '../store/product'
import {NavLink} from 'react-router-dom'
import {getCategoriesFromServer} from '../store/category'
import Search from 'react-search-box'
import ReactPaginate from 'react-paginate'
import AllProductsList from './AllProductsList'
import {addItemToCart} from '../store/cart'
import {Pagination} from 'semantic-ui-react'

const mapStateToProps = state => {
	return {
		products: state.product.products,
		categories: state.category,
		user: state.user,
		cart: state.cart
	}
}

const mapDispatchToProps = dispatch => ({
	getProducts: categoryId =>
		dispatch(getProductsByCategoryFromServer(categoryId)),
	getCategories: () => dispatch(getCategoriesFromServer()),
	searchProduct: product => dispatch(searchProduct(product)),
	deleteProduct: id => dispatch(deleteProductFromServer(id)),
	addToCart: product => dispatch(addItemToCart(product))
})

export class AllProducts extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			categoryId: '',
			products: '',
			perPage: 6,
			currentPage: [],
			isSearch: false,
			numPages: 0
		}
		this.handleDelete = this.handleDelete.bind(this)
	}
	async componentDidMount() {
		if (this.props.getProducts) {
			await this.props.getProducts('')
			this.props.getCategories()
			const products = this.props.products
			const perPage = this.state.perPage
			const firstPage = this.props.products.slice(0, perPage)
			const numPages = Math.ceil(this.props.products.length / perPage)
			this.setState({
				products: products,
				currentPage: firstPage,
				numPages: numPages
			})
		}
	}
	handleSelect = event => {
		this.setState({categoryId: event.target.value})
		const products = this.props.products
		const perPage = this.state.perPage
		const firstPage = this.props.products.slice(0, perPage)
		this.setState({
			products: products,
			currentPage: firstPage
		})
	}
	handleSubmit = async event => {
		event.preventDefault()
		const categoryId = this.state.categoryId
		await this.props.getProducts(categoryId)
		const perPage = this.state.perPage
		const products = this.props.products
		const firstPage = this.props.products.slice(0, perPage)
		this.setState({
			products: products,
			currentPage: firstPage
		})
	}
	handleChange = product => {
		this.props.searchProduct([product])
		this.setState({isSearch: true})
	}
	returnButton = async () => {
		this.setState({isSearch: false})
		await this.props.getProducts('')
		const products = this.props.products
		this.setState({products: products})
	}
	handleSelectPagination = (evt, {activePage}) => {
		const startIndex = (activePage - 1) * this.state.perPage
		const endIndex = startIndex + this.state.perPage
		const pageProducts = this.state.products.slice(startIndex, endIndex)
		this.setState({currentPage: pageProducts})
	}
	async handleDelete(product) {
		await this.props.deleteProduct(product.id)
		const products = this.props.products
		const perPage = this.state.perPage
		const firstPage = this.props.products.slice(0, perPage)
		this.setState({
			products: products,
			currentPage: firstPage
		})
	}
	render() {
		if (
			this.props.products.length &&
			this.state.currentPage.length &&
			this.state.numPages
		) {
			const products = this.props.products
			const currentPage = this.state.currentPage
			const isSearch = this.state.isSearch
			const productType = isSearch ? products : currentPage
			const data = [...this.props.products]

			return (
				<div>
					<div className="ui one column stackable center aligned page grid">
						<div className="column twelve wide">
							<h2>All Shoes</h2>
						</div>
					<br />
					<br />
					</div>
					{this.props.user.isAdmin ? (
						<div className="ui three column stackable center aligned page grid">
							<div className="ui column">
								<NavLink to="/product/addProduct">
									<button
										className="ui violet basic button"
										type="button"
									>
										Add a new product
									</button>
								</NavLink>
							</div>
							<div className="ui column">
								<NavLink to="/addCategory">
									<button
										className="ui violet basic button"
										type="button"
									>
										Add a new category
									</button>
								</NavLink>
							</div>
							<div className="ui column">
								<NavLink to="/categories">
									<button
										className="ui violet basic button"
										type="button"
									>
										Edit Categories
									</button>
								</NavLink>
							<br />
							<br />
							</div>
						</div>
					) : (
						''
					)}
					{this.props.products.length === 1 ? (
						<div className="ui one column stackable center aligned page grid">
							<div className="column twelve wide">
								<button
									type="button"
									className="ui violet basic button"
									onClick={this.returnButton}
								>
									Back to all products
								</button>
							</div>
						</div>
					) : (
						<div>
						<div>
							<br />
							<p className="ui one column stackable center aligned page grid">Search for a product...</p>
							<br />
						<div className="ui one column stackable center aligned page grid">
							<Search
								data={data}
								searchKey="name"
								width={300}
								height={40}
								onChange={this.handleChange}
							/>
						</div>
						<br />
						<br />
						</div>
							<div className="ui one column stackable center aligned page grid">
								<form onSubmit={this.handleSubmit}>
									<label>
										Categories:
										<select
											name="categories"
											onChange={this.handleSelect}
										>
											<option value="">---</option>
											{this.props.categories.map(
												category => {
													return (
														<option
															key={category.id}
															value={category.id}
														>
															{category.name}
														</option>
													)
												}
											)}
										</select>
										<button
											type="submit"
											className="ui mini violet basic button"
										>
											Select
										</button>
									</label>
								</form>
							</div>
							<br />
							<br />
							<br />
						</div>
					)}
					<div className="ui grid">
					<AllProductsList
						handleDelete={this.handleDelete}
						products={productType}
						user={this.props.user}
						isSearch={this.state.isSearch}
						addToCart={this.props.addToCart}
					/>
					</div>
					<div className="ui one column stackable center aligned page grid">
						<br />
						<Pagination
							boundaryRange={1}
							siblingRange={1}
							onPageChange={this.handleSelectPagination}
							size="mini"
							totalPages={this.state.numPages}
						/>
						<h3 />
					</div>
					<h3 />
				</div>
			)
		} else
			return (
				<h3>
					Sorry, there are no products currently available in this
					category
				</h3>
			)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
