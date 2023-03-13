import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout-area/layout/layout.component';
import { HeaderComponent } from './Components/layout-area/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './Components/register/register.component';
import { ProductComponent } from './Components/Shop/product/product.component';
import { CartComponent } from './Components/Shop/cart/cart.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { PopUpComponent } from './Components/Shop/pop-up/pop-up.component';
import { OrderComponent } from './Components/Shop/order/order.component';
import { AdminViewComponent } from './Components/Admin/admin-view/admin-view.component';
import { AddProductComponent } from './Components/Admin/add-product/add-product.component';

@NgModule({
  declarations: [
    LoginComponent,
    LayoutComponent,
    HeaderComponent,
    RegisterComponent,
    ProductComponent,
    CartComponent,
    NotFoundComponent,
    PopUpComponent,
    OrderComponent,
    AdminViewComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
