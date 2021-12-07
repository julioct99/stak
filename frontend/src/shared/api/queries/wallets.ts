import { useQuery } from 'react-query'
import { Transaction } from '../../types/transaction'
import { Wallet } from '../../types/wallet'
import { fetchWalletTransactions, fetchWallet, fetchWallets } from './fetchers'
import { BASE_NAMES } from '../../settings/api'

export function useWallets() {
  return useQuery<Wallet[], Error>(BASE_NAMES.WALLETS, fetchWallets)
}

export function useWallet(walletId: number) {
  return useQuery<Wallet, Error>([BASE_NAMES.WALLETS, walletId], () =>
    fetchWallet(walletId)
  )
}

export function useWalletTransactions(walletId: number) {
  return useQuery<Transaction[], Error>([BASE_NAMES.TRANSACTIONS, walletId], () =>
    fetchWalletTransactions(walletId)
  )
}
