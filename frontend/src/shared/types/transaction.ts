export interface TransactionPost {
  amount: number
  date: string
  wallet: number
  subcategory: number | null
  description: string
}

export interface Transaction extends TransactionPost {
  id: number
  creationDate: string
}
