class CartModel {
    constructor(
        public cart_id: number,
        public user_id: number,
        public cart_creation_date: string,
    ) { }
}

export default CartModel;