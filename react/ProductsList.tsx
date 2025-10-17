import React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useCssHandles } from 'vtex.css-handles'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { IconCaret } from 'vtex.store-icons'

import { useBuyTogether } from './Context'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

import './swiper.global.css'

const CARET_CLASSNAME =
  'pv8 absolute top-50 translate--50y z-2 pointer c-action-primary'

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

interface ProductListsProps {
  swiperProps: any
  NextArrow: React.FunctionComponent
  PrevArrow: React.FunctionComponent
}

const ProductLists: React.FC<ProductListsProps> = ({
  swiperProps = { slidesPerView: 1 },
  NextArrow,
  PrevArrow,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { handleSlideChange, normalizedProductList } = useBuyTogether()

  const swiperWrapperClasses = [handles.swiperWrapper]

  const galleryParams = {
    navigation: {
      prevEl: '.swiper-caret-prev',
      nextEl: '.swiper-caret-next',
      disabledClass: `c-disabled ${handles.arrowDisabled}`,
    },
  }

  return (
    <div className={`h-100 w-100 ph4 ${handles.productList}`}>
      <Swiper
        {...swiperProps}
        className={`${handles.buyTogetherProductList} pv4`}
        {...galleryParams}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          bulletActiveClass: handles.swiperBulletActive,
          bulletClass: handles.swiperBullet,
        }}
        scrollbar={{ draggable: true }}
        onSlideChange={e => handleSlideChange(e)}
        onSwiper={swiper => {
          if (swiper.wrapperEl) {
            // @ts-ignore
            const classes = `${swiper.wrapperEl.getAttribute(
              'class'
            )} ${swiperWrapperClasses.join(' ')}`
            // @ts-ignore
            swiper.wrapperEl.setAttribute('class', classes)
          }
        }}
      >
        <div
          className={`swiper-caret-next ${CARET_CLASSNAME} right-0 ${handles.arrowNext} ${handles.arrow}`}
          key="caret-next"
          slot="container-start"
        >
          {NextArrow ? (
            <NextArrow />
          ) : (
            <IconCaret size={18} orientation="right" />
          )}
        </div>
        {normalizedProductList.map((e: any, i: number) => (
          <SwiperSlide
            data-item-id="jujuba"
            key={`product-${i}`}
            className={`${handles.buyTogetherProductItem} pv2`}
          >
            <ExtensionPoint id="product-summary" product={e} />
          </SwiperSlide>
        ))}
        <div
          className={`swiper-caret-prev ${CARET_CLASSNAME} ${handles.arrowPrev} ${handles.arrow}`}
          key="caret-prev"
          slot="container-end"
        >
          {PrevArrow ? (
            <PrevArrow />
          ) : (
            <IconCaret size={18} orientation="left" />
          )}
        </div>
        <div className={`swiper-pagination ${handles.swiperPagination}`}></div>
      </Swiper>
    </div>
  )
}

export default ProductLists
