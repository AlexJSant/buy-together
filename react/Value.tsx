import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedCurrency } from 'vtex.format-currency'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { useBuyTogether } from './Context'

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
  'customText',
]

interface BuyTogetherValueProps {
  message: string
  markers: string[]
  applyPromotions: boolean
}

const BuyTogetherValue: React.FC<BuyTogetherValueProps> = ({
  message = 'Por apenas: {totalPrice}',
  markers,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const {
    simplifiedTotalPrice,
    customText,
    showCustomText,
  } = useBuyTogether()

  // useEffect(() => {
  //   if (!cartItems) return

  //   axios
  //     .post(
  //       `/api/checkout/pub/orderforms/simulation?RnbBehavior=${
  //         applyPromotions ? 1 : 0
  //       }`,
  //       {
  //         items: [...cartItems],
  //       }
  //     )
  //     .then(res => {
  //       if (!res.data) return

  //       const totalItem = res.data.totals.find(
  //         (total: any) => total.id === 'Items'
  //       )

  //       const total = totalItem?.value / 100 || simplifiedTotalPrice

  //       setTotalPrice(total)
  //     })
  // }, [cartItems])

  if (!simplifiedTotalPrice) return null

  return (
    <p className={`${handles.totalValue}`}>
      <IOMessageWithMarkers
        handleBase="totalPrice"
        message={message}
        markers={markers}
        values={{
          totalPrice: (
            <span key="totalPrice">
              <FormattedCurrency value={simplifiedTotalPrice} />
              {showCustomText && customText && (
                <span className={`${handles.customText}`}> {customText}</span>
              )}
            </span>
          ),
        }}
      />
    </p>
  )
}

export default BuyTogetherValue
