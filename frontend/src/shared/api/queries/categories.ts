import { useQuery } from 'react-query'
import { Transaction } from '../../types/transaction'
import { TransactionCategory } from '../../types/transactionCategory'
import { fetchCategories, fetchCategory, fetchCategoryTransactions } from './fetchers'
import { BASE_NAMES } from '../../settings/api'

export function useCategories() {
  return useQuery<TransactionCategory[], Error>(BASE_NAMES.CATEGORIES, fetchCategories)
}

export function useCategory(categoryId: number) {
  return useQuery<TransactionCategory, Error>([BASE_NAMES.CATEGORIES, categoryId], () =>
    fetchCategory(categoryId)
  )
}

export function useCategoryTransactions(categoryId: number) {
  return useQuery<Transaction[], Error>(
    [BASE_NAMES.CATEGORIES, categoryId, BASE_NAMES.TRANSACTIONS],
    () => fetchCategoryTransactions(categoryId)
  )
}
