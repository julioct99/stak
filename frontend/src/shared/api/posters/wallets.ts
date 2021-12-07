import axios from 'axios'
import { WalletPost } from '../../types/wallet'
import { getWalletListUrl } from '../urls'

export const addWallet = async (wallet: WalletPost) => {
  const url = getWalletListUrl()
  return axios.post<WalletPost>(url, wallet)
}
