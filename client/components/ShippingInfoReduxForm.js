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
    <div>
      <form
        onSubmit={
          props.valid
            ? evt => props.handleSubmit(evt, props.form)
            : preventDefault
        }
        className="ui form"
      >
      <br />
        <div className="ui one column stackable center aligned page grid">
          <div className="field">
            Title: <Field type="text" name="title" component={renderField} />
          </div>
        </div>
        <div className="ui one column stackable center aligned page grid">
          <br />
          <div className="field">
            First Name:{' '}
            <Field type="text" name="firstName" component={renderField} />
          </div>
          <div className="field">
            Last Name:{' '}
            <Field type="text" name="lastName" component={renderField} />
          </div>
          <br />
          <div className="field">
            Street Address:{' '}
            <Field type="text" name="streetAddress" component={renderField} />
          </div>
          <br />
          <div className="field">
            City: <Field type="text" name="city" component={renderField} />
          </div>
          <br />
          <div className="field">
            Region: <Field type="text" name="region" component={renderField} />
          </div>
          <br />
          <div className="field">
            Postal Code:{' '}
            <Field type="text" name="postalCode" component={renderField} />
          </div>
          <br />
          <div className="field">
            Country:{' '}
            <Field type="text" name="country" component={renderField} />
          </div>
          <br />
          <div className="field">
            Phone Number:{' '}
            <Field
              type="text"
              name="phoneNumber"
              component={renderField}
              // validate={alphaNumeric}
            />
          </div>
          <br />
          <div className="field">
            Email: <Field type="email" name="email" component={renderField} />
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

const ShippingInfoFormRedux = reduxForm({
  forceUnregisterOnMount: true,
  form: 'shippingInfo',
  pure: false
})(ShippingInfoForm)

export default ShippingInfoFormRedux
