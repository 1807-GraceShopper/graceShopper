import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {updateOrderToServer} from '../store/orders'

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

const isStatus = value =>
  value === 'Completed' ||
  value === 'Cancelled' ||
  value === 'Created' ||
  value === 'Processing'
    ? undefined
    : 'Please pick a valid status'

mapDispatchToProps = dispatch =({
  updateOrder = update => dispatch(updateOrderToServer(update))
})

class OrderStatusForm extends React.Component {
  handleSubmit = (evt) => {
    this.props.updateOrder({status: evt.target.value})
  }
  render() {
    return (
      <div className="verticalForm">
        <form
          onSubmit={
            this.props.valid ? evt => this.props.handleSubmit(evt) : preventDefault
          }
        >
          <div>
            <div className="form-item">
              Name:{' '}
              <Field
                type="text"
                name="status"
                component={renderField}
                validate={isStatus}
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
}

const OrderStatusFormRedux = reduxForm({
  form: 'orderStatus',
  forceUnregisterOnUnmount: true
})(OrderStatusForm)

export default OrderStatusFormRedux
