import {cartQty} from "./ordersummary.js"

export function renderCheckoutHeader() {
  let checkoutHeaderHTML = document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${cartQty} items`;
  return checkoutHeaderHTML;
}
