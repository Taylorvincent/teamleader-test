import OrdersDetail from '../containers/Orders/Detail'
import Layout from '../Layout'

const IndexPage = (): JSX.Element => {
	return (
		<Layout>
			<h1>Teamleader hardware shop</h1>
			<p className="mt-4 mb-16 text-soft">Vincent Taylor's Teamleader test.</p>
			<OrdersDetail />
		</Layout>
	)
}

export default IndexPage
