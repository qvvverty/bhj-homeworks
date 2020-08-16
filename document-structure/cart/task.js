'use strict';

function toggleCartVisibility() {
  if (document.querySelector('div.cart__products').children.length !== 0) {
    document.querySelector('div.cart').style.display = 'block';
  } else {
    document.querySelector('div.cart').style.display = 'none';
  }
}

const cartProducts = document.querySelector('div.cart__products');

function saveCart() {
  localStorage.setItem('cart', cartProducts.innerHTML);
}

function loadCart() {
  cartProducts.innerHTML = localStorage.getItem('cart');
}

loadCart();
toggleCartVisibility();

document.addEventListener('click', click => {
  if (click.target.classList.contains('product__quantity-control_dec')) {
    let cardQuantity = parseInt(click.target.nextElementSibling.innerText);
    if (cardQuantity > 1) {
      click.target.nextElementSibling.innerText = cardQuantity -= 1;
    }
  }

  if (click.target.classList.contains('product__quantity-control_inc')) {
    let cardQuantity = parseInt(click.target.previousElementSibling.innerText);
    click.target.previousElementSibling.innerText = cardQuantity += 1;
  }
});

document.addEventListener('click', click => {
  if (click.target.classList.contains('product__add')) {
    const productsInCart = document.getElementsByClassName('cart__product');
    let foundInCart;
    for (const product of productsInCart) {
      if (product.dataset.id === click.target.closest('div.product').dataset.id) {
        foundInCart = product;
      }
    }

    if (foundInCart) {
      const newProdInCartQty = parseInt(foundInCart.lastElementChild.innerText) + parseInt(click.target.parentElement.querySelector('div.product__quantity-value').innerText);
      foundInCart.lastElementChild.innerText = newProdInCartQty;
    } else {
      const cartProduct = document.createElement('div');
      cartProduct.innerHTML = `
        <img class="cart__product-image" src="">
        <a href="#" class="cart__product-delete" title="Удалить товар из корзины">&times;</a>
        <div class="cart__product-count"></div>
      `
      cartProduct.classList.add('cart__product');
      cartProduct.dataset.id = click.target.closest('div.product').dataset.id;
      cartProduct.querySelector('img').src = click.target.closest('div.product').querySelector('img.product__image').src;
      cartProduct.lastElementChild.innerText = click.target.parentElement.querySelector('div.product__quantity-value').innerText;

      cartProducts.appendChild(cartProduct);
    }
    
    toggleCartVisibility();
    saveCart();
  }
});

document.addEventListener('click', click => {
  if (click.target.classList.contains('cart__product-delete')) {
    click.target.parentElement.remove();
    toggleCartVisibility();
    saveCart();
  }
});
