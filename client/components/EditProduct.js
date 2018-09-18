import React from 'react';
import ProductFormRedux from './ProductFormRedux';

import {
	getSingleProduct,
	updateProductToServer,
} from '../store/product';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
	return {
		getProduct: id => dispatch(getSingleProduct(id)),
		updateProduct: productInfo => dispatch(updateProductToServer(productInfo)),
	};
};

const mapStateToProps = state => {
	return {
		product: state.product.singleProduct,
		user: state.user
	};
};

class UpdateProduct extends React.Component {
	componentDidMount() {
		const productId = this.props.match.params.id;
		this.props.getProduct(productId);
	}
	update = evt => {
		const productId = this.props.match.params.id;
		evt.preventDefault();
		const productInfo = {
			id: productId,
			name: evt.target.elements.name.value,
			description: evt.target.elements.description.value,
			price: evt.target.elements.price.value,
			quantity: evt.target.elements.quantity.value,
			photoUrl: evt.target.elements.photoUrl.value
		};
		this.props.updateProduct(productInfo);
		this.props.history.push('/products');
	};

	render() {
		if (
			this.props.product.id === parseInt(this.props.match.params.id) && this.props.user.isAdmin
		) {
			return (
				<div>
					<br />
					<h2 className="ui one column stackable center aligned page grid">Update product</h2>
					<ProductFormRedux
						initialValues={this.props.product}
						handleSubmit={this.update}
					/>
				</div>
			);
		} else {
			return (
				<h1>Sorry, you are not authorized to view this page</h1>
			);
		}
	}
}

const ConnectedUpdateProduct = withRouter(
	connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)
);
export default ConnectedUpdateProduct;
