import {renderCheckoutSummary} from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//import '../data/cart-class.js';
//import '../data/car.js';
//import '../data/back-end-practice.js'

loadProducts(() => {
renderCheckoutSummary();
renderPaymentSummary();
});

