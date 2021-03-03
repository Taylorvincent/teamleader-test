import OrdersDetail from '../containers/Orders/Detail'
import Layout from '../Layout'

const IndexPage = (): JSX.Element => {
	return (
		<Layout>
			<h1>Teamleader hardware shop</h1>
			<OrdersDetail />
			<footer className="text-soft">Vincent Taylor's Teamleader test.</footer>
		</Layout>
	)
}

export default IndexPage
