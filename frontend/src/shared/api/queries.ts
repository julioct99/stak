import { useQuery } from 'react-query'
import { Transaction } from '../types/transaction'
import { TransactionCategory } from '../types/transactionCategory'
import { TransactionSubcategory } from '../types/transactionSubcategory'
import { Wallet } from '../types/wallet'
import {
  fetchCategories,
  fetchCategoryDetail,
  fetchCategoryTransactions,
  fetchSubcategories,
  fetchSubcategoryDetail,
  fetchSubcategoryTransactions,
  fetchTransactions,
  fetchWalletDetail,
  fetchWallets,
} from './fetchers'
import { BASE_NAMES } from './settings'

export function useWallets() {
  return useQuery<Wallet[], Error>(BASE_NAMES.WALLETS, fetchWallets)
}

export function useWallet(walletId: number) {
  return useQuery<Wallet, Error>([BASE_NAMES.WALLETS, walletId], () =>
    fetchWalletDetail(walletId)
  )
}

export function useCategories() {
  return useQuery<TransactionCategory[], Error>(BASE_NAMES.CATEGORIES, fetchCategories)
}

export function useCategory(categoryId: number) {
  return useQuery<TransactionCategory, Error>([BASE_NAMES.CATEGORIES, categoryId], () =>
    fetchCategoryDetail(categoryId)
  )
}

export function useCategoryTransactions(categoryId: number) {
  return useQuery<Transaction[], Error>(
    [BASE_NAMES.CATEGORIES, categoryId, BASE_NAMES.TRANSACTIONS],
    () => fetchCategoryTransactions(categoryId)
  )
}

export function useSubcategories(categoryId: number) {
  return useQuery<TransactionSubcategory[], Error>(
    [BASE_NAMES.SUBCATEGORIES, categoryId],
    () => fetchSubcategories(categoryId)
  )
}

export function useSubcategory(categoryId: number, subcategoryId: number) {
  return useQuery<TransactionSubcategory, Error>(
    [BASE_NAMES.SUBCATEGORIES, categoryId, subcategoryId],
    () => fetchSubcategoryDetail(categoryId, subcategoryId)
  )
}

export function useSubcategoryTransactions(categoryId: number, subcategoryId: number) {
  return useQuery<Transaction[], Error>(
    [BASE_NAMES.SUBCATEGORIES, categoryId, subcategoryId, BASE_NAMES.TRANSACTIONS],
    () => fetchSubcategoryTransactions(categoryId, subcategoryId)
  )
}

export function useTransactions(walletId: number) {
  return useQuery<Transaction[], Error>([BASE_NAMES.TRANSACTIONS, walletId], () =>
    fetchTransactions(walletId)
  )
}
