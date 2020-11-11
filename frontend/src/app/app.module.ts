import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { FormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { UpdateClientComponent } from './components/client/update-client/update-client.component';
import { CreateBudgetComponent } from './components/budget/create-budget/create-budget.component';
import { CreateBudgetConfirmComponent } from './components/budget/create-budget-confirm/create-budget-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    HomeComponent,
    ProductsComponent,
    CreateProductComponent,
    UpdateProductComponent,
    CreateClientComponent,
    UpdateClientComponent,
    CreateBudgetComponent,
    CreateBudgetConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
