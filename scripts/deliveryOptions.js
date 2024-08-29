import dayjs from "https://cdn.skypack.dev/dayjs";


export const deliveryOptions = [{
  id : '1',
  deliveryDays : 7,
  priceCents : 0
},{
  id : '2',
  deliveryDays : 5,
  priceCents : 499
},{
  id : '3',
  deliveryDays : 2,
  priceCents : 999
}];


export function calculateDeliveryDates(deliveryOption) {
  let deliveryDate = dayjs().add(deliveryOption.deliveryDays, "day");
      deliveryDate = deliveryDate.format('dddd') === "Sunday" 
      ? dayjs().add(deliveryOption.deliveryDays +1, "day")
      : deliveryDate.format('dddd') === "Saturday" 
      ? dayjs().add(deliveryOption.deliveryDays +2, "day") 
      : dayjs().add(deliveryOption.deliveryDays, "day");
      return deliveryDate;

}

