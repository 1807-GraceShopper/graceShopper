import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderField = ({ input, type, meta: { error, touched } }) => (
	<div>
		<div>
			<div>
				<input {...input} type={type} />
			</div>
			<div>{touched && <span className="red">{error}</span>}</div>
		</div>
	</div>
);

const preventDefault = event => {
	event.preventDefault();
};

const notEmpty = value => (value ? undefined : 'Required field');

const minimumZero = price => (price && price < 0 ? `Must be at least 0` : undefined)

let ProductForm = props => {
	return (
		<div className="verticalForm">
			<form onSubmit={props.valid ? props.handleSubmit : preventDefault}>
				<div>
					<div className="form-item">
						Name:{' '}
						<Field
							type="text"
							name="name"
							component={renderField}
							validate={notEmpty}
						/>
					</div>
					<div className="form-item">
						Description:{' '}
						<Field
							component={renderField}
							type="text"
							name="description"
							validate={notEmpty}
						/>
					</div>
					<div className="form-item">
						Description:{' '}
						<Field
							component={renderField}
							type="text"
							name="description"
							validate={notEmpty}
						/>
					</div>
					<div className="form-item">
						Price:{' '}
						<Field
							component={renderField}
							type="text"
							name="price"
							validate={minimumZero}
						/>
					</div>
					<div className="form-item">
						Photo URL:{' '}
						<Field
							component={renderField}
							type="text"
							name="photoUrl"
						/>
					</div>
				</div>
				<div className="form-item">
					<button className="form-item" type="submit">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

const ProductFormRedux = reduxForm({
	form: 'product',
})(ProductForm);

export default ProductFormRedux;
