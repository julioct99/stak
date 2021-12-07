import axios from 'axios'
import {
  getWalletListUrl,
  getWalletDetailUrl,
  getWalletTransactionListUrl,
} from '../../urls'

export const fetchWallets = async () => {
  const url = getWalletListUrl()
  const wallets = await axios.get(url)
  return wallets.data
}

export const fetchWallet = async (walletId: number) => {
  const url = getWalletDetailUrl(walletId)
  const wallet = await axios.get(url)
  return wallet.data
}

export const fetchWalletTransactions = async (walletId: number) => {
  const url = getWalletTransactionListUrl(walletId)
  const transactions = await axios.get(url)
  return transactions.data
}
