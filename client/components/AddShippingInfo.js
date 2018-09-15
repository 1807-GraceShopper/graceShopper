import React from 'react'
import {connect} from 'react-redux'
import {addShippingInfoToServer} from '../store/shippinginfo'
import ShippingInfoFormRedux from './ShippingInfoReduxForm'
import {withRouter} from 'react-router-dom'

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
    this.props.addShippingInfo(shippingInformation)
    this.props.history.push('/shippingInfo')
  }
  render() {
    return (
      <div className="verticalForm">
        <h3>Add a new category!</h3>
        <ShippingInfoFormRedux handleSubmit={this.add} form={'shippingInfo'} />
      </div>
    )
  }
}

const ConnectedShippingInfo = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewShippingInfo)
)

export default ConnectedShippingInfo
