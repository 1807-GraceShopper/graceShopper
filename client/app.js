import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
	return (
		<div>
      {/* this should go at least in the <head>, possibly get as a node module */}
      {/* race conditions */}
			<script src="https://js.stripe.com/v3/" />
			<Navbar />
			<Routes />
		</div>
	)
}

export default App
