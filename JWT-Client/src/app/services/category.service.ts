import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

const API_URL = 'https://localhost:44346/api/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(API_URL);
  }

}
