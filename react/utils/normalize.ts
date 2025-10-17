export const AllSkus = (product: any) => {
  const products = product?.items.map((item: any) => ({
    ...product,
    items: [item],
  }))

  return products
}
