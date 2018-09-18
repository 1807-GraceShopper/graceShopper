/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as SingleProduct} from './SingleProduct'
export {default as AllProducts} from './AllProducts'
export {default as AddProduct} from './AddProduct'
export {default as EditProduct} from './EditProduct'
export {default as AllUsers} from './AllUsers'
export {default as AddCategory} from './AddCategory'
export {default as EditCategory} from './EditCategory'
export {default as PasswordFormRedux} from './PasswordFormRedux'
export {default as CartView} from './CartView'
export {default as AddShippingInfo} from './AddShippingInfo'
export {default as EditShippingInfo} from './EditShippingInfo'
export {default as Stripe} from './stripe'
export {default as Checkout} from './Checkout'
export {default as AllUserOrders} from './AllUserOrders'
export {default as OrderAdmin} from './OrderAdmin'
export {default as SingleOrder} from './SingleOrder'
