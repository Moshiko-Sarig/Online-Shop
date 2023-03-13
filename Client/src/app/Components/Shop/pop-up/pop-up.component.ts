import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import CartModel from 'src/models/Cart';
import CartItemModel from 'src/models/Cart-Item';
import ProductModel from 'src/models/Product';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {
  imageBaseUrl = 'http://localhost:4000/api/images/';
  @Input() selectedProduct: ProductModel;
  @Output() onAddToCart = new EventEmitter<number>();
  amount: number = 1;
  newCartItem: CartItemModel = new CartItemModel(undefined, undefined, undefined, undefined, undefined);
  cart_id = localStorage.getItem('cart_id');

  constructor(private cartService: CartService, private userService: UserService) { }

ngOnInit(){
  console.log(this.cart_id);

}



  addToCart() {
    this.newCartItem.product_id = this.selectedProduct.product_id;
    this.newCartItem.cart_item_price = this.selectedProduct.product_price;
    this.newCartItem.general_price = this.selectedProduct.product_price * this.amount;
    this.newCartItem.cart_id = Number(localStorage.getItem('cart_id'));
    console.log(this.newCartItem);
    this.cartService.addCartItem(this.newCartItem);
    this.selectedProduct = undefined;
    this.amount = 1;
    this.newCartItem = new CartItemModel(undefined, undefined, undefined, undefined, undefined);
    this.onAddToCart.emit();
  }


  closePopup() {
    this.selectedProduct = undefined;

  }
}
