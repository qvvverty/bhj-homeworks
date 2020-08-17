'use strict';

function toggleCartVisibility() {
  if (document.querySelector('div.cart__products').children.length !== 0) {
    document.querySelector('div.cart').style.display = 'block';
  } else {
    document.querySelector('div.cart').style.display = 'none';
  }
}

function addToCart(id, imgSrc, qty) {
  const cartProducts = document.querySelector('div.cart__products');
  const cartProduct = document.createElement('div');
  cartProduct.innerHTML = `
    <img class="cart__product-image" src="">
    <a href="#" class="cart__product-delete" title="Удалить товар из корзины">&times;</a>
    <div class="cart__product-count"></div>
  `
  cartProduct.classList.add('cart__product');
  cartProduct.dataset.id = id;
  cartProduct.querySelector('img').src = imgSrc;
  cartProduct.lastElementChild.innerText = qty;

  cartProducts.appendChild(cartProduct);
}

function saveCart() {
  const cartArr = [];
  const cartProducts = document.getElementsByClassName('cart__product');
  for (const product of cartProducts) {
    cartArr.push({
      id: product.dataset.id,
      imgSrc: product.querySelector('img').src,
      qty: product.lastElementChild.innerText,
    });
  }

  localStorage.setItem('cart', JSON.stringify(cartArr));
}

function loadCart() {
  if (localStorage.getItem('cart')) {
    const cartArr = JSON.parse(localStorage.getItem('cart'));
    for (const product of cartArr) {
      addToCart(product.id, product.imgSrc, product.qty);
    }
  }
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
      addToCart(click.target.closest('div.product').dataset.id, click.target.closest('div.product').querySelector('img.product__image').src, click.target.parentElement.querySelector('div.product__quantity-value').innerText);
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