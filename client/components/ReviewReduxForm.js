import React from 'react'
import {Field, reduxForm} from 'redux-form'
import { Rating } from 'semantic-ui-react'

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

class ReviewForm extends React.Component {
  state = {
    rating: 0
  }

  handleRate = (evt, {rating}) => this.setState({rating})

  render () {
  return (
    <div className="ui form">

      <Rating icon="star" maxRating={5} onRate={this.handleRate} />

      <form
        onSubmit={
          this.props.valid
            ? evt => this.props.handleSubmit(evt, this.state.rating)
            : preventDefault
        }
      >
        <div>
          <div className="field">
            Title: <Field
              type="textarea"
              name="title"
              component={renderField} />
          </div>
          <div className="field">
            Content:{' '}
            <Field
              type="text"
              name="content"
              component={renderField}
              validate={notEmpty}
            />
          </div>
          <br />
          <div className="form-item">
            <button className="ui green basic small button" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
}

const ReviewFormRedux = reduxForm({
  forceUnregisterOnUnmount: true,
  form: 'reviews'
})(ReviewForm)

export default ReviewFormRedux
