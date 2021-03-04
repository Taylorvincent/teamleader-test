import exampleOrder1 from '../../../../test-copy/example-orders/order1.json'
import exampleOrder2 from '../../../../test-copy/example-orders/order2.json'
import exampleOrder3 from '../../../../test-copy/example-orders/order3.json'

export interface OrderDetailStoreAPIResult {
	data?: OrderDetailStore
	error?: string
}
export interface OrderDetailStore {
	id: string
	'customer-id': string
	items: OrderItem[]
	total: string
}

export interface OrderItem {
	'product-id': string
	quantity: string
	'unit-price': string
	total: string
}

const examples = [exampleOrder1, exampleOrder2, exampleOrder3]

const fetchOrder = async (id: OrderDetailStore['id']): Promise<OrderDetailStoreAPIResult> => {
	// add some fake async delay
	// todo: delete
	await new Promise((resolve) => setTimeout(resolve, 100))

	const order = examples.find((ex) => ex.id === id)

	if (Math.random() < 0.2 || !order) {
		console.log('triggering fake error in order API')
		return { error: 'something went wrong while fetching your order' }
	}

	console.log(`loaded example order${id}.json`)
	return { data: order }
}

export default fetchOrder
