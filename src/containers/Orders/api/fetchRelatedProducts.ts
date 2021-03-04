import productDummyApi from '../../../../test-copy/data/products.json'
import { GeneralFakeAPIError } from '../../../interfaces'

export interface RelatedProductsAPIResult {
	data?: RelatedProductsAPI[]
	error?: string
}

export interface RelatedProductsAPI {
	id: string
	description: string
	category: string
	price: string
}

const fakeApi = async (
	itemIds: string[],
	amount: number
): Promise<RelatedProductsAPI[] | GeneralFakeAPIError> => {
	console.log('fetching related products...')

	await new Promise((resolve) => setTimeout(resolve, 100))
	const filtered = productDummyApi.filter((item) => !itemIds.includes(item.id)).slice(0, amount)

	if (Math.random() < 0.05 || !filtered) {
		console.log('triggering fake error in related products API')
		return { error: true, message: 'Something went wrong fetching the related products' }
	}

	return filtered
}

const fetchRelatedProducts = async (
	itemIds: string,
	amount: number
): Promise<RelatedProductsAPIResult> => {
	const result = await fakeApi(JSON.parse(itemIds), amount)

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

export default fetchRelatedProducts
