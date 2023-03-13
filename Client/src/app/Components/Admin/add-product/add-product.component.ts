import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import ProductModel from 'src/models/Product';
import ProductCategoryModel from 'src/models/ProductCategory';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  @ViewChild('f') form: any;
  @ViewChild('imageControl') imageControl: ElementRef;
  newProduct: ProductModel = new ProductModel(undefined, undefined, undefined, undefined, undefined);
  errors: any;
  imageVisited: boolean = false;
  category: ProductCategoryModel[]

  constructor(private productService: ProductsService) { }
  ngOnInit() {
    this.productService.getAllCategories()
      .then(data => {
        if (data)
          this.category = data;
      })
      .catch(error => {
        console.log(error);
      });

  }

  saveImage(args: Event): void {
    this.newProduct.product_picture = (args.target as HTMLInputElement).files;
  }

  imageBlur(): void {
    this.imageVisited = true;
  }

  addProduct(): void {
    const fd = ProductModel.convertToFormData(this.newProduct);
    this.productService.addNewProduct(fd)
      .then(
        (value) => {
          this.errors = undefined;
          console.log(value);
          this.newProduct = new ProductModel(undefined, undefined, undefined, undefined, undefined);
          this.imageControl.nativeElement.value = "";
          this.form.reset();

        })
      .catch((err) => {
        console.log(err);
        this.errors = err;

      })
  }
}
