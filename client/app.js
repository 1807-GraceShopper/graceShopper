import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
	return (
		<div>
			<script src="https://js.stripe.com/v3/" />
			<Navbar />
			<Routes />
		</div>
	)
}

export default App
