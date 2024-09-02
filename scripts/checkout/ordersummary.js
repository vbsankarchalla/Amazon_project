import {cart} from "../../data/cart-class.js";
import { searchProduct } from "../../data/products.js";
import { deliveryOptions, calculateDeliveryDates } from "../deliveryOptions.js";
import { renderPaymentSummary } from "./paymentsummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export let cartQty;
export function renderCheckoutSummary() {
  let checkoutHTML = "";
  cartQty = cart.calculateCartQuantity();
  document.querySelector(".js-return-to-home-link").innerHTML =
    renderCheckoutHeader();
  cart.cartItems.forEach((cartItem) => {
    let matchingItem,
      productId,
      productImg,
      productName,
      productPrice,
      quantity;
    matchingItem = searchProduct(cartItem.productId);
    if (matchingItem) {
      productId = matchingItem.id;
      productImg = matchingItem.image;
      productName = matchingItem.name;
      productPrice = matchingItem.priceCents;
      quantity = cartItem.quantity;
    }

    let deliveryOption, deliveryDate, deliveryDateString;
    deliveryOptions.forEach((option) => {
      if (cartItem.deliveryOptionId === option.id) {
        deliveryOption = option;
        deliveryDate = calculateDeliveryDates(deliveryOption);
        deliveryDateString = deliveryDate.format("dddd, MMM DD");
      }
    });
    checkoutHTML += `
    <div class="cart-item-container js-cart-item-container-${productId}">
              <div class="delivery-date">
                ${deliveryDateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${productImg}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${productName}
                  </div>
                  <div class="product-price">
                    $${matchingItem.getPrice()}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${productId}">${quantity}</span>
                    </span>
                    <span class="update-quantity-link js-update-quantity-link-${productId} link-primary"
                    data-product-id = "${productId}">
                      Update    
                    </span>
                    <input class="quantity-link js-quantity-link-${productId}"
                    data-product-id = "${productId}">
                    <span class="save-quantity-link link-primary js-save-quantity-link-${productId}"
                    data-product-id = "${productId}">
                    Save
                    </span>
                    <span class="delete-quantity-link link-primary 
                      js-delete-quantity-link"
                      data-product-id = "${productId}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(productId, cartItem)}
                </div>
              </div>
            </div>
  `;
  });

  document.querySelector(".js-order-summary").innerHTML = checkoutHTML;
  document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      cart.removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      const cartQty = cart.calculateCartQuantity();
      document.querySelector(
        ".js-return-to-home-link"
      ).innerHTML = `${cartQty} items`;
       renderPaymentSummary();
    });
  });

  document.querySelectorAll(".update-quantity-link").forEach((updateItem) => {
    const productId = updateItem.dataset.productId;
    updateItem.addEventListener("click", () => {
      document
        .querySelector(`.js-quantity-link-${productId}`)
        .classList.add("is-editing-quantity");
      document
        .querySelector(`.js-save-quantity-link-${productId}`)
        .classList.add("is-editing-quantity");
      document
        .querySelector(`.js-quantity-label-${productId}`)
        .classList.add("save-quantity-link");
      document
        .querySelector(`.js-update-quantity-link-${productId}`)
        .classList.add("save-quantity-link");
    });
  });

  document.querySelectorAll(".save-quantity-link").forEach((saveelement) => {
    saveelement.addEventListener("click", () => {
      let newQty, productId;
      productId = saveelement.dataset.productId;

      updateProductQuantity(newQty, productId);
    });
  });
  document.querySelectorAll(".quantity-link").forEach((element) => {
    element.addEventListener("keydown", (event) => {
      let newQty,
        productId = element.dataset.productId;

      if (event.key === "Enter") {
        updateProductQuantity(newQty, productId);
      }
    });
  });
  renderPaymentSummary();
  cart.calculateCartQuantity();

  function deliveryOptionsHTML(productId, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const deliveryPrice = deliveryOption.priceCents;
      let deliveryPriceString =
        deliveryOption.priceCents === 0 ? "Free" : `$ ${deliveryPrice / 100} -`;
      let deliveryDate = calculateDeliveryDates(deliveryOption);
      let deliveryDateString = deliveryDate.format("dddd, MMM DD");
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
          <div class="delivery-option js-delivery-option"
          data-product-id = "${productId}";
          data-delivery-option-id = "${deliveryOption.id}";
          >
            <input type="radio"
            ${isChecked ? "checked" : ""}
              class="delivery-option-input"
              data-delivery-date = "${deliveryDate.format("dddd, MMM DD")}"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                ${deliveryDateString}
              </div>
              <div class="delivery-option-price">
                ${deliveryPriceString} Shipping
              </div>
            </div>
          </div>            
        `;
    });
    return html;
  }

  document.querySelectorAll(".js-delivery-option").forEach((item) => {
    item.addEventListener("click", () => {
      let { productId } = item.dataset;
      let { deliveryOptionId } = item.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderCheckoutSummary();
      renderPaymentSummary();
    });
  });

  function updateProductQuantity(newQty, productId) {
    newQty = Number(
      document.querySelector(`.js-quantity-link-${productId}`).value
    );
    if (newQty <= 0) {
      window.alert(
        `Quantity can not be :  ${newQty}\n Please enter value > 0 `
      );
    } else {
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
        newQty;
      cart.updateCartItemQuantity(newQty, productId);
      const cartQty = cart.calculateCartQuantity();
      document.querySelector(
        ".js-return-to-home-link"
      ).innerHTML = `${cartQty} items`;
      renderPaymentSummary();
    }
    document
      .querySelector(`.js-quantity-link-${productId}`)
      .classList.remove("is-editing-quantity");
    document
      .querySelector(`.js-quantity-label-${productId}`)
      .classList.remove("save-quantity-link");
    document
      .querySelector(`.js-update-quantity-link-${productId}`)
      .classList.remove("save-quantity-link");
    document
      .querySelector(`.js-save-quantity-link-${productId}`)
      .classList.remove("is-editing-quantity");
  }
}
