import React from 'react'
import {Field, reduxForm} from 'redux-form'

const renderField = ({input, type, meta: {error, touched}}) => (
	<div>
		<div>
			<div>
				<input {...input} type={type} />
			</div>
			<div>{touched && <span className="red">{error}</span>}</div>
		</div>
	</div>
)

const preventDefault = event => {
	event.preventDefault()
}

const notEmpty = value => (value ? undefined : 'Required field')

const minimumZero = price =>
	price && price < 0 ? `Must be at least 0` : undefined

let ProductForm = props => {
	return (
		<div>
			<form onSubmit={props.valid ? props.handleSubmit : preventDefault} className="ui form">
			<br />
			<br />
			<div className="ui one column stackable center aligned page grid">
				<div className="field">
					 	Name:{' '}
					 		<Field
							type="text"
							name="name"
							component={renderField}
							validate={notEmpty}
						/>
				</div>
				<br />
				<div className="field">
					Description:{' '}
					<Field
						component={renderField}
						type="text"
						name="description"
						validate={notEmpty}
					/>
				</div>
				<br />
				<div className="field">
					Price:{' '}
					<Field
						component={renderField}
						type="text"
						name="price"
						validate={minimumZero}
					/>
				</div>
				<br />
				<div className="field">
					Quantity:{' '}
					<Field
						component={renderField}
						type="text"
						name="quantity"
						validate={minimumZero}
					/>
				</div>
				<br />
				<div className="field">
					Photo URL:{' '}
					<Field
						component={renderField}
						type="text"
						name="photoUrl"
					/>
				</div>
				<br />
				<br />
				</div>
				<div className="ui one column stackable center aligned page grid">
				<br />
					<button className="ui green basic small button" type="submit">
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}

const ProductFormRedux = reduxForm({
	form: 'product'
})(ProductForm)

export default ProductFormRedux
