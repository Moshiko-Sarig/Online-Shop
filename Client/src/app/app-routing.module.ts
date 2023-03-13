import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Components/Admin/add-product/add-product.component';
import { AdminViewComponent } from './Components/Admin/admin-view/admin-view.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminGuard } from './Components/Middleware/AdminGuard';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { RegisterComponent } from './Components/register/register.component';
import { OrderComponent } from './Components/Shop/order/order.component';
import { ProductComponent } from './Components/Shop/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "order",
    component: OrderComponent
  },
  {
    path: 'admin',
    component: AdminViewComponent, canActivate: [AdminGuard]
  },
  {
    path: 'add-product',
    component: AddProductComponent, canActivate: [AdminGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
