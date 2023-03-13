import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { TokenService } from 'src/app/services/token.service';
import { DecodedToken, UserService } from 'src/app/services/user.service';
import ProductModel from 'src/models/Product';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent {

  constructor(private userService: UserService, private tokenService: TokenService, private cartService: CartService, private router: Router, private productsService: ProductsService) { }
  showReadOnlyMessage = false;
  userInfo: DecodedToken;
  errors: any;
  products: ProductModel[];
  filteredProducts: ProductModel[];
  imageBaseUrl = 'http://localhost:4000/api/images/';
  selectedProduct: ProductModel;
  searchOrder = "";
  imageVisited: boolean = false;
  editProdcut: ProductModel;
  filteredProductsChange = new Subject<ProductModel[]>();
  @ViewChild('f') form: any;
  @ViewChild('imageControl') imageControl: ElementRef;
  @Input() set categoryId(id: number) {
    this.category_id = id;
    this.filterProducts();
  }
  category_id: number;

  ngOnInit() {
    this.userService.decodeToken();
    this.userInfo = this.userService.getUserInfo();
    this.productsService.getallProducts()
      .then(data => {
        if (data) {
          this.products = data;
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.productsService.categoryChanged.subscribe(id => {
      if (id == null) {
        this.productsService.getallProducts()
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
        this.productsService.getProductByCategory(id)
          .then(data => {
            this.products = data;
          })
          .catch(error => {
            console.log(error);
          });
    })

    this.productsService.prodcutBySearch$
      .subscribe(serach => {
        this.productsService.getProductByName(serach).
          then(data => {
            if (data) {
              this.products = data;
            }
          });

      });
    this.filteredProductsChange.subscribe((filteredProducts: ProductModel[]) => {
      this.filteredProducts = filteredProducts;
    });
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

  ngOnChanges() {
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.category_id ? this.products.filter(product => product.category_id === this.category_id) : this.products;
    this.filteredProductsChange.next(this.filteredProducts);
    this.products = this.category_id ? this.products.filter(product => product.category_id === this.category_id) : this.products;
  }

  saveImage(args: Event): void {
    this.selectedProduct.product_picture = (args.target as HTMLInputElement).files;
  }

  imageBlur(): void {
    this.imageVisited = true;
  }

  onSubmit() {

    const formData = ProductModel.convertToFormData(this.selectedProduct);


    this.productsService.updateProduct(formData, this.selectedProduct.product_id)
      .then((result) => {
        this.errors = undefined;
        location.reload

      })
      .catch((error) => {
        console.log(error);
        this.errors = error;

      })


  }
}

