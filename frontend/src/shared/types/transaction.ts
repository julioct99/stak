export interface Transaction {
  id: number;
  amount: number;
  creationDate: string;
  date: string;
  wallet: number;
  subcategory: number | null;
}
