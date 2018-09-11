'use strict'

const chai = require('chai')
const expect = chai.expect

// Product Model

const db = require('../server/db/models')
const Review = db.Review

describe('Product Model', () => {
  it('requires title', async () => {
    const review = Review.build()
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
    const review = Review.build()
    try {
      await review.validate()
      throw Error(
        'validation was successful but should have failed without `content`'
      )
    } catch (err) {
      expect(err.message).to.contain('content cannot be null')
    }
  })
})
