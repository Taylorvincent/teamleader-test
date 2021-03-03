import { Dispatch, SetStateAction } from 'react'

export type OrdersDetailError = string | null

export type SetOrdersDetailError = Dispatch<SetStateAction<OrdersDetailError>>
