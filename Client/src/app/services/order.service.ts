import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from 'src/Utils/api.endpoints';
import OrderModel from 'src/models/Order';
import { UserService } from './user.service';
import UserModel from 'src/models/User';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private totalPrice = new BehaviorSubject<number>(0);
  currentTotalPrice = this.totalPrice.asObservable();
  private getOrdersUrl = ENDPOINTS.ORDERS;
  orders: number;

  constructor(private http: HttpClient, private userService: UserService, private tokenService: TokenService) { }

  updateTotalPrice(price: number) {
    this.totalPrice.next(price);
  }


  getOrdersCount(): Promise<number | undefined> {
    return this.http.get<OrderModel[]>(this.getOrdersUrl).toPromise().then(orders => orders.length);
  }

  getOrderByUserId(): Promise<OrderModel[] | undefined> {
    const { user_id } = this.userService.getUserInfo().user;
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });
    const endpoint = ENDPOINTS.ORDERBYUSERID_URL.replace(':user_id', user_id.toString());
    return this.http.get<OrderModel[]>(endpoint, { headers }).toPromise();
  }


  postNewOrder(order: OrderModel): Promise<OrderModel | undefined> {
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });

    return this.http.post<OrderModel>(ENDPOINTS.POSTNEWORDER_URL, order, { headers }).toPromise();
  }

  deleteCart(cartId: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });
    const endpoint = ENDPOINTS.DELETECART_URL.replace(':id', cartId);
    return this.http.delete(endpoint, { headers });
  }

  deleteCartItems(cartId: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });
    const endpoint = ENDPOINTS.DELETEALLCARTITEMS_URL.replace(':id', cartId);
    return this.http.delete(endpoint, { headers });
  }

}
