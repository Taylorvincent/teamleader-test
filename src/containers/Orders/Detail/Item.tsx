import { useEffect, useState } from 'react'
import { OrderItem } from '../api/fetchOrder'
import fetchProductInfo, { ProductDetailAPIResult } from '../api/fetchProductInfo'
import { SetOrdersDetailError } from './interfaces'

interface Props {
	item: OrderItem
	setOrdersDetailError: SetOrdersDetailError
}

const OrdersDetailItem = ({ item, setOrdersDetailError }: Props): JSX.Element | null => {
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
			<div className="mb-4 pl-4 border-l">
				<p>
					{productInfo.data.description} ({item['product-id']}) x {item.quantity}
				</p>
				<p>= {item.total}</p>
			</div>
		)

	return <p>Loading...</p>
}

export default OrdersDetailItem
