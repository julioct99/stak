export interface WalletPost {
  title: string
  balance: number
  owner: number
}

export interface Wallet extends WalletPost {
  id: number
}
