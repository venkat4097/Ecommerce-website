import { cart ,removefromcart, updatecartquantity,calculateCartQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js'
// if we export one thing the no need of brackets
const today=dayjs();
const deliverydate =today.add(7,'days');
console.log(deliverydate.format('dddd,MMMM D'));
let cartsummaryHTMl='';
cart.forEach((item)=>{
    const productId=item.productId;
    let matchingproduct;
    products.forEach((product)=>{
        if(productId===product.id){
        matchingproduct=product;
      //   else {
      //     console.log("Product not found for productId:", productId);
      //     console.log(productId);
      //     console.log(product.id);
      //     // Optionally handle this case (e.g., display an error message)
      // }
   

   cartsummaryHTMl += ` <div class="cart-item-container js-cart-item-${matchingproduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingproduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingproduct.name}
        </div>
        <div class="product-price">
          ${(matchingproduct.priceCents/100).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${item.quantity}</span>
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id='${matchingproduct.id}'>
            Delete
          </span>
        </div>
      </div>
      <div class="delivery-options">
      <div class="delivery-options-title">
      Choose a delivery option:
     </div>
        </div>
      </div>
        ${deliveryOptionshtml(matchingproduct)}
      </div>
    </div>
  </div>
    `} });
});

// function deliveryOptionshtml(matchingproduct){
//   let html='';
//   deliveryOptions.forEach((deliveryOption)=>{
//     const today=dayjs();
//     const deliverydate=today.add(deliveryOption.deliverydays,'days');
//     const datestring=deliverydate.format('dddd MMMM D');
//     const pricestring=deliveryOption.priceCents===0 ?'Free':`${((deliveryOption.priceCents)/100).toFixed(2)}`
//     html+=`<div class="delivery-options">
    
//     <div class="delivery-option">
//       <input type="radio" checked
//         class="delivery-option-input"
//         name="delivery-option-${matchingproduct.id}">
//       <div>
//         <div class="delivery-option-date">
//           ${datestring}
//         </div>
//         <div class="delivery-option-price">
//           ${pricestring}
//         </div>
//       </div>
//     </div>
//     </div>

//     `
//   });
//   return html;
// }
function deliveryOptionshtml(matchingproduct) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliverydate = today.add(deliveryOption.deliverydays, 'days');
    const datestring = deliverydate.format('dddd MMMM D');
    const pricestring = deliveryOption.pricecents === 0 ? 'Free' : `${((deliveryOption.pricecents) / 100).toFixed(2)}`;

    html += `
      <div class="delivery-options">
        <div class="delivery-option">
          <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingproduct.id}">
          <div>
            <div class="delivery-option-date">${datestring}</div>
            <div class="delivery-option-price">${pricestring}</div>
          </div>
        </div>
      </div>
    `;
  });
  return html;
}

document.querySelector('.js-checkout').innerHTML=cartsummaryHTMl;
document.querySelectorAll('.js-delete-link').forEach((link)=>{
link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    removefromcart(productId);
    console.log(cart);
    const container=document.querySelector(`.js-cart-item-${productId} `);
    container.remove();
    updatecartquantity();
   
    document.querySelector('.js-checkout1').innerHTML=calculateCartQuantity()-4;
});
});
 document.querySelector('.js-checkout1').innerHTML=calculateCartQuantity()-4;


