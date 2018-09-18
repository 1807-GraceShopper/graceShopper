import React from 'react'
import ShippingReduxForm from './ShippingInfoReduxForm'

import {
  updateShippingInfoInServer,
  getShippingInfoFromServer
} from '../store/shippinginfo'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const mapDispatchToProps = dispatch => {
  return {
    getShippingInfo: () => dispatch(getShippingInfoFromServer()),
    updateShippingInfo: shippingInfo =>
      dispatch(updateShippingInfoInServer(shippingInfo))
  }
}

const mapStateToProps = state => {
  return {
    shippingInfo: state.shippingInfo,
    user: state.user
  }
}

class UpdateShippingInfo extends React.Component {
  componentDidMount() {
    this.props.getShippingInfo()
  }
  update = (event, key) => {
    const shippingInfoId = key
    event.preventDefault()
    const shippingInfo = {
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
    this.props.updateShippingInfo(shippingInfo)
    this.props.history.push('/shippingInfo')
  }
  render() {
    if (this.props.user.isAdmin) {
      return (
        <div>
          <h2 className="ui one column stackable center aligned page grid">Update Shipping Info</h2>
          {this.props.shippingInfo.map(singleShippingInfo => {
            return (
              <div key={singleShippingInfo.id}>
                <ShippingReduxForm
                  key={singleShippingInfo.id}
                  form={singleShippingInfo.id.toString()}
                  initialValues={singleShippingInfo}
                  handleSubmit={this.update}
                  establishReinitialize={true}
                />

                <button
                  type="button"
                  onClick={() => this.handleDelete(singleShippingInfo.id)}
                >
                  X
                </button>
              </div>
            )
          })}
        </div>
      )
    } else {
      return <h1>Sorry, you are not authorized to view this page</h1>
    }
  }
}

const ConnectedUpdateShippingInfo = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateShippingInfo)
)

export default ConnectedUpdateShippingInfo
