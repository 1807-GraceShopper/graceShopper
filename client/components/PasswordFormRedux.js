import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {updatePasswordOnServer} from '../store/users'
import {connect} from 'react-redux'

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

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  updatePassword: (user, password) => {
    dispatch(updatePasswordOnServer(user, password))
  }
})

class PasswordForm extends React.Component {
  handleSubmit = async event => {
    event.preventDefault()
    await this.props.updatePassword(
      this.props.user,
      event.target.elements.password.value
    )
    this.props.history.push('/products')
  }

  render() {
    return (
      <div className="verticalForm">
        <form
          onSubmit={
            this.props.valid ? evt => this.handleSubmit(evt) : preventDefault
          }
          className="ui form"
        >
          <div className="ui one column stackable center aligned page grid">
            <div className="form-item">
              New password:{' '}
              <Field
                type="text"
                name="password"
                component={renderField}
                validate={notEmpty}
              />
            </div>
          </div>
          <div className="ui one column stackable center aligned page grid">
            <button className="ui green basic mini button" type="submit">
              Reset password
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const PasswordFormRedux = reduxForm({
  form: 'password'
})(PasswordForm)

export default connect(mapStateToProps, mapDispatchToProps)(PasswordFormRedux)
