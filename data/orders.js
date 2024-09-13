export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order) {
  orders.unshift(order);
  saveToStorage();
  localStorage.removeItem('cart');
}

function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders));
}
