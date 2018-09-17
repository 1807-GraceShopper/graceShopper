import React from 'react'
import {connect} from 'react-redux'
import {newProduct} from '../store/product'
import ProductFormRedux from './ProductFormRedux'
import {withRouter} from 'react-router-dom'

const mapDispatchToProps = dispatch => {
	return {
		addProduct: product => dispatch(newProduct(product))
	}
}

const mapStateToProps = state => {
	return {
		products: state.product.products,
		user: state.user
	}
}

class NewProduct extends React.Component {
	add = async evt => {
    //const productId = this.props.match.params.id
		evt.preventDefault()
		const productInfo = {
      //id: productId,
			name: evt.target.elements.name.value,
			description: evt.target.elements.description.value,
			price: evt.target.elements.price.value,
			quantity: evt.target.elements.quantity.value,
			photoUrl: evt.target.elements.photoUrl.value
		}

		const {product, type} = await this.props.addProduct(productInfo)
    this.props.history.push(`/products/${product.id}`)
	}
	render() {
		if (this.props.user.isAdmin) {
			return (
				<div className="verticalForm">
					<h3>Add a new product!</h3>
					<ProductFormRedux handleSubmit={this.add} />
				</div>
			)
		} else {
			return <h1>Sorry, you are not authorized to view this page</h1>
		}
	}
}

const ConnectedNewProduct = withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewProduct)
)

export default ConnectedNewProduct
