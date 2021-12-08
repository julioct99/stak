import axios from 'axios'
import { Transaction, TransactionPost } from '../../types/transaction'
import { getWalletTransactionListUrl } from '../urls'
import { getWalletTransactionDetailUrl } from '../urls/wallets'

export const TransactionService = {
  create: async (transaction: TransactionPost) => {
    const url = getWalletTransactionListUrl(transaction.wallet)
    return axios.post<TransactionPost>(url, transaction)
  },
  update: async (transaction: Transaction) => {
    const url = getWalletTransactionDetailUrl(transaction.wallet, transaction.id)
    return axios.put<Transaction>(url, transaction)
  },
}
