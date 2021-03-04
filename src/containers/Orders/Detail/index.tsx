import { useEffect, useState } from 'react'
import fetchOrder, { OrderDetailStore, OrderDetailStoreAPIResult } from '../api/fetchOrder'
import OrdersDetailForm from './Form'
import { OrdersDetailError } from './interfaces'
import RelatedProducts from './RelatedProducts'

const OrdersDetail = (): JSX.Element => {
	const [ordersDetailError, setOrdersDetailError] = useState<OrdersDetailError>(null)
	const [api, setApi] = useState<OrderDetailStoreAPIResult>()
	const [store, setStore] = useState<OrderDetailStore>()

	const [itemIds, setItemIds] = useState<string>()

	// Pick a random order from the 3 examples to start with.
	// Can be swapped out with API call.
	useEffect(() => {
		const id = Math.ceil(Math.random() * 3).toString()
		fetchOrder(id).then((order) => {
			setApi(order)
			if (order.data) {
				setStore(order.data)
			}
			if (order.error) setOrdersDetailError(order.error)
		})
	}, [])

	useEffect(() => {
		if (store) {
			setItemIds(
				// stringify the array to reduce rerenders if the id's do not change
				JSON.stringify(
					store.items.reduce<string[]>((acc, curr) => {
						acc.push(curr['product-id'])
						return acc
					}, [])
				)
			)
		}
	}, [store])

	// redundant `||` but in case `ordersDetailError` (triggered in `./Item.tsx`) gets removed or tweaked, the `api?.error` needs to stay
	if (api?.error || ordersDetailError) {
		return (
			<div>
				<p className="p-8">Looks like something went wrong. Please try again later</p>
			</div>
		)
	}

	if (api?.data && store) {
		return (
			<div>
				<OrdersDetailForm
					store={store}
					setStore={setStore}
					setOrdersDetailError={setOrdersDetailError}
				></OrdersDetailForm>
				{itemIds && <RelatedProducts itemIds={itemIds} setStore={setStore}></RelatedProducts>}
			</div>
		)
	}

	return <p>Loading...</p>
}

export default OrdersDetail
