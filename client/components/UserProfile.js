import React from 'react'
import ShippingReduxForm from './ShippingInfoReduxForm'
import {connect} from 'react-redux'
import {getShippingInfoByUserServer} from '../store/shippingInfo'

const mapStateToProps = state => ({
  userShippingInfo: state.shippingInfo,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getShippingInfo: userId => dispatch(getShippingInfoByUserServer(userId))
})

class UserProfile extends React.Component {
  componentDidMount() {
    const userId = this.props.user.id
    this.props.getShippingInfo(userId)
  }
  render() {
    if (this.props.user.id) {
      return (
        <div>
          <h3 className="listHeader center">Update Shipping Info</h3>
          {this.props.userShippingInfo.map(singleShippingInfo => {
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
    } else return null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
