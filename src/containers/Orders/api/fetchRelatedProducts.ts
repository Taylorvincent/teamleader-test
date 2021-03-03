import productDummyApi from '../../../../test-copy/data/products.json'

export interface ProductDetailAPIResult {
	data?: ProductDetailAPI[]
	error?: string
}

export interface ProductDetailAPI {
	id: string
	description: string
	category: string
	price: string
}

const fakeApi = (amount: number) => {
	// Shuffle array
	const shuffled = productDummyApi.sort(() => 0.5 - Math.random())

	// Get sub-array of first n elements after shuffled
	return shuffled.slice(0, amount)
}

const fetchRelatedProducts = async (amount: number): Promise<ProductDetailAPIResult> => {
	// add some fake async delay
	// todo: delete
	await new Promise((resolve) => setTimeout(resolve, 100))

	const result = fakeApi(amount)
	// if (result && Math.random() > 0.1) {
	if (result) {
		return {
			data: result,
		}
	} else {
		console.log('triggering fake error in related products API')
		return {
			error: 'Something went wrong fetching related products information',
		}
	}
}

export default fetchRelatedProducts
