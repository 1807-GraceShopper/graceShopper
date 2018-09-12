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

let CategoryForm = props => {
  console.log('category form props:', props)
  return (
    <div className="verticalForm">
      <form
        onSubmit={
          props.valid
            ? evt => props.handleSubmit(evt, props.form)
            : preventDefault
        }
      >
        <div>
          <div className="form-item">
            Name:{' '}
            <Field
              type="text"
              name="name"
              id={props.key}
              component={renderField}
              validate={notEmpty}
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
  )
}

const CategoryFormRedux = reduxForm({
  forceUnregisterOnUnmount: true
})(CategoryForm)

export default CategoryFormRedux
