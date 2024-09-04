import { formatCurrency } from "./utils/money.js";
import dayjs from "https://cdn.skypack.dev/dayjs";
import { searchProduct } from "../data/products.js";

export let orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrders(order) {
  orders.unshift(order);
  saveToStorage(orders);
  renderOrdersHTML(order);
}

function saveToStorage(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}


function renderOrdersHTML(order) {
  let ordersHTML = "";
  try {
    orders.forEach((order) => {
      const orderId = order.id;
      const orderDateString = dayjs(order.orderTime);
      const orderDate = orderDateString.format("MMMM DD");
      const orderAmount = formatCurrency(order.totalCostCents);
      const orderedProducts = order.products;
      ordersHTML += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderDate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${orderAmount}</div>
          </div>
        </div>
        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${orderId}</div>
        </div>
      </div>
      <div class="order-details-grid js-order-details-grid"></div>
  </div>
`;
    });
    const ordersGrid = document.querySelector(".js-orders-grid").innerHTML;
    if(ordersGrid){
    document.querySelector(".js-orders-grid").innerHTML = ordersHTML;
    renderProductsHTML(orderedProducts, orderId);
    } else {
        console.error(`Order container for orderId:  not found.`);
    }
  } catch (error) {
    console.log("Unable to generate the HTML for ordersContainer.   " + error);
  }
}

function renderProductsHTML(orderedProducts, orderId) {
  let productsHTML = ``;

  try {
    orderedProducts.forEach((element) => {
      const matchingProduct = searchProduct(element.productId);
      const productImage = matchingProduct.image;
      const productName = matchingProduct.name;
      const deliveryDate = dayjs(matchingProduct.estimatedDeliveryTime).format(
        "MMMM DD"
      );
      const productQuantity = element.quantity;

      productsHTML += `
          <div class="product-image-container">
            <img src="${productImage}">
          </div>
          <div class="product-details">
            <div class="product-name">
              ${productName}
            </div>
            <div class="product-delivery-date">
              ${deliveryDate}
            </div>
            <div class="product-quantity">
              Quantity: ${productQuantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>
          <div class="product-actions">
            <a href="tracking.html?orderId=${orderId}&productId=${element.productId}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
      `;
    });
    document.querySelector(".js-order-details-grid").innerHTML = productsHTML;
  } catch (error) {
    console.log("Unable to generate HTML for Products.   " + error);
  }
}
