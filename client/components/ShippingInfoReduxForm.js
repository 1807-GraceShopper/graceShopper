import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {NavLink} from 'react-router-dom'

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

//alpha numeric helper function using regex
// const isAlphaNumeric = value => {
//   return value.match(/^[a-z0-9]+$/i) !== null
// }

// const alphaNumeric = value => {
//   return isAlphaNumeric(value) ? undefined : 'Must be a phone number'
// }

let ShippingInfoForm = props => {
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
            First Name:{' '}
            <Field type="text" name="firstName" component={renderField} />
          </div>
          <div className="form-item">
            Last Name:{' '}
            <Field type="text" name="lastName" component={renderField} />
          </div>
          <div className="form-item">
            Street Address:{' '}
            <Field type="text" name="streetAddress" component={renderField} />
          </div>
          <div className="form-item">
            City: <Field type="text" name="city" component={renderField} />
          </div>
          <div className="form-item">
            Region: <Field type="text" name="region" component={renderField} />
          </div>
          <div className="form-item">
            Postal Code:{' '}
            <Field type="text" name="postalCode" component={renderField} />
          </div>
          <div className="form-item">
            Country:{' '}
            <Field type="text" name="country" component={renderField} />
          </div>
          <div className="form-item">
            Phone Number:{' '}
            <Field
              type="text"
              name="phoneNumber"
              component={renderField}
              // validate={alphaNumeric}
            />
          </div>
          <div className="form-item">
            Email: <Field type="email" name="email" component={renderField} />
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

const ShippingInfoFormRedux = reduxForm({
  forceUnregisterOnMount: true,
  form: 'shippingInfo',
  pure: false
})(ShippingInfoForm)

export default ShippingInfoFormRedux
