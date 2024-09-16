import { getOrder } from "../data/orders.js";
import dayjs from "https://cdn.skypack.dev/dayjs";
import { searchProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";

let searchItem = "";

async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  const productQuantity = url.searchParams.get("productQuantity");

  const order = getOrder(orderId);
  const product = searchProduct(productId);
  let productDetails = "";
  let trackingHTML = "";

  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress =
    ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  trackingHTML += `
                      <div class="amazon-header">
                    <div class="amazon-header-left-section">
                      <a href="amazon.html" class="header-link">
                        <img class="amazon-logo"
                          src="images/amazon-logo-white.png">
                        <img class="amazon-mobile-logo"
                          src="images/amazon-mobile-logo-white.png">
                      </a>
                    </div>

                    <div class="amazon-header-middle-section">
                      <input class="search-bar js-search-bar" type="text" placeholder="Search">

                      <div>
                        <a href="amazon.html?searchItem=${searchItem}">
                        <button class="search-button js-search-button">
                          <img class="search-icon" src="images/icons/search-icon.png">
                        </button>
                        </a>
                      </div>
                    </div>

                    <div class="amazon-header-right-section">
                      <a class="orders-link header-link" href="orders.html">
                        <span class="returns-text">Returns</span>
                        <span class="orders-text">& Orders</span>
                      </a>

                      <a class="cart-link header-link" href="checkout.html">
                        <img class="cart-icon" src="images/icons/cart-icon.png">
                        <div class="cart-quantity js-cart-quantity">3</div>
                        <div class="cart-text">Cart</div>
                      </a>
                    </div>
                  </div>

                  <div class="main">
                    <a class="back-to-orders-link link-primary" href="orders.html">
                      View all orders
                    </a>
                    <div class="order-tracking js-order-tracking">
                    <div class="delivery-date">
                    ${deliveryTime.format("ddd MMMM mm ")}
                    </div>

                    <div class="product-info">
                    ${product.name}
                    </div>

                    <div class="product-info">
                    Quantity: ${productQuantity}
                    </div>

                    <img class="product-image" src=${product.image}>

                    <div class="progress-labels-container">
                    <div class="progress-label ${
                      percentProgress < 50 ? "current-status" : ""
                    }">
                        Preparing
                    </div>
                    <div class="progress-label ${
                      percentProgress >= 50 && percentProgress < 100
                        ? "current-status"
                        : ""
                    }">
                        Shipped
                    </div>
                    <div class="progress-label ${
                      percentProgress >= 100 ? "current-status" : ""
                    }">
                        Delivered
                    </div>
                    </div>

                    <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${percentProgress}%;"></div>
                    </div>
                    </div>
                    </div>
                    `;

  document.querySelector(".js-body").innerHTML = trackingHTML;
  document.querySelector(".js-cart-quantity").innerHTML =
  cart.calculateCartQuantity();

  document.querySelector(".js-search-button").addEventListener("click", () => {
    searchItem = document.querySelector(".js-search-bar").value;
    console.log("Search initiated for: ", searchItem);
    loadPage();  // Re-call loadPage to reflect search changes if needed
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadPage();
});


