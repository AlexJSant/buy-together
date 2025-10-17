import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useBuyTogether } from './Context'

interface BuyTogetherBuyButtonProps {
  BuyButton: React.ComponentType<{ skuItems: CartItem[] }>
}

const CSS_HANDLES = ['buyButton']

const BuyTogetherBuyButton: React.FC<BuyTogetherBuyButtonProps> = ({
  BuyButton,
}) => {
  const { cartItems } = useBuyTogether()
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${handles.buyButton}`}>
      <BuyButton skuItems={cartItems} />
    </div>
  )
}

export default BuyTogetherBuyButton
