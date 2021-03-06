export interface IBudget {
  sale_type: string;
	client_id: string;
  users_quantity: number;
  taxes: number;
  commission: number;
  amount: number;
}

export interface IBudgetProduct {
  product_id: string;
  product_name?: string;
  tax_free_amount: number;
  tax_amount: number;
  value_for_partners: number;
}

export interface IBudgetData extends IBudget{
  budget_products: IBudgetProduct[];
}