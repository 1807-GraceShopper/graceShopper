'use strict'

const chai = require('chai')
const expect = chai.expect

// Category Model

const db = require('../../../../server/db/models')
const Category = db.Category

describe('Category Model', () => {
  it('requires name', async () => {
    const category = Category.build()
    try {
      await category.validate()
      throw Error(
        'validation was successful but should have failed without `name`'
      )
    } catch (err) {
      expect(err.message).to.contain('name cannot be null')
    }
  })
})
