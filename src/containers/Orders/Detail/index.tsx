import { useEffect, useState } from 'react'
import fetchOrder, { OrderDetailStoreAPIResult } from '../api/fetchOrder'
import OrdersDetailForm from './Form'
import { OrdersDetailError } from './interfaces'

const OrdersDetail = (): JSX.Element => {
	const [ordersDetailError, setOrdersDetailError] = useState<OrdersDetailError>(null)
	const [api, setApi] = useState<OrderDetailStoreAPIResult>()

	// Pick a random order from the 3 examples to start with.
	// Can be swapped out with API call.
	useEffect(() => {
		const id = Math.ceil(Math.random() * 3).toString()
		fetchOrder(id).then((order) => {
			setApi(order)
			if (order.error) setOrdersDetailError(order.error)
		})
	}, [])

	// redundant `||` but in case `ordersDetailError` (triggered in `./Item.tsx`) gets removed or tweaked, the `api?.error` needs to stay
	if (api?.error || ordersDetailError) {
		return (
			<div>
				<p className="p-8">Looks like something went wrong. Please try again later</p>
			</div>
		)
	}

	if (api?.data) {
		return (
			<OrdersDetailForm
				apiData={api.data}
				setOrdersDetailError={setOrdersDetailError}
			></OrdersDetailForm>
		)
	}

	return <p>Loading...</p>
}

export default OrdersDetail
