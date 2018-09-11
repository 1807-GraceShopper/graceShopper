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
	};
};

class UpdateProduct extends React.Component {
	componentDidMount() {
		const productId = this.props.match.params.productId;
		this.props.getProduct(productId);
	}
	update = evt => {
		const productId = this.props.match.params.productId;
		evt.preventDefault();
		const productInfo = {
			id: productId,
			name: evt.target.elements.name.value,
			description: evt.target.elements.description.value,
			price: evt.target.elements.price.value,
			photoUrl: evt.target.elements.price.value
		};

		this.props.updateProduct(productInfo);
		this.props.history.push('/products');
	};

	render() {
		if (
			this.props.product.id === parseInt(this.props.match.params.productId)
		) {
			return (
				<div>
					<h3 className="listHeader center">Update product</h3>
					<ProductFormRedux
						initialValues={this.props.product}
						handleSubmit={this.update}
					/>
				</div>
			);
		} else {
			return null;
		}
	}
}

const ConnectedUpdateProduct = withRouter(
	connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)
);
export default ConnectedUpdateProduct;
