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
console.log(AllProductsList)

const mapStateToProps = state => {
	return {
		products: state.product.products,
		categories: state.category,
		user: state.user
	}
}

const mapDispatchToProps = dispatch => ({
	getProducts: categoryId =>
		dispatch(getProductsByCategoryFromServer(categoryId)),
	getCategories: () => dispatch(getCategoriesFromServer()),
	searchProduct: product => dispatch(searchProduct(product)),
	deleteProduct: id => dispatch(deleteProductFromServer(id))
})

export class AllProducts extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			categoryId: '',
			products: '',
			perPage: 5,
			currentPage: [],
			pageCount: 1,
			isSearch: false
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
			const pageCount = Math.ceil(
				this.props.products.length / this.state.perPage
			)
			this.setState({
				products: products,
				currentPage: firstPage,
				pageCount: pageCount
			})
		}
	}
	handleSelect = event => {
		this.setState({categoryId: event.target.value})
	}
	handleSubmit = async event => {
		event.preventDefault()
		const categoryId = this.state.categoryId
		await this.props.getProducts(categoryId)
		this.setState({products: this.props.products})
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
	handleSelectPagination = data => {
		const selectedPage = data.selected
		const startIndex = selectedPage * this.state.perPage
		const endIndex = (selectedPage + 1) * this.state.perPage
		const pageProducts = this.state.products.slice(startIndex, endIndex)
		this.setState({currentPage: pageProducts})
	}
	async handleDelete(product) {
		await this.props.deleteProduct(product.id)
		console.log('props products', this.props.products)
		const products = this.props.products
		const perPage = this.state.perPage
		const firstPage = this.props.products.slice(0, perPage)
		const pageCount = Math.ceil(
			this.props.products.length / this.state.perPage
		)
		this.setState({
			products: products,
			currentPage: firstPage,
			pageCount: pageCount
		})
	}
	render() {
		if (this.props.products.length && this.state.currentPage.length) {
			const products = this.props.products
			const currentPage = this.state.currentPage
			const isSearch = this.state.isSearch
			const productType = isSearch ? products : currentPage
			const data = [...this.props.products]

			return (
				<div>
					<h3>All Shoes</h3>
					{this.props.products.length === 1 ? (
						<button type="button" onClick={this.returnButton}>
							Back to all products
						</button>
					) : (
						<div>
							<Search
								data={data}
								placeholder="Search for a product..."
								searchKey="name"
								width={300}
								height={40}
								onChange={this.handleChange}
							/>

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
						</div>
					)}
					<AllProductsList
						handleDelete={this.handleDelete}
						products={productType}
						user={this.props.user}
						isSearch={this.state.isSearch}
					/>
					<ReactPaginate
						previousLabel="previous"
						nextLabel="next"
						breakLabel={<a href="">...</a>}
						pageCount={this.state.pageCount}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						onPageChange={this.handleSelectPagination}
					/>
					{this.props.user.isAdmin ? (
						<NavLink to="/products/addProduct">
							<button type="button">Add a new product</button>
						</NavLink>
					) : (
						''
					)}
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
