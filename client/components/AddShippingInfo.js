import React from 'react'
import {connect} from 'react-redux'
import {addShippingInfoToServer} from '../store/shippinginfo'
import ShippingInfoFormRedux from './ShippingInfoReduxForm'
import {withRouter, NavLink} from 'react-router-dom'

const mapDispatchToProps = dispatch => {
  return {
    addShippingInfo: shippingInfo =>
      dispatch(addShippingInfoToServer(shippingInfo))
  }
}

const mapStateToProps = state => {
  return {
    shippingInfo: state.shippingInfo
  }
}

class NewShippingInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shippingInfo: {}
    }
  }
  add = event => {
    const shippingInfoId = this.props.match.params.shippingInfoId
    event.preventDefault()
    const shippingInformation = {
      id: shippingInfoId,
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      streetAddress: event.target.elements.streetAddress.value,
      city: event.target.elements.city.value,
      region: event.target.elements.region.value,
      postalCode: event.target.elements.postalCode.value,
      country: event.target.elements.country.value,
      phoneNumber: event.target.elements.phoneNumber.value,
      email: event.target.elements.email.value
    }
    this.setState({shippingInfo: shippingInformation})
    this.props.addShippingInfo(shippingInformation)
    this.props.history.push('/shippingInfo')
  }
  render() {
    return (
      <div className="verticalForm">
        <h3>Shipping Information</h3>
        <div>
          <ShippingInfoFormRedux handleSubmit={this.add} form="shippingInfo" />
        </div>
        <div>
          <NavLink to="/checkout">
            <button type="button">Enter a payment method</button>
          </NavLink>
        </div>
      </div>
    )
  }
}

const ConnectedShippingInfo = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewShippingInfo)
)

export default ConnectedShippingInfo
