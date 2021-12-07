import { useQuery } from 'react-query'
import { Transaction } from '../../types/transaction'
import { TransactionSubcategory } from '../../types/transactionSubcategory'
import {
  fetchSubcategories,
  fetchSubcategory,
  fetchSubcategoryTransactions,
} from './fetchers'
import { BASE_NAMES } from '../../settings/api'

export function useSubcategories(categoryId: number) {
  return useQuery<TransactionSubcategory[], Error>(
    [BASE_NAMES.SUBCATEGORIES, categoryId],
    () => fetchSubcategories(categoryId)
  )
}

export function useSubcategory(categoryId: number, subcategoryId: number) {
  return useQuery<TransactionSubcategory, Error>(
    [BASE_NAMES.SUBCATEGORIES, categoryId, subcategoryId],
    () => fetchSubcategory(categoryId, subcategoryId)
  )
}

export function useSubcategoryTransactions(categoryId: number, subcategoryId: number) {
  return useQuery<Transaction[], Error>(
    [BASE_NAMES.SUBCATEGORIES, categoryId, subcategoryId, BASE_NAMES.TRANSACTIONS],
    () => fetchSubcategoryTransactions(categoryId, subcategoryId)
  )
}
