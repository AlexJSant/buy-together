import React, { useContext } from 'react'

export interface BuyTogetherContextProps {
  handleSlideChange: Function
  normalizedBaseProduct: any
  normalizedProductList: any[]
  cartItems: any
  simplifiedTotalPrice: number
  totalPrice: number
  setTotalPrice: Function
  customText: string
  showCustomText: boolean
}

export const BuyTogetherContextDefault = {
  handleSlideChange: () => {},
  normalizedBaseProduct: {},
  normalizedProductList: [],
  cartItems: [1],
  simplifiedTotalPrice: 0,
  totalPrice: 0,
  setTotalPrice: () => {},
  customText: 'PIX',
  showCustomText: false,
}

export const BuyTogetherContext = React.createContext<BuyTogetherContextProps>(
  BuyTogetherContextDefault
)

export const useBuyTogether = () => useContext(BuyTogetherContext)
