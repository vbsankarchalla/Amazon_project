import { orders,getOrder } from "../data/orders.js";
import dayjs from "https://cdn.skypack.dev/dayjs";
import { searchProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";

async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  const productQuantity = url.searchParams.get("productQuantity");

  document.querySelector('.js-cart-quantity').innerHTML = cart.calculateCartQuantity();

  const order = getOrder(orderId);
  const product = searchProduct(productId);
  let productDetails = '';
  let trackingHTML ='';

    order.products.forEach((details) => {
        if (details.productId === product.id) {
            productDetails = details;
          }
    });

    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
    const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

    trackingHTML += `
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
                        percentProgress < 50 ? 'current-status' : ''
                      }">
                        Preparing
                    </div>
                    <div class="progress-label ${
                        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
                    }">
                        Shipped
                    </div>
                    <div class="progress-label ${
                        percentProgress >= 100 ? 'current-status' : ''
                    }">
                        Delivered
                    </div>
                    </div>

                    <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${percentProgress}%;"></div>
                    </div>`;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}
loadPage();
