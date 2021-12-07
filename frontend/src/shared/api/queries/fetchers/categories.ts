import axios from 'axios'
import {
  getCategoryDetailUrl,
  getCategoryListUrl,
  getCategoryTransactionListUrl,
} from '../../urls'

export const fetchCategories = async () => {
  const url = getCategoryListUrl()
  const categories = await axios.get(url)
  return categories.data
}

export const fetchCategory = async (categoryId: number) => {
  const url = getCategoryDetailUrl(categoryId)
  const category = await axios.get(url)
  return category.data
}

export const fetchCategoryTransactions = async (categoryId: number) => {
  const url = getCategoryTransactionListUrl(categoryId)
  const transactions = await axios.get(url)
  return transactions.data
}
