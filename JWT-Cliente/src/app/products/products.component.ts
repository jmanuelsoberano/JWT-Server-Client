import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private service: ProductService) { }

  ngOnInit() {
    this.service.getProducts().subscribe(
      next => this.products = next
    );
  }

  deleteProduct(id: number) {
    if (confirm('Delete this product?')) {
      this.service.deleteProduct(id)
        .subscribe(() =>  this.products = this.products.filter(p => p.productId != id));
    }
  }

}
