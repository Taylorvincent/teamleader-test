import exampleOrder1 from '../../../../test-copy/example-orders/order1.json'
import exampleOrder2 from '../../../../test-copy/example-orders/order2.json'
import exampleOrder3 from '../../../../test-copy/example-orders/order3.json'

export interface OrderDetailStoreAPIResult {
	data?: OrderDetailStore
	error?: string
}

export interface OrderDetailStore {
	id: number
	'customer-id': number
	items: OrderItem[]
	total: number
}

export interface OrderItem {
	'product-id': string
	quantity: number
	'unit-price': number
	total: number
}

const examples = [exampleOrder1, exampleOrder2, exampleOrder3]

const fetchOrder = async (id: OrderDetailStore['id']): Promise<OrderDetailStoreAPIResult> => {
	// add some fake async delay
	// todo: delete
	await new Promise((resolve) => setTimeout(resolve, 100))

	if (Math.random() < 0.2) {
		console.log('triggering fake error in order API')
		return { error: 'something went wrong' }
	}

	const result: OrderDetailStore = JSON.parse(JSON.stringify(examples[id]))
	console.log(`loaded example order${id + 1}.json`)
	return { data: result }
}

export default fetchOrder
