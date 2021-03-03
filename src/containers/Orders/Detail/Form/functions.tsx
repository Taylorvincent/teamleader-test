import { Dispatch, SetStateAction } from 'react'
import { OrderDetailStore } from '../../api/fetchOrder'

export type ChangeOrdersDetailItemQuantity = (
	productId: string,
	setStore: Dispatch<SetStateAction<OrderDetailStore>>,
	quantityChange: number | 'delete'
) => void

export const changeOrdersDetailItemQuantity: ChangeOrdersDetailItemQuantity = (
	productId,
	setStore,
	quantityChange
) => {
	setStore((prevStore) => {
		const itemToChangeIndex = prevStore.items.findIndex((item) => item['product-id'] === productId)

		if (itemToChangeIndex < 0) return prevStore
		const newItems = prevStore.items.concat()

		// edit the item's quantity and remove if 0
		const itemToChange = newItems[itemToChangeIndex]
		let itemToChangeQty = Number(itemToChange.quantity)
		const itemToChangePrice = Number(itemToChange['unit-price'])

		if (typeof quantityChange === 'number') {
			itemToChangeQty += quantityChange
			itemToChange.quantity = itemToChangeQty.toString()
		}
		itemToChange.total = toFakeMoneyDisplay(itemToChangeQty * itemToChangePrice)
		if (itemToChangeQty <= 0 || quantityChange === 'delete') {
			newItems.splice(itemToChangeIndex, 1)
		}

		// get new total
		let newTotal = 0
		newItems.forEach((item) => {
			newTotal += Number(item.total)
		})

		return {
			...prevStore,
			items: newItems,
			total: toFakeMoneyDisplay(newTotal),
		}
	})
}

const toFakeMoneyDisplay = (amount: number): string => {
	return amount.toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}
