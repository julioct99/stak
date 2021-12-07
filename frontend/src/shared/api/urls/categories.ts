import { BASE_URL, BASE_NAMES } from '../../settings/api'

export const getCategoryListUrl = () => {
  return `${BASE_URL}/${BASE_NAMES.CATEGORIES}`
}

export const getCategoryDetailUrl = (categoryId: number) => {
  return `${getCategoryListUrl()}/${categoryId}`
}

export const getCategoryTransactionListUrl = (categoryId: number) => {
  return `${getCategoryDetailUrl(categoryId)}/${BASE_NAMES.TRANSACTIONS}`
}
