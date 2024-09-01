import { renderCheckoutSummary } from "../scripts/checkout/ordersummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentsummary.js";
import { loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";

async function loadPage() {
  try {
    const products = await loadProductsFetch(renderCheckoutSummary);
    cart.loadCart();
  } catch (error) {
    console.log("Unexpected error . Please try again later.");
  }
  renderCheckoutSummary();
  renderPaymentSummary();
}

loadPage();

/*

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((value) => {
  console.log(value);
  renderCheckoutSummary();
  renderPaymentSummary();
}); 
*/

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve("value1");
//   });
// })
//   .then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {
//     renderCheckoutSummary();
//     renderPaymentSummary();
//   });

// loadProducts(() => {
//   loadCart(() => {
//     renderCheckoutSummary();
//     renderPaymentSummary();
//   })
// });
