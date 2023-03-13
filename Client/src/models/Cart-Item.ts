class CartItemModel {
    constructor(
        public cart_item_id: number,
        public product_id: number,
        public cart_item_price: number,
        public general_price: number,
        public cart_id: number,
    ) { }
}

export default CartItemModel;