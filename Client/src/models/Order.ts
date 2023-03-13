class OrderModel {
    constructor(
        public order_id: number,
        public user_id: number,
        public cart_id: number,
        public total_price: number,
        public delivery_city: string,
        public delivery_street: string,
        public date_for_delivery: string,
        public order_date: string,
        public credit_card: number
    ) { }
}

export default OrderModel;
