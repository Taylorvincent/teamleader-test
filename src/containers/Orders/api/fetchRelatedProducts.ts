import productDummyApi from '../../../../test-copy/data/products.json'

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

const fakeApi = (itemIds: string[], amount: number): RelatedProductsAPIResult['data'] => {
	const filtered = productDummyApi.filter((item) => !itemIds.includes(item.id))
	return filtered.slice(0, amount)
}

const fetchRelatedProducts = async (
	itemIds: string,
	amount: number
): Promise<RelatedProductsAPIResult> => {
	// add some fake async delay
	// todo: delete
	await new Promise((resolve) => setTimeout(resolve, 100))

	const result = fakeApi(JSON.parse(itemIds), amount)
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
