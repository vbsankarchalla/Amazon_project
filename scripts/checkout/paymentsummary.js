import { cart } from "../../data/cart-class.js";
import { searchProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../deliveryOptions.js";

export function renderPaymentSummary() {
  let itemsInCart = 0,
    totalAmount = 0,
    shippingCharges = 0,
    totalBeforeTax = 0,
    estimatedTax = 0,
    orderTotal = 0;
  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;
    let product = searchProduct(productId);
    itemsInCart += cartItem.productQty;
    totalAmount += product.priceCents * cartItem.productQty;
    deliveryOptions.forEach((item) => {
      if (cartItem.deliveryOptionId === item.id) {
        shippingCharges += item.priceCents;
      }
    });
  });
  totalBeforeTax += totalAmount + shippingCharges;
  totalAmount = formatCurrency(totalAmount);
  shippingCharges = formatCurrency(shippingCharges);
  totalBeforeTax = formatCurrency(totalBeforeTax);
  estimatedTax = totalBeforeTax / 10;
  orderTotal = Number(totalBeforeTax) + Number(estimatedTax);

  let paymentHTML = "";
  paymentHTML += `
  <div class="payment-summary">
  <div class="payment-summary-title">Order Summary</div>

  <div class="payment-summary-row">
    <div>Items (${itemsInCart}):</div>
    <div class="payment-summary-money">$${totalAmount}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${shippingCharges}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${totalBeforeTax}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${estimatedTax.toFixed(2)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${orderTotal.toFixed(2)}</div>
  </div>

  <button class="place-order-button button-primary js-place-order">
    Place your order
  </button>
</div>
`;
  document.querySelector(".js-payment-summary").innerHTML = paymentHTML;

  // document
  //   .querySelector(".js-place-order")
  //   .addEventListener("click", async () => {
  //     try {
  //       const response = await fetch("https://supersimplebackend.dev/orders", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           cart: cart,
  //         }),
  //       });
  //       const order = await response.json();
  //       addOrders(order);
  //     } catch (error) {
  //       console.log("Unexpected error . Try again later.");
  //     }

  //     window.location.href = 'orders.html';
  //   });
}
