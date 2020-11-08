import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/components/product/Product.model';
import { ProductService } from 'src/app/components/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: IProduct[];

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      console.log(products);
    })
  }

  handleNavigateToCreateProduct(): void {
    this.router.navigate(['/products/create']);
  }

  handleDeleteProduct(product: IProduct): void {
    const confirm = window.confirm(`Tem certeza de que deseja excluir o produto\n${product.name}?`);

    if (!confirm) {
      return;
    }

    this.productService.deleteProduct(product.id).subscribe(() => {
        alert('Produto excluído com sucesso!');
        this.ngOnInit();
      },
      error => {
        alert('Erro ao excluir produto! Tente novamente mais tarde!');
      }
    )
  }
}
