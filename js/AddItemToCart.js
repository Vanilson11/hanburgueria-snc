import * as elementsHtml from "./elementsHtml.js";
import { HandleModal } from "./modal.js";
import { HandleHtml } from "./HandleHtml.js";

export class AddItemToCart{
  static cart = [];
  getElementData(){
    elementsHtml.menu.addEventListener("click", (event) => {
      const parentButton = event.target.closest(".add-item-to-cart");
      
      if(parentButton){
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        this.addToCart(name, price);
      }
    });
  }

  addToCart(name, price){
    const existsItem = AddItemToCart.cart.find(item => item.name === name);

    if(existsItem){
      existsItem.quantity += 1;
    } else {
      AddItemToCart.cart.push({
        name,
        price,
        quantity: 1,
      });  
    }

    HandleModal.updateModal(AddItemToCart.cart);
    HandleHtml.handleQuantityElement(AddItemToCart.cart);
  }

  removeItemFromCart(){
    HandleHtml.removeItemFromCart();
  }
}