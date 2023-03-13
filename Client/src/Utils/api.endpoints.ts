export const LOGIN_URL = 'http://localhost:4000/api/login';
export const PRODUCTS_URL = 'http://localhost:4000/api/products';
export const ORDERS_URL = 'http://localhost:4000/api/orders';
export const Category_URL = 'http://localhost:4000/api/categorys';
export const PRODUCTBYCATEGORYID_URL = 'http://localhost:4000/api/product/get/by/:id';
export const PORODUCTBYNAME = 'http://localhost:4000/api/product/get/:name';
export const IMAGE_URL = 'http://localhost:4000/api/images/:imageName';
export const CARTBYUSERID_URL = 'http://localhost:4000/api/cart/:userId';
export const ORDERBYUSERID_URL = 'http://localhost:4000/api/order/:user_id';
export const NEWCARTITEM_URL = 'http://localhost:4000/api/new/item';
export const CartItemBYCARTID_URL = 'http://localhost:4000/api/cart/item/:cartId';
export const PRODUCTBYPRODUCTID_URL = 'http://localhost:4000/api/get/product/by/product/:id';
export const DELETECARTITEM_URL = 'http://localhost:4000/api/delete/:id';
export const POSTNEWORDER_URL='http://localhost:4000/api/post/new/order';
export const DELETECART_URL ='http://localhost:4000/api/cart/delete/:id';
export const DELETEALLCARTITEMS_URL='http://localhost:4000/api/delete/all/items/:id';
export const CREATNEWSHOPPINGCART_URL='http://localhost:4000/api/insert/new/cart';
export const EDITPRODUCT_URL='http://localhost:4000/api/upadteProduct/:id';
export const ADDPRODUCT_URL='http://localhost:4000/api/addProduct';

export const ENDPOINTS = {
    LOGIN: LOGIN_URL,
    PRODUCTS: PRODUCTS_URL,
    ORDERS: ORDERS_URL,
    Category: Category_URL,
    PRODUCTBYCATEGORYID_URL: PRODUCTBYCATEGORYID_URL,
    PORODUCTBYNAME: PORODUCTBYNAME,
    IMAGE_URL: IMAGE_URL,
    CARTBYUSERID: CARTBYUSERID_URL,
    ORDERBYUSERID_URL: ORDERBYUSERID_URL,
    NEWCARTITEM_URL: NEWCARTITEM_URL,
    CartItemBYCARTID_URL: CartItemBYCARTID_URL,
    PRODUCTBYPRODUCTID_URL: PRODUCTBYPRODUCTID_URL,
    DELETECARTITEM_URL:DELETECARTITEM_URL,
    POSTNEWORDER_URL:POSTNEWORDER_URL,
    DELETECART_URL:DELETECART_URL,
    DELETEALLCARTITEMS_URL:DELETEALLCARTITEMS_URL,
    CREATNEWSHOPPINGCART_URL:CREATNEWSHOPPINGCART_URL,
    EDITPRODUCT_URL:EDITPRODUCT_URL,
    ADDPRODUCT_URL:ADDPRODUCT_URL,
};
