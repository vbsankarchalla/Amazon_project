import { renderCheckoutSummary } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";
//import '../data/cart-class.js';
//import '../data/car.js';
//import '../data/back-end-practice.js'

async function loadPage() {
  try {

    await loadProductsFetch(renderCheckoutSummary);
    // const value = await new Promise((resolve) => {
    //   cart.loadCart(() => {
    //     resolve("value3");
    //   });
    // });
    await cart.loadCart();

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
