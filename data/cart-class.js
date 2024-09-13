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
          quantity: 2,
          deliveryOptionId: "3",
        },
        {
          productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, ProductQuantity = 1) {
    const quantityClass = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    if (!ProductQuantity) {
     ProductQuantity = Number(quantityClass.value);
    }

    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
        matchingItem.quantity += ProductQuantity;
      }
    });
    if (!matchingItem) {
      this.cartItems.push({
        productId: productId,
        quantity: ProductQuantity,
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
      cartQuantity += Number(cartItem.quantity);
    });
    return cartQuantity;
  }

  updateCartItemQuantity(newQty, productId) {
    this.cartItems.forEach((item) => {
      if (item.productId === productId) {
        item.quantity = newQty;
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
  async loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    const text =  await response.text();
    return text;
  }


  
}

export const cart = new Cart("cart");
export const businessCart = new Cart("businesscart");
