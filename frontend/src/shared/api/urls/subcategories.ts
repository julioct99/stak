import { BASE_NAMES } from '../../settings/api'
import { getCategoryDetailUrl } from './categories'

export const getSubcategoryListUrl = (categoryId: number) => {
  const parentCategoryUrl = getCategoryDetailUrl(categoryId)
  return `${parentCategoryUrl}/${BASE_NAMES.SUBCATEGORIES}`
}

export const getSubcategoryDetailUrl = (categoryId: number, subcategoryId: number) => {
  return `${getSubcategoryListUrl(categoryId)}/${subcategoryId}`
}

export const getSubcategoryTransactionListUrl = (
  categoryId: number,
  subcategoryId: number
) => {
  return `${getSubcategoryDetailUrl(categoryId, subcategoryId)}/${
    BASE_NAMES.TRANSACTIONS
  }`
}
