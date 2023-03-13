import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import ProductModel from 'src/models/Product';
import ProductCategoryModel from 'src/models/ProductCategory';
import { Category_URL, ENDPOINTS } from 'src/Utils/api.endpoints';
import { Subject } from 'rxjs';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private categoryId = new Subject<number>();
  categoryId$ = this.categoryId.asObservable();
  private prodcutBySearch = new Subject<string>();
  prodcutBySearch$ = this.prodcutBySearch.asObservable();
  categoryChanged = new EventEmitter<number>();


  constructor(private http: HttpClient, private tokenService: TokenService) { }


  refrshProducts(serach: string) {
    this.prodcutBySearch.next(serach);
    console.log(this.prodcutBySearch.next.length)


  }

  changedCategory(category_id: number) {


    this.categoryChanged.emit(category_id);
  }

  setCategoryId(id: number) {
    this.categoryId.next(id);
  }

  getAllCategories(): Promise<ProductCategoryModel[] | undefined> {
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });
    return this.http.get<ProductCategoryModel[]>(Category_URL, { headers }).toPromise();
  }

  getallProducts(): Promise<ProductModel[] | undefined> {
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });
    return this.http.get<ProductModel[]>(ENDPOINTS.PRODUCTS, { headers }).toPromise();
  }

  getProductByCategoryId(category_id: number): Promise<ProductModel[] | undefined> {
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });

    const endpoint = ENDPOINTS.PRODUCTBYCATEGORYID_URL.replace(':id', category_id.toString());
    return this.http.get<ProductModel[]>(endpoint, { headers }).toPromise();
  }

  getProductByName(product_name: string): Promise<ProductModel[]> {
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });

    const endpoint = ENDPOINTS.PORODUCTBYNAME.replace(':name', product_name);
    return this.http.get<ProductModel[]>(endpoint, { headers }).toPromise();
  }


  getProductCount(): Promise<number | undefined> {
    return this.http.get<ProductModel[]>(ENDPOINTS.PRODUCTS).toPromise().then(products => products.length);
  }

  getProductByProductId(product_id: any): Promise<ProductModel[] | undefined> {
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });
    const endpoint = ENDPOINTS.PRODUCTBYPRODUCTID_URL.replace(':id', product_id);
    return this.http.get<ProductModel[]>(endpoint, { headers }).toPromise();
  }

  getProductByCategory(category_id: number): Promise<ProductModel[] | undefined> {
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });
    const endpoint = ENDPOINTS.PRODUCTBYCATEGORYID_URL.replace(':id', category_id.toString());
    return this.http.get<ProductModel[]>(endpoint, { headers }).toPromise();
  }

  async updateProduct(data: FormData, productId: number) {

    const endpoint = ENDPOINTS.EDITPRODUCT_URL.replace(":id", productId.toString());
    const headers = new HttpHeaders({ "Authorization": this.tokenService.getToken() });
    return this.http.patch<ProductModel>(endpoint, data, { headers }).toPromise();
  }
  addNewProduct(newProduct: FormData): Promise<any> {
    const headers = new HttpHeaders({ 'Authorization': this.tokenService.getToken() });
    return this.http.post(ENDPOINTS.ADDPRODUCT_URL, newProduct, { headers }).toPromise();
  }

}


