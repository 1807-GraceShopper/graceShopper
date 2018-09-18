import React from 'react'
import {NavLink} from 'react-router-dom'

const AllProductsList = props => {
	return (
		<div className="ui two column centered grid">
			{props.products.map(product => {
				return (
					<div className="ui two column" key={product.id}>
							<div className="ui link list">
							<NavLink to={`/products/${product.id}`} className="item">
								<h4>{product.name}</h4>
							</NavLink>
							</div>
							<div>
								<p>{product.description}</p>
							</div>
							<div>
								${product.price}
								<div>
									<img src={`/${product.photoUrl}`} />
								</div>
							</div>
						{props.user.isAdmin ? (
							<button
								type="button"
								className="ui negative tiny basic button"
								onClick={() => props.handleDelete(product)}
							>
								Delete
							</button>
						) : (
							''
						)}
						{
							<button
								type="button"
								className="ui positive tiny basic button"
								onClick={() => props.addToCart(product)}
							>
								Add to Cart
							</button>
						}
					</div>
				)
			})}
		</div>
	)
}

export default AllProductsList
