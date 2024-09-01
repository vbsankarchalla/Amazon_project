class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          productQty: 2,
          deliveryOptionId: "3",
        },
        {
          productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          productQty: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    const quantityClass = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const ProductQuantity = Number(quantityClass.value);

    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
        matchingItem.productQty += ProductQuantity;
      }
    });
    if (!matchingItem) {
      this.cartItems.push({
        productId: productId,
        productQty: ProductQuantity,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    let newCart = [];
    if (productId) {
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId != productId) {
          newCart.push(cartItem);
        }
      });
    }
    this.cartItems = newCart;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += Number(cartItem.productQty);
    });
    return cartQuantity;
  }

  updateCartItemQuantity(newQty, productId) {
    this.cartItems.forEach((item) => {
      if (item.productId === productId) {
        item.productQty = newQty;
      }
    });
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.deliveryOptionId = deliveryOptionId;
      }
    });
    this.saveToStorage();
  }
  loadCart() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      console.log(xhr.response);
    });
    xhr.open("GET", "https://supersimplebackend.dev/cart");
    xhr.send();
  }
}

export const cart = new Cart("cart");
export const businessCart = new Cart("businesscart");
