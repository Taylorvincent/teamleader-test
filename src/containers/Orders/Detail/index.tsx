import { useEffect, useState } from 'react'
import fetchOrder, { OrderDetailStore, OrderDetailStoreAPIResult } from '../api/fetchOrder'
import postOrder, { PostOrderAPIResult } from '../api/postOrder'
import OrdersDetailForm from './Form'
import { OrdersDetailError } from './interfaces'
import RelatedProducts from './RelatedProducts'

interface Props {
	id: string
}

const OrdersDetail = ({ id }: Props): JSX.Element => {
	const [ordersDetailError, setOrdersDetailError] = useState<OrdersDetailError>(null)
	const [api, setApi] = useState<OrderDetailStoreAPIResult>()
	const [store, setStore] = useState<OrderDetailStore>()
	const [postOrderResult, setPostOrderResult] = useState<PostOrderAPIResult>()

	// Fetch the order from api, update the api state and store if successfull, error if failed
	useEffect(() => {
		fetchOrder(id).then((order) => {
			setApi(order)
			if (order.data) {
				setStore(order.data)
			}
			if (order.error) setOrdersDetailError(order.error)
		})
	}, [id])

	const placeOrder = (): void => {
		if (store) {
			postOrder(store).then((result) => setPostOrderResult(result))
		}
	}

	const err = api?.error || ordersDetailError || postOrderResult?.error
	if (err) {
		return (
			<div className="p-8">
				<h2>Error:</h2>
				<p>{err}</p>
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
					placeOrder={placeOrder}
					postOrderResult={postOrderResult}
				></OrdersDetailForm>
				<RelatedProducts store={store} setStore={setStore}></RelatedProducts>
			</div>
		)
	}

	return <p>Loading...</p>
}

export default OrdersDetail
