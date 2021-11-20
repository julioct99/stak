import { BASE_NAMES, BASE_URL } from './settings';

export const getWalletListUrl = () => {
  return `${BASE_URL}/${BASE_NAMES.WALLETS}`;
};

export const getWalletDetailUrl = (walletId: number) => {
  return `${BASE_URL}/${BASE_NAMES.WALLETS}/${walletId}`;
};

export const getCategoryListUrl = () => {
  return `${BASE_URL}/${BASE_NAMES.CATEGORIES}`;
};

export const getCategoryDetailUrl = (categoryId: number) => {
  return `${BASE_URL}/${BASE_NAMES.CATEGORIES}/${categoryId}`;
};

export const getSubcategoryListUrl = (categoryId: number) => {
  const parentCategoryUrl = getCategoryDetailUrl(categoryId);
  return `${parentCategoryUrl}/${BASE_NAMES.SUBCATEGORIES}`;
};

export const getSubcategoryDetailUrl = (categoryId: number, subcategoryId: number) => {
  const parentCategoryUrl = getCategoryDetailUrl(categoryId);
  return `${parentCategoryUrl}/${BASE_NAMES.SUBCATEGORIES}/${subcategoryId}`;
};
