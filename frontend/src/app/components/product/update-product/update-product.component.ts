import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../Product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: IProduct = {
    name: '',
    little_size_base: null,
    middle_size_base: null,
    large_size_base: null
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
    })
  }

  handleUpdateProduct(): void {
    this.productService.updateProduct(this.product).subscribe(() => {
        alert('Produto atualizado com sucesso!');
        this.router.navigate(['/products']);
      },
      error => {
        alert('Erro ao atualizar o produto! Verifique todos os campos e tente novamente!');
      }
    )
  }
}
