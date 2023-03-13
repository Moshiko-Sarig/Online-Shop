import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { LoginData } from '../../services/user.service';
import { CartService } from 'src/app/services/cart.service';
import CartModel from 'src/models/Cart';
import OrderModel from 'src/models/Order';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  orders: number;
  products: number;
  cart: CartModel[];
  order: OrderModel[];

  loginUser: LoginData = {
    user_email: '',
    user_password: ''
  };

  constructor(private userService: UserService, private tokenService: TokenService, private orderService: OrderService, private productService: ProductsService, private cartService: CartService, private router:Router) { }

  async ngOnInit(): Promise<void> {
    try {
      this.orders = await this.orderService.getOrdersCount();
      this.products = await this.productService.getProductCount();
    }
    catch (error) {
      console.log(error);
    }
    const token = this.tokenService.getToken();
    if (token) {
      console.log("Token exists ");
      this.userService.decodeToken();
      this.checkOpenCart();
      this.checkLastOrder();

    }
    else {
      const token = this.tokenService.removeToken();
    }
  }

  async loginSubmit(): Promise<void> {
    try {
      const response: any = await this.userService.login(this.loginUser);
      if (response) {
        const token = response.token;
        this.userService.decodeToken();
        this.checkOpenCart();
        this.checkLastOrder();
        if (this.userService.getUserInfo().user.user_is_admin) {
          this.router.navigate(['/admin']);
        }


      } else {
        alert("ERROR! Login failed check your email or password and try again");
      }
    } catch (error) {
      console.log(error);
      console.log("Login Failed");
    }
  }
  async checkOpenCart(): Promise<void> {
    try {
      this.cart = await this.cartService.getUserCart();
      if (this.cart && this.cart.length) {
        console.log("User has open cart");
        localStorage.setItem('cart_id', this.cart[0].cart_id.toString());
      }
      else {
        console.log("User does not have an open cart");
      }
    } catch (error) {
      console.log(error);
    }
  }


  async checkLastOrder(): Promise<void> {
    try {
      this.order = await this.orderService.getOrderByUserId()
      if (this.order && this.order.length) {
        console.log("User have a order");
      }
      else {
        console.log("User does not have an order");
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-GB");
  }
}
