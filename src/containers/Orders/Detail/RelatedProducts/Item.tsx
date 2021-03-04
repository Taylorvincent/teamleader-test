import { Dispatch, SetStateAction } from 'react'
import { OrderDetailStore } from '../../api/fetchOrder'
import { ProductDetailAPI } from '../../api/fetchProductInfo'
import { addItemToOrderDetail } from '../Form/functions'

interface Props {
	product: ProductDetailAPI
	setStore: Dispatch<SetStateAction<OrderDetailStore | undefined>>
}

const RelatedProductsItem = ({ product, setStore }: Props): JSX.Element => {
	return (
		<div className="m-8">
			<p>{product.description}</p>
			<p>{product.price}</p>
			<button onClick={() => addItemToOrderDetail(product, setStore)}>buy</button>
		</div>
	)
}

export default RelatedProductsItem
