
export let cart; 

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
 cart = [{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    productQty : 2,
    deliveryOptionId : '3'
  },{
    productId : '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    productQty : 1,
    deliveryOptionId : '2'
  }]
}
}


function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId) {
  const quantityClass = document.querySelector(`.js-quantity-selector-${productId}`);
  const ProductQuantity = Number(quantityClass.value);

  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
      matchingItem.productQty += ProductQuantity;
    }
  })
  if (!matchingItem) {
    cart.push({
      productId: productId,
      productQty: ProductQuantity,
      deliveryOptionId : '1'
    });
  }
  saveToStorage();
 }

export function removeFromCart(productId) {
  let newCart = [];
  if(productId) {
    cart.forEach((cartItem) => {
      if(cartItem.productId != productId) {
        newCart.push(cartItem);
      }
    });
  }
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += Number(cartItem.productQty);
    });
    return cartQuantity;
  }

export function updateCartItemQuantity(newQty,productId) {

  cart.forEach((item) => {
    if(item.productId === productId) {
      item.productQty = newQty;
    }
  });
  saveToStorage();
}


export function updateDeliveryOption(productId,deliveryOptionId){
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      cartItem.deliveryOptionId = deliveryOptionId;
    }
  });
  saveToStorage();
}


export function loadCart(func) {

  let xhr = new XMLHttpRequest();
  
  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    func();
  });
  
  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
  }


  // async function loadCartFetch(){

  // }