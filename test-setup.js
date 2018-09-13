import Adapter from 'enzyme-adapter-react-16'
import enzyme from 'enzyme'
import db from './server/db'

const adapter = new Adapter()
enzyme.configure({adapter})

/* https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests */
class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = value.toString()
  }

  removeItem(key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock()

beforeEach(() => {
  return db.sync({force: true})
})
