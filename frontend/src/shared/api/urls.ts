import { BASE_NAMES, BASE_URL } from './settings';

export const getWalletListUrl = () => {
  return `${BASE_URL}/${BASE_NAMES.WALLETS}`;
};

export const getWalletDetailUrl = (walletId: number) => {
  return `${getWalletListUrl()}/${walletId}`;
};

export const getCategoryListUrl = () => {
  return `${BASE_URL}/${BASE_NAMES.CATEGORIES}`;
};

export const getCategoryDetailUrl = (categoryId: number) => {
  return `${getCategoryListUrl()}/${categoryId}`;
};

export const getSubcategoryListUrl = (categoryId: number) => {
  const parentCategoryUrl = getCategoryDetailUrl(categoryId);
  return `${parentCategoryUrl}/${BASE_NAMES.SUBCATEGORIES}`;
};

export const getSubcategoryDetailUrl = (categoryId: number, subcategoryId: number) => {
  return `${getSubcategoryListUrl(categoryId)}/${subcategoryId}`;
};

export const getTransactionListUrl = (walletId: number) => {
  const parentWalletUrl = getWalletDetailUrl(walletId);
  return `${parentWalletUrl}/${BASE_NAMES.TRANSACTIONS}`;
};

export const getTransactionDetailUrl = (walletId: number, transactionId: number) => {
  return `${getTransactionListUrl(walletId)}/${transactionId}`;
};
