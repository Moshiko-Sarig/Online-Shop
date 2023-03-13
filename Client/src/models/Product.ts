class ProductModel {
  constructor(
    public product_id: number,
    public product_name: string,
    public category_id: number,
    public product_price: number,
    public product_picture: FileList
  ) { }

  static convertToFormData(product: ProductModel) {
    const fd = new FormData();
    fd.append("product_name", product.product_name);
    fd.append("category_id", product.category_id.toString());
    fd.append("product_price", product.product_price.toString());
    if (product.product_picture) {
      fd.append("product_picture", product.product_picture.item(0));
    }
    return fd;
  }


}


export default ProductModel;
