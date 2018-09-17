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
const rating = value =>
  value <= 5 && value >= 1 ? undefined : 'Must enter a rating between 1 and 5'

let ReviewForm = props => {

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
            Title: <Field type="text" name="title" component={renderField} />
          </div>
          <div className="form-item">
            Rating:{' '}
            <Field
              type="text"
              name="rating"
              component={renderField}
              validate={rating}
            />
          </div>
          <div className="form-item">
            Content:{' '}
            <Field
              type="text"
              name="content"
              component={renderField}
              validate={notEmpty}
            />
          </div>
          <div className="form-item">
            <button className="form-item" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const ReviewFormRedux = reduxForm({
  forceUnregisterOnUnmount: true,
  form: 'reviews'
})(ReviewForm)

export default ReviewFormRedux
