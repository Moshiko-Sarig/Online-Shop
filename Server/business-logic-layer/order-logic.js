const dal = require('../data-access-layer/dal');


async function createNewOrder(order) {
  const dateForDelivery = order.date_for_delivery.split('.');
  const orderDate = order.order_date.split('.');
  const formattedDateForDelivery = `${dateForDelivery[2]}-${dateForDelivery[1]}-${dateForDelivery[0]}`;
  const formattedOrderDate = `${orderDate[2]}-${orderDate[1]}-${orderDate[0]}`;

  try {
    return await dal.executeQueryAsync(`
        INSERT INTO \`order\` (order_id, user_id, cart_id, total_price, delivery_city, delivery_street, date_for_delivery, order_date, credit_card) 
        VALUES (NULL, ${order.user_id}, ${order.cart_id}, ${order.total_price}, '${order.delivery_city}', '${order.delivery_street}', '${formattedDateForDelivery}', '${formattedOrderDate}', ${order.credit_card})
      `);
  } catch (error) {
    console.log(error);
  }
}


async function getOrdersByDate(date) {
  const dateForDelivery = date.split('.');
  const formattedDateForDelivery = `${dateForDelivery[2]}-${dateForDelivery[1]}-${dateForDelivery[0]}`;

  return await dal.executeQueryAsync(`SELECT order_id FROM \`order\` WHERE date_for_delivery = "${formattedDateForDelivery}"`);
}

async function getAllOrders() {
  try {
    return await dal.executeQueryAsync("SELECT * FROM `order` WHERE 1");
  }
  catch (erorr) {
    console.log(erorr);
  }
}

async function getOrderByUserId(user_id) {
  try {
    return await dal.executeQueryAsync(`SELECT * FROM \`order\` WHERE user_id = ${user_id} ORDER BY order_date DESC LIMIT 1`);;
  }

  catch (error) {
    console.log(error);
  }
}


module.exports = {
  createNewOrder,
  getAllOrders,
  getOrderByUserId,
  getOrdersByDate
}