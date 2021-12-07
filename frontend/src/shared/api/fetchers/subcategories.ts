import axios from 'axios'
import {
  getSubcategoryDetailUrl,
  getSubcategoryListUrl,
  getSubcategoryTransactionListUrl,
} from '../urls'

export const fetchSubcategories = async (categoryId: number) => {
  const url = getSubcategoryListUrl(categoryId)
  const subcategories = await axios.get(url)
  return subcategories.data
}

export const fetchSubcategory = async (categoryId: number, subcategoryId: number) => {
  const url = getSubcategoryDetailUrl(categoryId, subcategoryId)
  const subcategory = await axios.get(url)
  return subcategory.data
}

export const fetchSubcategoryTransactions = async (
  categoryId: number,
  subcategoryId: number
) => {
  const url = getSubcategoryTransactionListUrl(categoryId, subcategoryId)
  const transactions = await axios.get(url)
  return transactions.data
}
