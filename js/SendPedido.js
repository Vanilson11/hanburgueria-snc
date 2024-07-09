import { AddItemToCart } from "./AddItemToCart.js";
import * as elementsHtml from "./elementsHtml.js";
import { HandleModal } from "./modal.js";

export class SendPedido{
  static sendPedido(){
    elementsHtml.sendPedido.addEventListener("click", () => {
      if(elementsHtml.addressInput.value == ""){
        elementsHtml.addressInput.style.border = "1px solid red";
        elementsHtml.setAddresError.classList.add("active");

        return;
      }

      if(AddItemToCart.cart.length === 0) {
        Toastify({
          text: "Ops, seu carrinho está vazio!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#FF3131",
          },
        }).showToast();

        return;
      }

      const verifiyIsOpen = new SendPedido();
      const isOpen = verifiyIsOpen.isOpen();

      if(!isOpen){
        Toastify({
          text: "Ops, o restaurante está fechado no momento.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#FF3131",
          },
        }).showToast();
  
        return
      } else {
        const cartItems = AddItemToCart.cart.map(item => {
          return (
            `(${item.quantity}) ${item.name}, Preço: R$ ${item.price} | `
          )
        }).join("");
        
        const inicioMessage = "Olá, eu gostaria de fazer o seguinte pedido: "
        const message = inicioMessage + encodeURIComponent(cartItems);
        const phone = "98981789862";

        window.open(`https://wa.me/${phone}?text=${message} Endereço: ${elementsHtml.addressInput.value}`, "_blank");

        AddItemToCart.cart = [];

        HandleModal.updateModal(AddItemToCart.cart);
      }
    });

    elementsHtml.addressInput.addEventListener("input", () => {
      elementsHtml.addressInput.style.border = "1px solid #C1C1C1";
      elementsHtml.setAddresError.classList.remove("active");
    });
  }

  isOpen(){
    const data = new Date();
    const hour = data.getHours();

    return hour > 18 && hour < 22;
  }
}