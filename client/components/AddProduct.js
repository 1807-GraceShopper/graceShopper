import React from 'react';
import { connect } from 'react-redux';
import { newProduct } from '../store/product';
import ProductFormRedux from './ProductFormRedux';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
	return {
		addProduct: product => dispatch(newProduct(product)),
	};
};

const mapStateToProps = state => {
	return {
		products: state.product.products,
	};
};

class NewProduct extends React.Component {
	add = evt => {
		const productId = this.props.match.params.id;
		evt.preventDefault();
		const productInfo = {
			id: productId,
			name: evt.target.elements.name.value,
			description: evt.target.elements.description.value,
			price: evt.target.elements.price.value,
			photoUrl: evt.target.elements.photoUrl.value
		};

		this.props.addProduct(productInfo);
		this.props.history.push('/products');
	};
	render() {
		return (
			<div className="verticalForm">
				<h3>Add a new product!</h3>
				<ProductFormRedux handleSubmit={this.add} />
			</div>
		);
	}
}

const ConnectedNewProduct = withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewProduct)
);

export default ConnectedNewProduct;
