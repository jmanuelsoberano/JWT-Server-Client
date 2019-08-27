import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

const APi_URL = 'https://localhost:44346/api/Product/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(APi_URL);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${APi_URL}${id}`);
  }

  addProduct(entity: Product): Observable<any> {
    return this.http.post(APi_URL, entity, httpOptions);
  }

  updateProduct(entity: Product): Observable<any> {
    return this.http.put(APi_URL, entity, httpOptions);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${APi_URL}${id}`, httpOptions);
  }

}
