import { BASE_URL, BASE_NAMES } from '../../settings/api'

export const getWalletListUrl = () => {
  return `${BASE_URL}/${BASE_NAMES.WALLETS}/`
}

export const getWalletDetailUrl = (walletId: number) => {
  return `${getWalletListUrl()}${walletId}`
}

export const getWalletTransactionListUrl = (walletId: number) => {
  const parentWalletUrl = getWalletDetailUrl(walletId)
  return `${parentWalletUrl}/${BASE_NAMES.TRANSACTIONS}/`
}

export const getWalletTransactionDetailUrl = (
  walletId: number,
  transactionId: number
) => {
  return `${getWalletTransactionListUrl(walletId)}${transactionId}`
}
