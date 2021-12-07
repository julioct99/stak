import axios from 'axios'
import { Wallet, WalletPost } from '../../types/wallet'
import { getWalletDetailUrl, getWalletListUrl } from '../urls'

export const WalletService = {
  create: async (wallet: WalletPost) => {
    const url = getWalletListUrl()
    return axios.post<WalletPost>(url, wallet)
  },
  update: async (wallet: Wallet) => {
    const url = getWalletDetailUrl(wallet.id)
    return axios.put<Wallet>(url, wallet)
  },
}
