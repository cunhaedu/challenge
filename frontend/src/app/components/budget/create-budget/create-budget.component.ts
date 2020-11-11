import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IClient } from '../../client/Client.model';
import { ClientService } from '../../client/Client.service';
import { IProduct } from '../../product/Product.model';
import { ProductService } from '../../product/product.service';
import { IBudget, IBudgetProduct } from '../Budget.model';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.css']
})
export class CreateBudgetComponent implements OnInit {

  budgetProducts: IBudgetProduct[] = [];
  products: IProduct[];
  client: IClient;
  budget: IBudget = {
    sale_type: 'Própria',
    client_id: '',
    users_quantity: 1,
    taxes: 10,
    commission: 10,
    amount: 1
  };

  constructor(
    private productService: ProductService,
    private clientService: ClientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.budget.client_id = id;

    this.clientService.getClientById(id).subscribe(client => {
      this.client = client;

      this.productService.getAllProducts().subscribe(products => {
        this.products = products;

        const taxes = (this.budget.taxes < 10) ? 10 : this.budget.taxes;
  
        if (this.client) {
          this.products = this.products.map(product => {
            if (this.client.size === 'Grande Porte') {
              product.value = product.large_size_base;
            } else if (this.client.size === 'Médio Porte') {
              product.value = product.middle_size_base;
            } else {
              product.value = product.little_size_base;
            }

            product.tax_amount = product.value * (taxes / 100) * 10;
            product.commission = null;

            return product;
          })
        }

      })
    })
  }

  addSelectedProduct(product: IProduct, event): void {
    if (event) {
      this.budgetProducts.push({
        product_id: product.id,
        tax_free_amount: product.value,
        tax_amount: null,
        value_for_partners: null
      });
    }
    else {
      this.budgetProducts = this.budgetProducts.filter((item) => item.product_id !== product.id);
    }
  }

  updateProductsTaxes(taxe: number) {
    const taxes = (taxe < 10) ? 10 : taxe;
    this.products = this.products.map((product) => {
      product.tax_amount = product.value * (taxes / 100) * 10;
      return product;
    })
  }

  updateProductsCommissions(commission: number) {
    if (this.budget.sale_type !== 'Parceiro' ) {
      return;
    }

    const commissions = (commission < 10) ? 10 : commission;
    this.products = this.products.map((product) => {
      product.commission = product.value * (commissions / 100) * 10;
      return product;
    })
  }

  updateBudgetSaleType(value: string) {
    if (value === 'Parceiro') {
      const commissions = (this.budget.commission < 10) ? 10 : this.budget.commission;
      this.products = this.products.map((product) => {
        product.commission = product.value * (commissions / 100) * 10;
        return product;
      })
    } else {
      this.products = this.products.map((product) => {
        product.commission = null;
        return product;
      })
    }
  }

  handleNavigateToBudgetConfirm() {
    if (this.budgetProducts.length === 0) {
      alert('Selecione ao menos um produto');
      return;
    }

    this.budgetProducts = this.budgetProducts.map(product => {
      product.tax_amount = product.tax_free_amount * (this.budget.taxes / 100) * 10;
      product.value_for_partners = product.tax_free_amount * (this.budget.commission / 100);

      return product;
    })

    let amount = [];

    if (this.budget.sale_type === 'Parceiro') {
      amount = this.budgetProducts.map(product => product.value_for_partners);
    } else {
      amount = this.budgetProducts.map(product => product.tax_amount);
    }

    this.budget.amount = amount.reduce((taxSum, product) => (taxSum + product));
    this.budget.amount *= this.budget.users_quantity;

    const budgetData = {
      ...this.budget,
      budget_products: this.budgetProducts
    };

    localStorage.setItem('budget', JSON.stringify(budgetData));
  }
}
