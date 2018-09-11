import React, {Component} from 'react'
import {getSingleProduct} from '../store/product'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

const mapStateToProps = state => {
  return {
    singleProduct: state.product.singleProduct,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  getProduct: id => dispatch(getSingleProduct(id))
})

export class SingleProduct extends Component {
  componentDidMount() {
    if (this.props.getProduct)
      this.props.getProduct(Number(this.props.match.params.id))
  }

  render() {
    const product = this.props.singleProduct

    if (product) {
      return (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div>${product.price}</div>
          <div>
            <img src={`/${product.photoUrl}`} />
          </div>
          {/* <Review key={product.id} product={product} /> */}
          { this.props.user.isAdmin ?
            <NavLink to={`/products/editProduct/${product.id}`}><button type="button">Edit product</button></NavLink>
            : ''
          }
        </div>
      )
    } else {
      return null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
