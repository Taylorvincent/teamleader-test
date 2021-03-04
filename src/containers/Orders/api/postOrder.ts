import { GeneralFakeAPIError, GeneralFakeAPISuccess } from '../../../interfaces'
import { OrderDetailStore } from './fetchOrder'

export interface PostOrderAPIResult {
	error?: string
	success?: boolean
}

const fakeApi = async (
	store: OrderDetailStore
): Promise<GeneralFakeAPISuccess | GeneralFakeAPIError> => {
	console.log('posting order...', store)
	await new Promise((resolve) => setTimeout(resolve, 100))

	if (Math.random() < 0.2) {
		console.log('posting order failed :(')
		return {
			error: true,
			message: 'Something went wrong while placing your order 😢, try again later',
		}
	}

	console.log('posting order success!')
	return {
		success: true,
	}
}

const postOrder = async (store: OrderDetailStore): Promise<PostOrderAPIResult> => {
	const result = await fakeApi(store)
	if ('success' in result) {
		return {
			success: true,
		}
	} else {
		return {
			error: result.message,
		}
	}
}

export default postOrder
