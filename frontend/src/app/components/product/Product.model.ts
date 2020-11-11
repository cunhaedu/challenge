export interface IProduct {
  id?: string;
  name: string;
  little_size_base: number,
	middle_size_base: number,
  large_size_base: number;
  value?: number;
  tax_amount?: number;
  commission?: number;
}