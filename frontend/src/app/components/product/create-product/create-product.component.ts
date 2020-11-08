import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../Product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: IProduct = {
    name: '',
    little_size_base: null,
    middle_size_base: null,
    large_size_base: null
  }

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleCreateProduct(): void {
    this.productService.createProduct(this.product).subscribe(() => {
        alert('Produto cadastrado com sucesso!');
        this.router.navigate(['/products']);
      },
      error => {
        alert('Erro ao cadastrar o produto! Verifique todos os campos e tente novamente!')
      }
    )
  }
}
