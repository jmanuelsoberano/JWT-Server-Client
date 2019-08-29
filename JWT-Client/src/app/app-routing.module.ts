import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProdutsComponent } from './produts/produts.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent },
  { path: 'product/:id', component: ProductComponent, canActivate: [AuthGuard], data: { claimType: 'CanAccessProducts'} },
  { path: 'products', component: ProdutsComponent, canActivate: [AuthGuard], data: { claimType: 'CanAccessProducts'} },
  { path: 'categories', component: CategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
