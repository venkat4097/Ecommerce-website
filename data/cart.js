
export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart=[{
        productId:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity:2,
        deliveryoptionid:'1'
    },
    {
        productId:'83d4ca15-0f35-48f5-b7a3-1ea004f',
        quantity:1 ,
        deliveryoptionid:'2' 
    }];
}
export function addtocart(productId){
    let matchingitem;
    cart.forEach((item)=>{
        if(productId===item.productId){
            matchingitem=item;
        }
    });
    const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const quantity = Number(quantitySelector.value);
    if(matchingitem)
    matchingitem.quantity+=quantity;
    //here we should use camel case only
    else{
        cart.push({
            productId:productId,
            quantity:quantity,
            deliveryoptionid:'1'
        });
    }
    savetostorage();
    updatecartquantity();
    console.log(cart);
}

export function updatecartquantity(){
    let cartqunatity=0;
    cart.forEach((item)=>{
        cartqunatity+=item.quantity;
    }
    
); 
document.querySelector('.js-cart-quantity').innerHTML=cartqunatity;}

export function removefromcart(productId){
      const newcart=[];
      cart.forEach((item)=>{
        if(item.productId!==productId)
        newcart.push(item);
      });
      cart=newcart;
      savetostorage();
      document.querySelector('.js-checkout1').innerHTML=calculateCartQuantity();
}
 export function calculateCartQuantity() {
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
   }
   export function updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    savetostorage();
  }
function savetostorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}