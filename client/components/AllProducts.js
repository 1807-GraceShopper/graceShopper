import React from 'react'
import {connect} from 'react-redux'
import {
  getProductsByCategoryFromServer,
  deleteProductFromServer
} from '../store/product'
import {NavLink} from 'react-router-dom'
import {getCategoriesFromServer} from '../store/category'
import { addItemToCart } from '../store/cart';

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
  deleteProduct: id => dispatch(deleteProductFromServer(id)),
  addToCart: product => dispatch(addItemToCart(product))
})

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryId: '',
      products: ''
    }
    this.handleDelete = this.handleDelete.bind(this)
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
    const categoryId = this.state.categoryId
    await this.props.getProducts(categoryId)
    this.setState({products: this.props.products})
  }
  handleDelete(product) {
    this.props.deleteProduct(product.id)
  }
  render() {
    if (this.props.products.length) {
      return (
        <div>
          <h3>All Shoes</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
              Categories:
              <select name="categories" onChange={this.handleSelect}>
                <option value="">---</option>
                {this.props.categories.map(category => {
                  return (
                    <option key={category.id} value={category.id}>
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
                        <img src={`/${product.photoUrl}`} />
                      </div>
                      {this.props.user.isAdmin ? (
                        <button
                          type="button"
                          onClick={() => this.handleDelete(product)}
                        >
                          Delete
                        </button>
                      ) : (
                        ''
					  )}
					  { <button type="button" onClick={() => this.props.addToCart(product)}>Add to Cart</button> }
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          {this.props.user.isAdmin ? (
            <NavLink to="/products/addProduct">
              <button type="button">Add a new product</button>
            </NavLink>
          ) : (
            ''
          )}
          {this.props.user.isAdmin ? (
            <NavLink to="/addCategory">
              <button type="button">Add a new category</button>
            </NavLink>
          ) : (
            ''
          )}
          {this.props.user.isAdmin ? (
            <NavLink to="/categories">
              <button type="button">Edit Categories</button>
            </NavLink>
          ) : (
            ''
          )}
        </div>
      )
    } else
      return (
        <h3>
          Sorry, there are no products currently available in this category
        </h3>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)