import React from 'react';

const SingleProduct = (props) => {
  return (
    <div>
      <h2>{props.product.name}</h2>
      <p>{props.product.description}</p>
      {props.product.price}
      {props.product.photoUrl}
      {/* <Review key={props.product.id} product={props.product} /> */}
    </div>
  )
}

export default SingleProduct;
