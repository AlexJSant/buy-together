import React, { useEffect, useState, useMemo, ReactNode } from 'react'
import { useProduct } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import { ProductListContext } from 'vtex.product-list-context'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { PreferenceType } from 'vtex.product-summary/react/utils/normalize'
import { useCssHandles } from 'vtex.css-handles'
import { ProductGroupContext } from 'vtex.product-group-context'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import axios from 'axios'

import { BuyTogetherContext } from './Context'
import getProducts from './graphql/getProduct.gql'
import { mapSKUItemsToCartItems } from './utils'
import { AllSkus } from './utils/normalize'

const { ProductListProvider } = ProductListContext
const { ProductGroupProvider, useProductGroup } = ProductGroupContext

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

interface BuyTogetherProps {
  showAllSkus?: boolean
  children: ReactNode
  preferredSKU: PreferenceType
}

const notNull = (item: CartItem | null): item is CartItem => item !== null

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const BuyTogether: StorefrontFunctionComponent = ({
  children,
  showAllSkus = false,
  preferredSKU = 'FIRST_AVAILABLE',
}: BuyTogetherProps) => {
  const productContext = useProduct() as any
  const { product } = productContext
  const [showTogetherIds, setShowTogetherIds] = useState<number[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const { handles } = useCssHandles(CSS_HANDLES)
  const { items } = useProductGroup()!
  const [currentItems, setCurrentItens] = useState(0)

  const [orderedItems, setOrderedItems] = useState<Item[]>()

  useEffect(() => {
    getShowTogetherIds()
  }, [product])

  const getShowTogetherIds = async () => {
    const rawResult = await axios(
      `/api/catalog_system/pub/products/crossselling/showtogether/${product.productId}`
    )

    const skuIDs = rawResult.data.map((item: any) => item.items[0].itemId)

    setShowTogetherIds(skuIDs)
  }

  const { data } = useQuery(getProducts, {
    variables: {
      skuId: showTogetherIds,
    },
  })

  const normalizedBaseProduct = useMemo(
    () => ProductSummary.mapCatalogProductToProductSummary(product),
    [product]
  )

  const normalizedProductList = useMemo(() => {
    const skus = showAllSkus
      ? data?.productsByIdentifier
          .map((productItem: Product) => {
            return AllSkus(productItem)
          })
          .flat() || []
      : data?.productsByIdentifier || []

    return skus
      ?.map((e: any) =>
        ProductSummary.mapCatalogProductToProductSummary(e, preferredSKU)
      )
      .sort((a: any, b: any) => {
        if (Number(a.sku.itemId) > Number(b.sku.itemId)) {
          return 1
        }

        if (Number(a.sku.itemId) < Number(b.sku.itemId)) {
          return -1
        }

        return 0
      })
  }, [data?.productsByIdentifier])

  const filteredItens = useMemo(() => {
    return orderedItems
      ?.filter((_product: any, i: number) => i === currentItems)
      .concat(
        items.filter(item => item.product.productId === product.productId)
      )
  }, [orderedItems, currentItems])

  const cartItems = useMemo(() => {
    if (!filteredItens) return

    return mapSKUItemsToCartItems(filteredItens).filter(notNull)
  }, [filteredItens])

  useEffect(() => {
    setOrderedItems(
      items
        .sort((a: any, b: any) => {
          if (Number(a.product.sku.itemId) > Number(b.product.sku.itemId)) {
            return 1
          }

          if (Number(a.product.sku.itemId) < Number(b.product.sku.itemId)) {
            return -1
          }

          return 0
        })
        .filter(item => item.product.productId !== product.productId)
    )
  }, [items])

  const simplifiedTotalPrice = useMemo(() => {
    return cartItems?.reduce((total: number, currentItem: CartItem) => {
      return total + currentItem.sellingPrice / 100
    }, 0)
  }, [cartItems])

  const handleSlideChange = (e: any) => {
    setCurrentItens(Number(e.activeIndex))
  }

  //   if (!showTogether || showTogether?.length === 0) return null
  if (!normalizedProductList.length) return null

  return (
    <BuyTogetherContext.Provider
      value={{
        normalizedBaseProduct,
        normalizedProductList,
        handleSlideChange,
        cartItems,
        simplifiedTotalPrice: Number(simplifiedTotalPrice),
        totalPrice: Number(totalPrice),
        setTotalPrice,
      }}
    >
      <ProductListProvider listName="buyTogether">
        <div className={`flex flex-column ${handles.buyTogetherContainer}`}>
          {children}
        </div>
      </ProductListProvider>
    </BuyTogetherContext.Provider>
  )
}

BuyTogether.schema = {
  title: 'editor.BuyTogether.title',
  description: 'editor.BuyTogether.description',
  type: 'object',
  properties: {},
}

const BuyTogetherWrapper: StorefrontFunctionComponent = props => {
  return (
    <ProductGroupProvider>
      <BuyTogether {...props} />
    </ProductGroupProvider>
  )
}

BuyTogetherWrapper.schema = {
  title: 'editor.BuyTogether.title',
  description: 'editor.BuyTogether.description',
  type: 'object',
  properties: {},
}

export default BuyTogetherWrapper
