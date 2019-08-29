import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-produts',
  templateUrl: './produts.component.html',
  styleUrls: ['./produts.component.css']
})
export class ProdutsComponent implements OnInit {

  products: Product[];

  constructor(private service: ProductService) { }

  ngOnInit() {
    this.service.getProducts().subscribe(
      next => this.products = next
    )
  }

  deleteProduct(id: number) {
    if (confirm('Delete this product?')) {
      this.service.deleteProduct(id).subscribe(
        () => this.products = this.products.filter( f => f.productId != id)
      )
    }
  }

}
