import productDummyApi from '../../../../test-copy/data/products.json'

export interface ProductDetailAPIResult {
	data?: ProductDetailAPI
	error?: string
}

export interface ProductDetailAPI {
	id: string
	description: string
	category: string
	price: string
}

const fetchProductInfo = async (id: ProductDetailAPI['id']): Promise<ProductDetailAPIResult> => {
	// add some fake async delay
	// todo: delete
	await new Promise((resolve) => setTimeout(resolve, 100))

	const result = productDummyApi.find((p) => p.id === id)
	// if (result && Math.random() > 0.1) {
	if (result) {
		return {
			data: result,
		}
	} else {
		console.log('triggering fake error in product API')
		return {
			error: 'Something went wrong fetching product information',
		}
	}
}

export default fetchProductInfo
