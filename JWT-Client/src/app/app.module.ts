import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './product/products.component';
import { ProductComponent } from './product/product.component';
import { CategoriesComponent } from './categories/categories.component';
import { MaterialModule } from './material.module';
import { ProductService } from './product/product.service';
import { CategoryService } from './categories/category.service';
import { SecurityService } from './login/security.service';
import { AuthGuard } from './login/auth.guard';
import { HttpInterceptorModule } from './login/http-interceptor.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    ProductComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,    
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpInterceptorModule
  ],
  providers: [ProductService, CategoryService, SecurityService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
