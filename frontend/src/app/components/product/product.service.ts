import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './Product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = `${environment.FRONTEND_BASE_URL}/products`

  constructor(private http: HttpClient) { }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseURL, product);
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseURL);
  }

  getProductById(id: string): Observable<IProduct> {
    const url = `${this.baseURL}/${id}` 
    return this.http.get<IProduct>(url);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const url = `${this.baseURL}/${product.id}` 
    return this.http.put<IProduct>(url, product);
  }

  deleteProduct(id: string): Observable<void> {
    const url = `${this.baseURL}/${id}` 
    return this.http.delete<void>(url);
  }
}
