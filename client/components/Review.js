import React from 'react'
import { Rating } from 'semantic-ui-react'

export const Review = props => {
	const {review} = props
	return (
		<div>
			<h5>{review.title}</h5>
			<Rating icon="star" rating={review.rating} maxRating={5}/>
			<p>{review.content}</p>
			<br />
		</div>
	)
}
