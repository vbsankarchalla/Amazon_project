import { cart } from "../data/cart-class.js";
import { products, loadProductsFetch } from "../data/products.js";

const url = new URL(window.location.href);
const search = url.searchParams.get('search');

loadProductsFetch(renderProductsGrid);
function renderProductsGrid() {
  let productsHTML = "";
  let filteredProducts;
  filteredProducts = products;

  if(search) {
     filteredProducts = products.filter((product) => {
      let matchingKeyword = false;
      product.keywords.forEach(keyword => {
        if(keyword.toLocaleLowerCase() === search.toLocaleLowerCase()) {
          matchingKeyword = true;
        }
      })
      return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  filteredProducts.forEach((product) => {
    productsHTML += `<div class="products-grid">
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src= ${product.getStarsUrl()} >
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-addtocart" 
        data-product-id = "${product.id}"
        data-product-price = "${product.priceCents}">
          Add to Cart
        </button>
      </div>`;

    function updateCartQuantity(button) {
      cartQuantity();

      const { productId } = button.dataset;
      const addMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );
      addMessage.classList.add("added-to-cart-visible");

      const previousTimeoutId = addedMessageTimeouts[productId];
      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }
      let timeoutId = setTimeout(() => {
        addMessage.classList.remove("added-to-cart-visible");
      }, 2000);
      addedMessageTimeouts[productId] = timeoutId;
    }
    const productsgrid = document.querySelector(".js-products-grid").innerHTML;
    document.querySelector(".js-products-grid").innerHTML = productsHTML;
    const addedMessageTimeouts = {};
    document.querySelectorAll(".js-addtocart").forEach((button) => {
      button.addEventListener("click", () => {
        let { productId } = button.dataset;
        cart.addToCart(productId);
        updateCartQuantity(button);
      });
    });

    function cartQuantity() {
      let cartQuantity = cart.calculateCartQuantity();
      cartQuantity === 0
        ? (document.querySelector(".cart-quantity").innerHTML = "")
        : (document.querySelector(".cart-quantity").innerHTML = cartQuantity);
      cartQuantity = 0;
    }
    cartQuantity();
  });
}
