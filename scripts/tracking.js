import { orders } from "../data/orders.js";
import dayjs from "https://cdn.skypack.dev/dayjs";
import { searchProduct, loadProductsFetch } from "../data/products.js";

async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  const productQuantity = url.searchParams.get("productQuantity");

  let trackingHTML = "";
  let deliveryDate = "";
  let productInfo = "";
  let productName = "";
  let productImage = "";
  orders.forEach((order) => {
    console.log(order);

    if (orderId === order.id) {
      let products = order.products;
      products.forEach((product) => {
        if (productId === product.productId) {
          deliveryDate = dayjs(product.estimatedDeliveryTime).format(
            "dddd, MMM DD"
          );
          productInfo = searchProduct(productId);
          productName = productInfo.name;
          productImage = productInfo.image;
          console.log(productQuantity);
          trackingHTML += `
                    <div class="delivery-date">
                    ${deliveryDate}
                    </div>

                    <div class="product-info">
                    ${productName}
                    </div>

                    <div class="product-info">
                    Quantity: ${productQuantity}
                    </div>

                    <img class="product-image" src=${productImage}>

                    <div class="progress-labels-container">
                    <div class="progress-label">
                        Preparing
                    </div>
                    <div class="progress-label current-status">
                        Shipped
                    </div>
                    <div class="progress-label">
                        Delivered
                    </div>
                    </div>

                    <div class="progress-bar-container">
                    <div class="progress-bar"></div>
                    </div>`;
        }
      });
    }
  });

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}
loadPage();

// ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100
