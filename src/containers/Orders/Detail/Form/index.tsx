import { useState } from 'react'
import { OrderDetailStore } from '../../api/fetchOrder'
import { SetOrdersDetailError } from '../interfaces'
import OrdersDetailItem from '../Item'

interface Props {
	apiData: OrderDetailStore
	setOrdersDetailError: SetOrdersDetailError
}

const OrdersDetailForm = ({ apiData, setOrdersDetailError }: Props): JSX.Element => {
	const [store, setStore] = useState<OrderDetailStore>(apiData)

	return (
		<div className="p-8 max-w-xl">
			<h2 className="mb-4">Your order (#{store.id})</h2>
			{store.items.map((item) => {
				return (
					<OrdersDetailItem
						key={item['product-id']}
						item={item}
						setOrdersDetailError={setOrdersDetailError}
						setStore={setStore}
					></OrdersDetailItem>
				)
			})}
			<p className="text-right">Your total: {store.total}</p>
		</div>
	)
}

export default OrdersDetailForm
