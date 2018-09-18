import React from 'react'
import {Field, reduxForm} from 'redux-form'

const renderField = ({input, type, meta: {error, touched}}) => (
  <div>
      <div className="ui one column stackable center aligned page grid">
        Name: <input {...input} type={type} />
      </div>
      <div>{touched && <span className="red">{error}</span>}</div>
      </div>
)

const preventDefault = event => {
  event.preventDefault()
}

const notEmpty = value => (value ? undefined : 'Required field')

let CategoryForm = props => {
  return (
    <div className="verticalForm">
      <form
        onSubmit={
          props.valid
            ? evt => props.handleSubmit(evt, props.form)
            : preventDefault
        }
        className="ui form"
      >
        <div className="ui one column stackable center aligned page grid">
            <Field
              type="text"
              name="name"
              id={props.key}
              component={renderField}
              validate={notEmpty}
            />
        </div>
        <div className="ui one column stackable center aligned page grid">
          <button className="ui green basic mini button" type="submit">
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
