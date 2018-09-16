'use strict'

const chai = require('chai')
const expect = chai.expect

// Review Model

const db = require('../../../../server/db/models')
const Review = db.Review

describe('Review Model', () => {
  it('requires title', async () => {
    let str = 'test'
    const review = Review.build({
      rating: 1,
      content: str.repeat(25)
    })
    try {
      await review.validate()
      throw Error(
        'validation was successful but should have failed without `title`'
      )
    } catch (err) {
      expect(err.message).to.contain('title cannot be null')
    }
  })
  it('requires content', async () => {
    const review = Review.build({
      title: '',
      rating: 1
    })
    try {
      await review.validate()
      throw Error(
        'validation was successful but should have failed without `content`'
      )
    } catch (err) {
      expect(err.message).to.contain('content cannot be null')
    }
  })
  it('review text is within limit for content (100 to 2000 characters', async () => {
    let str = 'test'
    const review = Review.build({
      title: '',
      rating: 1,
      content: str.repeat(38)
    })
    try {
      await review.validate()
    } catch (err) {
      expect(err.message).to.contain(
        'data not within range of 100 to 2000 characters'
      )
    }
  })
  it('rating is within 1 to 5', async () => {
    let str = 'test'
    const review = Review.build({
      title: '',
      rating: 1,
      content: str.repeat(38)
    })
    await review.validate()
    expect(review.rating).to.equal(1)
  })
  it('rating ', async () => {
    let str = 'test'
    const review = Review.build({
      title: '',
      rating: -5,
      content: str.repeat(38)
    })
    try {
      await review.validate()
    } catch (err) {
      expect(err.message).to.contain(
        'Validation error: Validation min on rating failed'
      )
    }
  })
})
