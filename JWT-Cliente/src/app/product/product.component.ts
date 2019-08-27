import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../models/category';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = new Product();
  originalProduct: Product;
  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCategories();
    let id = +this.route.snapshot.paramMap.get('id');
    this.createOrLoadProduct(id);
  }

  createOrLoadProduct(id: number) {
    if (id == -1) {
      this.initProduct();
    } else {
      this.productService.getProduct(id)
        .subscribe(next => {
          this.product = next;
          this.originalProduct = Object.assign({}, this.product);
        });
    }
  }

  initProduct() {
    this.product = new Product({
      introductionDate: new Date(),
      price: 1,
      url: 'manuelsoberano.com'
    });
    this.originalProduct = Object.assign({}, this.product);
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(next => this.categories = next);
  }

  saveProduct() {
    if (this.product.productId) {
      this.productService.updateProduct(this.product)
        .subscribe(
          next => this.product = next,
          () => null,
          () => this.dataSaved())
    } else {
      this.productService.addProduct(this.product)
        .subscribe(
          next => this.product = next,
          () => null,
          () => this.dataSaved())
    }
  }

  dataSaved() {
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

  cancel() {
    this.goBack();
  }

}
