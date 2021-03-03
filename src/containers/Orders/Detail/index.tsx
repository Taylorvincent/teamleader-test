import { useEffect, useState } from 'react'
import fetchOrder, { OrderDetailStoreAPIResult } from '../api/fetchOrder'
import { OrdersDetailError } from './interfaces'
import OrdersDetailItem from './Item'

const OrdersDetail = (): JSX.Element => {
	const [error, setError] = useState<OrdersDetailError>(null)
	const [api, setApi] = useState<OrderDetailStoreAPIResult>()

	// Pick a random order from the 3 examples to start with.
	// Can be swapped out with API call.
	useEffect(() => {
		const i = Math.floor(Math.random() * 3)
		fetchOrder(i).then((order) => {
			setApi(order)
		})
	}, [])

	if (api?.error || error) {
		return (
			<div>
				<p className="p-8">Looks like something went wrong. Please try again later</p>
			</div>
		)
	}

	if (api?.data) {
		return (
			<div className="p-8 max-w-xl">
				<h2 className="mb-4">Your order (#{api.data.id})</h2>
				{api.data.items.map((item) => {
					return (
						<OrdersDetailItem
							key={item['product-id']}
							item={item}
							setOrdersDetailError={setError}
						></OrdersDetailItem>
					)
				})}
				<p className="text-right">Your total: {api.data.total}</p>
			</div>
		)
	}

	return <p>Loading...</p>
}

export default OrdersDetail
