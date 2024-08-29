import { formatCurrency } from "../../scripts/utils/money.js";


console.log('test suite : formatCurrency');
if (formatCurrency(2095) === "20.95") {
  console.log("Case(2095) : Passed");
} else {
  console.log("Case(2095) : Failed");
}
if (formatCurrency(0) === "0.00") {
  console.log("Case(0) : Passed");
} else {
  console.log("Case(0) : Failed");
}
if (formatCurrency(2000.5) === "20.01") {
  console.log("Case(2000.5) : Passed");
} else {
  console.log("Case(2000.5) : Failed");
}
if (formatCurrency(2000.4) === "20.00") {
  console.log("Case(2000.4) : Passed");
} else {
  console.log("Case(2000.4) : Failed");
}

 