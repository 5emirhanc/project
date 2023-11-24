import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { HomePageComponent } from './page/home-page/home-page.component';
import { ProductPageComponent } from './page/product-page/product-page.component';
import { AdminPageComponent } from './page/admin-page/admin-page.component';
import { UserAddComponent } from './admin/content/user-add/user-add.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { ProductsComponent } from './admin/content/products-list/products.component';
import { ProductAddComponent } from './admin/content/product-add/product-add.component';
import { UserListComponent } from './admin/content/user-list/user-list.component';
import { ProductCategoriesComponent } from './admin/content/product-categories/product-categories.component';
const routes: Routes = [
  { path:'' , component:HomePageComponent},
  { path : "", redirectTo: "/" , pathMatch:"full" },

  { path: 'login', component: LoginPageComponent },
  { path:'products', component : ProductPageComponent},
  { path: "products/:categoryId", component: ProductPageComponent },


  { path: 'admin', component: AdminPageComponent, canActivate: [LoginGuardGuard] },
  { path: 'productsPage', component: ProductsComponent, canActivate: [LoginGuardGuard] },
  { path: 'productsAdd', component:ProductAddComponent , canActivate: [LoginGuardGuard]},
  { path: 'userAdd', component: UserAddComponent, canActivate: [LoginGuardGuard] },
  { path: 'userList', component: UserListComponent, canActivate: [LoginGuardGuard] },
  { path: 'category', component:ProductCategoriesComponent , canActivate :[LoginGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
