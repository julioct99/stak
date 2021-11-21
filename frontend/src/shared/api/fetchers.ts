import axios from 'axios';
import {
  getCategoryListUrl,
  getSubcategoryListUrl,
  getTransactionListUrl,
  getWalletListUrl,
} from './urls';

export const fetchWallets = async () => {
  const wallets = await axios.get(getWalletListUrl());
  return wallets.data;
};

export const fetchCategories = async () => {
  const categories = await axios.get(getCategoryListUrl());
  return categories.data;
};

export const fetchSubcategories = async (categoryId: number) => {
  const subcategories = await axios.get(getSubcategoryListUrl(categoryId));
  return subcategories.data;
};

export const fetchTransactions = async (walletId: number | undefined) => {
  if (!walletId) return [];

  const transactions = await axios.get(getTransactionListUrl(walletId));
  return transactions.data;
};
