import axios from 'axios'
import {
  TransactionCategory,
  TransactionCategoryPost,
} from '../../types/transactionCategory'
import { getCategoryDetailUrl, getCategoryListUrl } from '../urls'

export const CategoryService = {
  create: async (category: TransactionCategoryPost) => {
    const url = getCategoryListUrl()
    return axios.post<TransactionCategoryPost>(url, category)
  },
  update: async (category: TransactionCategory) => {
    const url = getCategoryDetailUrl(category.id)
    return axios.put<TransactionCategory>(url, category)
  },
  delete: async (category: TransactionCategory) => {
    const url = getCategoryDetailUrl(category.id)
    return axios.delete(url)
  },
}
