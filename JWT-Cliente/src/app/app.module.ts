import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { CategoriesComponent } from './categories/categories.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorModule } from './services/http-interceptor.module';
import { HasClaimDirective } from './services/has-claim.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    ProductComponent,
    CategoriesComponent,
    HasClaimDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpInterceptorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
