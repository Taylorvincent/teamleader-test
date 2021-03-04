import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { OrderDetailStore } from '../../api/fetchOrder'

import fetchRelatedProducts, { RelatedProductsAPIResult } from '../../api/fetchRelatedProducts'
import RelatedProductsItem from './Item'

interface Props {
	setStore: Dispatch<SetStateAction<OrderDetailStore | undefined>>
	store: OrderDetailStore
}
const RelatedProducts = ({ store, setStore }: Props): JSX.Element | null => {
	const [api, setApi] = useState<RelatedProductsAPIResult>()
	const [itemIds, setItemIds] = useState<string>()

	// When the items in the order change, set the ids for the related items
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

	useEffect(() => {
		if (itemIds) {
			fetchRelatedProducts(itemIds, 3).then((result) => {
				setApi(result)
			})
		}
	}, [itemIds])

	if (api?.data) {
		return (
			<div>
				<h3 className="mb-8">People also ordered:</h3>
				<div className="flex">
					{api.data.map((product) => (
						<RelatedProductsItem
							key={product.id}
							product={product}
							setStore={setStore}
						></RelatedProductsItem>
					))}
				</div>
			</div>
		)
	}

	// let's just log the error for now
	if (api?.error) {
		console.error(api.error)
		return null
	}

	return <div>Loading...</div>
}

export default RelatedProducts
