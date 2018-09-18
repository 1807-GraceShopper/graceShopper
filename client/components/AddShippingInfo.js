import React from 'react'
import {connect} from 'react-redux'
import {addShippingInfoToServer} from '../store/shippinginfo'
import ShippingInfoFormRedux from './ShippingInfoReduxForm'
import {withRouter} from 'react-router-dom'
import {NavLink} from 'react-router-dom'

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
      submitted: false
    }
  }
  add = async event => {
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
    await this.props.addShippingInfo(shippingInformation)
    this.setState({submitted: true})
  }
  render() {
    if (!this.state.submitted) {
      return (
        <div className="verticalForm">
        <br />
        <br />
          <h2 className="ui one column stackable center aligned page grid">Shipping Information</h2>
          <div>
            <ShippingInfoFormRedux
              handleSubmit={this.add}
              form="shippingInfo"
            />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <br />
          <h2 className="ui one column stackable center aligned page grid">Form submitted!</h2>
          <br />
          <br />
          <br />
          <NavLink to="/checkout" className="ui one column stackable center aligned page grid">
            <button className="ui violet basic button" type="button">Proceed to Payment</button>
          </NavLink>
        </div>
      )
    }
  }
}

const ConnectedShippingInfo = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewShippingInfo)
)

export default ConnectedShippingInfo
