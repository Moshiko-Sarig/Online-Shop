import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import CartModel from 'src/models/Cart';
import CartItemModel from 'src/models/Cart-Item';
import ProductModel from 'src/models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  products: ProductModel[];
  filteredProducts: ProductModel[];
  imageBaseUrl = 'http://localhost:4000/api/images/';
  selectedProduct: ProductModel;
  showPopup = false;
  allCartItems: CartItemModel[] = [];
  cartItemProducts: ProductModel[] = []
  filteredProductsChange = new Subject<ProductModel[]>();
  @Input() set categoryId(id: number) {
    this.category_id = id;
    this.filterProducts();
  }

  category_id: number;
  constructor(private productService: ProductsService, private cartService: CartService, private userService: UserService) { }

  ngOnInit() {
    this.productService.getallProducts()
      .then(data => {
        if (data) {
          this.products = data;
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.productService.categoryChanged.subscribe(id => {
      if (id == null) {
        this.productService.getallProducts()
          .then(data => {
            if (data) {
              this.products = data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      else
        this.productService.getProductByCategory(id)
          .then(data => {
            this.products = data;
          })
          .catch(error => {
            console.log(error);
          });
    })


    this.productService.prodcutBySearch$
      .subscribe(serach => {
        this.productService.getProductByName(serach).
          then(data => {
            if (data) {
              this.products = data;
            }
          });
      });
    if (!localStorage.getItem('cart_id')) {
      const newCart = new CartModel(undefined, this.userService.getUserInfo().user.user_id, `${Date.now().toString()}`);
      this.cartService.postNewCart(newCart)
        .then(response => {
          console.log("created cart id:", response.insertId);
          if (response.insertId) {
            localStorage.setItem('cart_id', response.insertId.toString());
          }
          else {
            console.error('Error creating cart');
          }
        });
    }
    this.filteredProductsChange.subscribe((filteredProducts: ProductModel[]) => {
      this.filteredProducts = filteredProducts;
    });
  }
  ngOnChanges() {
    this.filterProducts
  }

  // getImageUrl(imageName: string) {
  //   return this.imageBaseUrl + imageName;
  // }

  filterProducts() {
    this.filteredProducts = this.category_id ? this.products.filter(product => product.category_id === this.category_id) : this.products;
    this.filteredProductsChange.next(this.filteredProducts);
    this.products = this.category_id ? this.products.filter(product => product.category_id === this.category_id) : this.products;

  }

  openModal(product: ProductModel) {
    this.selectedProduct = product;
    console.log(this.selectedProduct);
  }

  refreshProducts() {
    location.reload();
  }

}
