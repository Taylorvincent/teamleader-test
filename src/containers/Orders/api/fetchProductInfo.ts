import productDummyApi from '../../../../test-copy/data/products.json'
import { GeneralFakeAPIError } from '../../../interfaces'

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

const fakeApi = async (
	id: ProductDetailAPI['id']
): Promise<ProductDetailAPI | GeneralFakeAPIError> => {
	console.log('fetching product info...')
	await new Promise((resolve) => setTimeout(resolve, 100))

	const product = productDummyApi.find((p) => p.id === id)

	if (Math.random() < 0.05 || !product) {
		console.log('triggering fake error in product API')
		return { error: true, message: 'Something went wrong fetching product information' }
	}

	return product
}

const fetchProductInfo = async (id: ProductDetailAPI['id']): Promise<ProductDetailAPIResult> => {
	const result = await fakeApi(id)

	if ('error' in result) {
		return {
			error: result.message,
		}
	} else {
		return {
			data: result,
		}
	}
}

export default fetchProductInfo
