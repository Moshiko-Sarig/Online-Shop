import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CartModel from 'src/models/Cart';
import CartItemModel from 'src/models/Cart-Item';
import { ENDPOINTS } from 'src/Utils/api.endpoints';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient, private userService: UserService, private tokenService: TokenService) { }

  private orderSearch = new BehaviorSubject("");

  updateOrderSearch(value: string) {
    this.orderSearch.next(value);
  }

  get orderSearch$() {
    return this.orderSearch.asObservable();
  }

  getUserCart(): Promise<CartModel[] | undefined> {
    const { user_id } = this.userService.getUserInfo().user;
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });
    const endpoint = ENDPOINTS.CARTBYUSERID.replace(':userId', user_id.toString());
    return this.http.get<CartModel[]>(endpoint, { headers }).toPromise();
  }


  addCartItem(item: CartItemModel): Promise<any | undefined> {
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });

    return this.http.post<CartItemModel>(ENDPOINTS.NEWCARTITEM_URL, item, { headers }).toPromise();

  }

  getAllCartItem(): Promise<CartItemModel[] | undefined> {
    const cart_id = localStorage['cart_id'];
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });
    const endpoint = ENDPOINTS.CartItemBYCARTID_URL.replace(":cartId", cart_id);
    return this.http.get<CartItemModel[]>(endpoint, { headers }).toPromise();

  }

  deleteCartItem(cartItemId: number): Promise<any | undefined> {
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });
    const endpoint = ENDPOINTS.DELETECARTITEM_URL.replace(":id", cartItemId.toString());
    return this.http.delete<any>(endpoint, { headers }).toPromise();
  }

  postNewCart(cart: CartModel): Promise<any> {
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });

    cart.cart_creation_date = new Date().toISOString();
    return this.http.post(ENDPOINTS.CREATNEWSHOPPINGCART_URL, cart, { headers }).toPromise()

  }



}
