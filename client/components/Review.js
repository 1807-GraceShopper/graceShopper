import React from 'react'

export const Review = props => {
	const {review} = props
	return (
		<div>
			<h5>{review.title}</h5>
			<h5>Rating: {review.rating}</h5>
			<p>{review.content}</p>
		</div>
	)
}
