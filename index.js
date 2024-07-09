import { AddItemToCart } from "./js/AddItemToCart.js";
import { HandleModal } from "./js/modal.js";
import { HandleHtml } from "./js/HandleHtml.js";
import { SendPedido } from "./js/SendPedido.js";

const addItemToCart = new AddItemToCart();
addItemToCart.getElementData();
addItemToCart.removeItemFromCart();

HandleModal.openModal(AddItemToCart.cart);
HandleModal.closeModal();
HandleModal.closeModalClickOutside();

HandleHtml.verifyIfOpen();

SendPedido.sendPedido();