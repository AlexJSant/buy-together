import * as React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import { useBuyTogether, BuyTogetherContextProps } from './Context'

import './swiper.global.css'

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
  'swiperPagination',
  'swiperBulletActive',
  'swiperBullet',
  'swiperWrapper',
]

const ProductLists: React.FC = () => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const context = useBuyTogether() as BuyTogetherContextProps
  const { normalizedProductList } = context

  return (
    <div className={`h-100 w-100 ph4 ${handles.productList}`}>
      <div className={`${handles.buyTogetherProductList} pv4`}>
        {normalizedProductList && normalizedProductList.length > 0 && (
          <div
            data-item-id="jujuba"
            className={`${handles.buyTogetherProductItem} pv2`}
          >
            <ExtensionPoint id="product-summary" product={normalizedProductList[0]} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductLists
