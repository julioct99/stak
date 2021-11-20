import { useQuery } from 'react-query';
import { TransactionCategory } from '../types/transactionCategory';
import { TransactionSubcategory } from '../types/transactionSubcategory';
import { Wallet } from '../types/wallet';
import { fetchCategories, fetchSubcategories, fetchWallets } from './fetchers';
import { BASE_NAMES } from './settings';

export function useWallets() {
  return useQuery<Wallet[], Error>(BASE_NAMES.WALLETS, fetchWallets);
}

export function useCategories() {
  return useQuery<TransactionCategory[], Error>(BASE_NAMES.CATEGORIES, fetchCategories);
}

export function useSubcategories(categoryId: number) {
  return useQuery<TransactionSubcategory[], Error>(
    [BASE_NAMES.SUBCATEGORIES, categoryId],
    () => fetchSubcategories(categoryId)
  );
}