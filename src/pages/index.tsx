import { useState } from 'react'
import OrdersDetail from '../containers/Orders/Detail'
import Layout from '../Layout'

const IndexPage = (): JSX.Element => {
	// Pick a random order from the 3 examples to start with.
	const [id] = useState(Math.ceil(Math.random() * 3).toString())

	return (
		<Layout>
			<h1>Teamleader hardware shop</h1>
			<p className="mt-4 mb-16 text-soft">Vincent Taylor's Teamleader test.</p>
			<OrdersDetail id={id} />
		</Layout>
	)
}

export default IndexPage
