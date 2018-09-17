import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import product from './product'
import {reducer as form} from 'redux-form'
import category from './category'
import cart from './cart'
import users from './users'
import reviews from './reviews'
import shippingInfo from './shippinginfo'
import orders from './orders'

const reducer = combineReducers({
	user,
	product,
	category,
	form,
	cart,
	users,
	reviews,
	shippingInfo,
	orders
})
const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
