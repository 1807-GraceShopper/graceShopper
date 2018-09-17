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
console.log('checkout', Checkout)

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

  submitReview = event => {
    event.preventDefault()
    const productId = Number(this.props.match.params.id)
    const reviewInfo = {
      title: event.target.elements.title.value,
      rating: event.target.elements.rating.value,
      content: event.target.elements.content.value,
      productId: productId
    }
    this.props.addReview(reviewInfo)
    this.props.reset('reviews')
  }

  render() {
    const product = this.props.singleProduct
    console.log('user', this.props.user)

    if (product && this.props.reviews) {
      return (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div>${product.price}</div>
          <div>
            <img src={`/${product.photoUrl}`} />
          </div>
          <div>
            <h4>Reviews</h4>
            {this.props.reviews.map(review => {
              return <Review key={review.id} review={review} />
            })}
          </div>
          { this.props.user.id ? (
            <div>
              <p>Add your review:</p>
            <ReviewFormRedux handleSubmit={this.submitReview} />
            </div>
          ) : ( '' )}
          {this.props.user.isAdmin ? (
            <NavLink to={`/products/editProduct/${product.id}`}>
              <button type="button">Edit product</button>
            </NavLink>
          ) : (
            ''
          )}
          <button type="button" onClick={() => this.props.addToCart(product)}>
            Add to Cart
          </button>
        </div>
      )
    } else {
      return null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
