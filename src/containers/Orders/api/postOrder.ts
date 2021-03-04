import { OrderDetailStore } from './fetchOrder'

export interface PostOrderAPIResult {
	error?: string
	success?: boolean
}

const postOrder = async (store: OrderDetailStore): Promise<PostOrderAPIResult> => {
	// add some fake async delay
	// todo: delete
	console.log('posting order...', store)
	await new Promise((resolve) => setTimeout(resolve, 300))
	//
	if (Math.random() < 0.7) {
		console.log('success!')
		return {
			success: true,
		}
	} else {
		console.log('failed :(')
		return {
			error: 'Something went wrong while placing your order 😢, try again later',
		}
	}
}

export default postOrder
