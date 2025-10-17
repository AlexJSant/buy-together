import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'buyTogetherContainer',
  'currentProduct',
  'currentProductWrapper',
  'productList',
  'buyTogetherTitleContainer',
  'buyTogetherTitle',
  'buyTogetherInfo',
  'totalValue',
  'totalProducts',
  'buyTogetherProductList',
  'buyTogetherProductItem',
  'totalProductsCount',
  'arrowDisabled',
  'buyButton',
  'arrowNext',
  'arrowPrev',
  'arrow',
]

interface BuyTogetherMessageProps {
  message: string
}

const BuyTogetherMessage: React.FC<BuyTogetherMessageProps> = ({
  message = 'Leve os dois produtos',
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return <div className={handles.buyTogetherInfo}>{message}</div>
}

export default BuyTogetherMessage
