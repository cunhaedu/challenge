import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { UpdateClientComponent } from './components/client/update-client/update-client.component';
import { CreateBudgetComponent } from './components/budget/create-budget/create-budget.component';
import { CreateBudgetConfirmComponent } from './components/budget/create-budget-confirm/create-budget-confirm.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/create',
    component: CreateProductComponent
  },
  {
    path: 'products/update/:id',
    component: UpdateProductComponent
  },
  {
    path: 'clients/create',
    component: CreateClientComponent
  },
  {
    path: 'clients/update/:id',
    component: UpdateClientComponent
  },
  {
    path: 'budgets/create/:id',
    component: CreateBudgetComponent
  },
  {
    path: 'budgets/confirm',
    component: CreateBudgetConfirmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
