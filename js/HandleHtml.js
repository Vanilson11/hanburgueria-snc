import * as elementsHtml from "./elementsHtml.js";
import { HandleModal } from "./modal.js";
import { AddItemToCart } from "./AddItemToCart.js";

export class HandleHtml{
  static handleQuantityElement(cart){
    elementsHtml.cartQuantity.textContent = cart.length;
  }

  static handleTotalElement(total){
    elementsHtml.cartTotal.textContent = `Total: ${total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })}`
  }

  static removeItemFromCart(){
    elementsHtml.modalContainer.addEventListener("click", (event) => {
      if(event.target.classList.contains("remove-item-from-cart")){
        const name = event.target.getAttribute("data-name");
        const index = AddItemToCart.cart.findIndex(item => item.name === name);
        
        if(index !== -1){
          const item = AddItemToCart.cart[index];
          
          if(item.quantity > 1){
            item.quantity -= 1;
            HandleModal.updateModal(AddItemToCart.cart);
          } else {
            AddItemToCart.cart.splice(index, 1);
            HandleModal.updateModal(AddItemToCart.cart);
          }
        }
      }
    });
  }

  static verifyIfOpen(){
    const data = new Date();
    const hour = data.getHours();

    if(hour > 18 && hour < 22){
      elementsHtml.elementHorario.style.background = "green";
    } else {
      elementsHtml.elementHorario.style.background = "red";
    }
  }
}