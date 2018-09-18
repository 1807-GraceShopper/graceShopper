import React, {Component} from 'react'
import {getSingleProduct} from '../store/product'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {addItemToCart} from '../store/cart'
import {getReviewsFromServer, addReviewToServer} from '../store/reviews'
import {Review} from './Review'
import ReviewFormRedux from './ReviewReduxForm'
import {reset} from 'redux-form'
import Checkout from './stripe'
import {Button} from 'semantic-ui-react'

const mapStateToProps = state => {
  return {
    singleProduct: state.product.singleProduct,
    user: state.user,
    cart: state.cart,
    reviews: state.reviews
  }
}

const mapDispatchToProps = dispatch => ({
  getProduct: id => dispatch(getSingleProduct(id)),
  addToCart: product => dispatch(addItemToCart(product)),
  getReviews: productId => dispatch(getReviewsFromServer(productId)),
  addReview: reviewInfo => dispatch(addReviewToServer(reviewInfo)),
  reset: form => dispatch(reset(form))
})

export class SingleProduct extends Component {
  componentDidMount() {
    if (this.props.getProduct) {
      const productId = Number(this.props.match.params.id)
      this.props.getProduct(productId)
      this.props.getReviews(productId)
    }
  }

  submitReview = (event, rating) => {
    event.preventDefault()
    const productId = Number(this.props.match.params.id)
    const reviewInfo = {
      title: event.target.elements.title.value,
      rating: rating,
      content: event.target.elements.content.value,
      productId: productId
    }
    this.props.addReview(reviewInfo)
    this.props.reset('reviews')
  }

  render() {
    const product = this.props.singleProduct
    let basic = true;

    if (product && this.props.reviews) {
      return (
        <div className="ui one column stackable center aligned page grid">
        <div className="column twelve wide">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div>${product.price}</div>
          <div>
            <img className="sizing" src={`/${product.photoUrl}`} />
          </div>
          <div>
            <br />
            {this.props.user.isAdmin ? (
              <NavLink to={`/product/editProduct/${product.id}`}>
                <button className="ui violet basic button" type="button">Edit product</button>
              </NavLink>
            ) : (
              ''
            )}
            {product.inStock ? <Button
              toggle basic={basic}
              onClick={() => {this.props.addToCart(product)
              basic=!basic}}
            >
              Add to Cart
            </Button> : <p>This product is currently not available.</p>}
            <h4 />
            <h3>Reviews</h3>
            {this.props.reviews.length ? (
              <div>
              {this.props.reviews.map(review => {
                return <Review key={review.id} review={review} />
              })}
              </div>
            ) : ( <p>No reviews for this product yet</p> )}
          </div>
          <br />
          <br />
          { this.props.user.id ? (
            <div>
              <h4>Add your review:</h4>
            <ReviewFormRedux handleSubmit={this.submitReview} />
            </div>
          ) : ( '' )}
        </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
