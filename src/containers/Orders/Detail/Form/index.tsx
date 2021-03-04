import { Dispatch, SetStateAction } from 'react'
import { OrderDetailStore } from '../../api/fetchOrder'
import { PostOrderAPIResult } from '../../api/postOrder'
import { SetOrdersDetailError } from '../interfaces'
import OrdersDetailItem from './Item'

interface Props {
	store: OrderDetailStore
	setStore: Dispatch<SetStateAction<OrderDetailStore | undefined>>
	setOrdersDetailError: SetOrdersDetailError
	placeOrder: () => void
	postOrderResult: PostOrderAPIResult | undefined
}

const OrdersDetailForm = ({
	store,
	setStore,
	setOrdersDetailError,
	placeOrder,
	postOrderResult,
}: Props): JSX.Element => {
	return (
		<div className="p-8 max-w-xl mb-16">
			<h2 className="mb-4">Your order (#{store.id})</h2>
			{store.items.map((item) => {
				return (
					<OrdersDetailItem
						key={item['product-id']}
						item={item}
						setOrdersDetailError={setOrdersDetailError}
						setStore={setStore}
						postOrderResult={postOrderResult}
					></OrdersDetailItem>
				)
			})}
			<p className="text-right">Your total: {store.total}</p>
			<div className="flex justify-end">
				{!postOrderResult && (
					<button className="p-2 my-4 border" onClick={placeOrder}>
						Place order
					</button>
				)}
			</div>
			<div>{postOrderResult?.success && <h2>Order placed successfully ✔</h2>}</div>
		</div>
	)
}

export default OrdersDetailForm
