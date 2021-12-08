export interface TransactionPost {
  amount: number
  date: string
  wallet: number
  subcategory: number | null
}

export interface Transaction extends TransactionPost {
  id: number
  creationDate: string
}
