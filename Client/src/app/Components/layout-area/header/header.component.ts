import { Component, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { TokenService } from 'src/app/services/token.service';
import { DecodedToken, UserService } from 'src/app/services/user.service';
import ProductModel from 'src/models/Product';
import ProductCategoryModel from 'src/models/ProductCategory';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() filteredProductsChange = new EventEmitter<ProductModel[]>();
  category: ProductCategoryModel[];
  product_name: string;
  userInfo: DecodedToken;
  filteredProducts: ProductModel[];

  constructor(private productService: ProductsService, private userService: UserService, private tokenService: TokenService) { }

  ngOnInit() {
    this.userService.decodeToken();
    this.userInfo = this.userService.getUserInfo();
    this.productService.getAllCategories()
      .then(data => {
        if (data)
          this.category = data;
        this.category = [{ category_id: null, category_name: 'All Products' }, ...data];
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.tokenService.removeToken();
    this.userService.decodeToken();
    this.userInfo = this.userService.getUserInfo();
    location.reload();
  }

selectCategory(category_id: number) {
  this.productService.changedCategory(category_id);

  }
  get isLoggedIn() {
    return this.userService.isLoggedIn;
  }

  getProductBySearch() {
    this.productService.refrshProducts(this.product_name);
   
    
  }
}