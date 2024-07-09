import * as elementsHtml from "./elementsHtml.js";
import { HandleHtml } from "./HandleHtml.js";

export class HandleModal{
  static openModal(cart){
    elementsHtml.cartBtn.addEventListener("click", () => {
      const modal = document.querySelector(".modal");
      modal.classList.add("active");
    });

    if(cart.length === 0){
      elementsHtml.modalItemInfo.innerHTML = "<h3>Ops, seu carrinho está vazio!</h3>";
    }
  }

  static closeModal(){
    elementsHtml.closeModalBtn.addEventListener("click", () => {
      elementsHtml.modal.classList.remove("active");
    });
  }

  static closeModalClickOutside(){
    elementsHtml.modal.addEventListener("click", (event) => {
      if(event.target === elementsHtml.modal) {
        elementsHtml.modal.classList.remove("active");
      }
    });
  }

  static updateModal(cart){
    let total = 0;

    elementsHtml.modalItemInfo.innerHTML = "";

    if(cart.length === 0){
      elementsHtml.modalItemInfo.innerHTML = "<h3>Ops, seu carrinho está vazio!</h3>";
    }

    cart.forEach(item => {
      elementsHtml.modalItemInfo.innerHTML += `
        <div class="card-item-modal">
            <div class="moda-item-info-container">
              <h4>${item.name}</h4>
              <p>(Quantidade: <span class="modal-quantity">${item.quantity}</span>)</p>
              <span>R$ ${item.price}.00</span>
            </div>
            <button class="remove-item-from-cart" data-name="${item.name}">Remover</button>
        </div>     
      `

      total += item.price * item.quantity;
    });

    HandleHtml.handleTotalElement(total);
    HandleHtml.handleQuantityElement(cart);
  }
}