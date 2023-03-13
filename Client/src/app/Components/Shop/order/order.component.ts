import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { DecodedToken, UserService } from 'src/app/services/user.service';
import OrderModel from 'src/models/Order';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  userInfo: DecodedToken;
  city: string;
  street: string;
  credit_card: number;
  shoppingDate: Date = new Date();
  newOrder: OrderModel = new OrderModel(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  errors: any;
  _cart_id: any;
  searchOrder = "";


  constructor(private userService: UserService, private tokenService: TokenService, private orderService: OrderService, private cartService: CartService, private router: Router) { }
  ngOnInit() {
    this.userService.decodeToken();
    this.userInfo = this.userService.getUserInfo();
    this.city = this.userInfo.user.user_city;
    this.street = this.userInfo.user.user_street;
    this.cartService.getUserCart().then(cart => {
      this._cart_id = cart[0].cart_id;
    });
  }

  orderSearchInputChanged() {
    console.log(this.searchOrder);
    this.cartService.updateOrderSearch(this.searchOrder);
  }

  get isLoggedIn() {
    return this.userService.isLoggedIn;
  }

  logout() {
    this.tokenService.removeToken();
    this.userService.decodeToken();
    this.userInfo = this.userService.getUserInfo();
    location.reload();
  }

  fillCity() {
    this.city = this.userInfo.user.user_city;
  }

  fillStreet() {
    this.street = this.userInfo.user.user_street;
  }

  validateDate() {
    const currentDate = new Date();
    if (new Date(this.shoppingDate) < currentDate) {
      alert("The date you have selected is in the past. Please select a valid date.");
      this.shoppingDate = currentDate;
    }
  }

  download(filename: string, text: string) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }


  async createOrder() {
    this.newOrder.user_id = this.userInfo.user.user_id;
    this.newOrder.cart_id = this._cart_id;
    this.newOrder.total_price = JSON.parse(localStorage['general_price']);
    this.newOrder.delivery_city = this.city;
    this.newOrder.delivery_street = this.street;
    this.newOrder.date_for_delivery = new Date(this.shoppingDate).toLocaleDateString();
    this.newOrder.order_date = new Date().toLocaleDateString();
    this.newOrder.credit_card = this.credit_card;

    try {
      await this.orderService.postNewOrder(this.newOrder);
      await this.orderService.deleteCart(this.newOrder.cart_id).toPromise();
      await this.orderService.deleteCartItems(this.newOrder.cart_id).toPromise();
      localStorage.removeItem('cart_id');
      const orderData = JSON.stringify(this.newOrder);
      let result = confirm("Order created successfully! \n Do you want to get a receipt?");
      if (result) {
        this.download(
          "Uncle Moshe's receipt", `
          The receipt is: \n
          the date for delivery: ${this.newOrder.date_for_delivery}\n
          Delivery City: ${this.newOrder.delivery_city}.\n
          Delivery Street: ${this.newOrder.delivery_street}.\n
          The Date of the order: ${this.newOrder.order_date}.\n
          Total Price of the order: ${this.newOrder.total_price}$.\n
          Thank you for buying in Uncle Moses see you in the next time`);
      }
      this.router.navigate(['/']);

    } catch (err: any) {
      console.log(err);
      alert(err.error.message);
    }
  }

}
