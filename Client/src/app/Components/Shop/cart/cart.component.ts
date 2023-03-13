import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import CartItemModel from 'src/models/Cart-Item';
import ProductModel from 'src/models/Product';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  allCartItems: CartItemModel[];
  product_id: any;
  product: ProductModel[] = [];
  imageBaseUrl = 'http://localhost:4000/api/images/';
  public router: Router;
  cart_id: any;

  constructor(private _router: Router, private cartService: CartService, private productService: ProductsService, private orderService: OrderService) { this.router = _router }

  orderSearchWord = '';

  ngOnInit() {
    this.cartService.orderSearch$.subscribe(word => { this.orderSearchWord = word})
    this.cartService.updateOrderSearch("");
    this.cartService.getAllCartItem()
      .then(data => {
        if (data) {
          this.allCartItems = data;
          for (let i of this.allCartItems) {
            this.productService.getProductByProductId(i.product_id)
              .then(res => {
                if (res) {
                  this.product.push(res[0]);
                }
              })
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.orderService.updateTotalPrice(this.getTotalPrice());
  }


  deleteCartItem(cartItemId: number) {
    this.cartService.deleteCartItem(cartItemId)
      .then(data => {
        console.log(cartItemId);
        this.ngOnInit();
      })
      .catch(error => {
        console.log(error);
      });
  }
  getAmount(price: number, productPrice: number): number {
    return Math.ceil(price / productPrice);
  }

  public getTotalPrice(): number {
    let totalPrice = this.allCartItems?.reduce((sum, item) => {
      return sum + item.general_price;
    }, 0);
    localStorage.setItem('general_price', JSON.stringify(totalPrice));
    return totalPrice;
  }

  async deleteAllCartItems(cart_id: any) {
    let cartId = localStorage.getItem("cart_id");

    this.orderService.deleteCartItems(cartId).subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }


}
