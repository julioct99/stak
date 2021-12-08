import axios from 'axios'
import {
  TransactionSubcategory,
  TransactionSubcategoryPost,
} from '../../types/transactionSubcategory'
import { getSubcategoryDetailUrl, getSubcategoryListUrl } from '../urls'

export const SubcategoryService = {
  create: async (subcategory: TransactionSubcategoryPost) => {
    const url = getSubcategoryListUrl(subcategory.category)
    return axios.post<TransactionSubcategoryPost>(url, subcategory)
  },
  update: async (subcategory: TransactionSubcategory) => {
    const url = getSubcategoryDetailUrl(subcategory.category, subcategory.id)
    return axios.put<TransactionSubcategory>(url, subcategory)
  },
}
