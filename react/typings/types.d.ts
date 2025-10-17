export interface InstallmentOption {
  paymentSystem: string
  bin: string | null
  paymentName: string | null
  paymentGroupName: string | null
  value: number
  installments: InstallmentItem[]
}

export interface InstallmentItem {
  count: number
  hasInterestRate: false
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: Array<{
    count: number
    hasInterestRate: false
    interestRate: number
    value: number
    total: number
  }>
}
