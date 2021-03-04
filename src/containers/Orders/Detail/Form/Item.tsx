import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { OrderDetailStore, OrderItem } from '../../api/fetchOrder'
import fetchProductInfo, { ProductDetailAPIResult } from '../../api/fetchProductInfo'
import { changeOrdersDetailItemQuantity } from './functions'
import { SetOrdersDetailError } from '../interfaces'
import { PostOrderAPIResult } from '../../api/postOrder'

interface Props {
	item: OrderItem
	setOrdersDetailError: SetOrdersDetailError
	setStore: Dispatch<SetStateAction<OrderDetailStore | undefined>>
	postOrderResult: PostOrderAPIResult | undefined
}

const OrdersDetailItem = ({
	item,
	setOrdersDetailError,
	setStore,
	postOrderResult,
}: Props): JSX.Element | null => {
	const [productInfo, setProductInfo] = useState<ProductDetailAPIResult>()

	useEffect(() => {
		fetchProductInfo(item['product-id']).then((result) => {
			setProductInfo(result)
		})
	})

	useEffect(() => {
		if (productInfo?.error) setOrdersDetailError(productInfo.error)
	}, [productInfo, setOrdersDetailError])

	if (productInfo?.data)
		return (
			<div className="mb-4 pl-4 border-l flex">
				<div className="mr-8 w-96">
					<p>
						{productInfo.data.description} ({item['product-id']})
					</p>
					<p>
						{item['unit-price']} x {item.quantity}
					</p>
					<p>= {item.total}</p>
				</div>
				{!postOrderResult && (
					<>
						<button
							className="p-2 mx-2 text-2xl"
							onClick={() => changeOrdersDetailItemQuantity(item['product-id'], setStore, -1)}
						>
							-
						</button>
						<button
							className="p-2 mx-2 text-2xl"
							onClick={() => changeOrdersDetailItemQuantity(item['product-id'], setStore, 1)}
						>
							+
						</button>
						<button
							className="p-2 mx-2 text-2xl"
							onClick={() => changeOrdersDetailItemQuantity(item['product-id'], setStore, 'delete')}
						>
							X
						</button>
					</>
				)}
			</div>
		)

	return <p>Loading...</p>
}

export default OrdersDetailItem
