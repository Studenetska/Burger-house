document.getElementById("main-action-button").onclick = function () {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" })
}

let links = document.querySelectorAll(".menu-item > a");
for (let i = 0; i < links.length; i++) {
  links[i].onclick = function () {
    document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({ behavior: "smooth" })
  }
}

// let buttons = document.getElementsByClassName("product-button");
// for (let i = 0; i < buttons.length; i++) {
//   buttons[i].onclick = function () {
//     document.getElementById("order").scrollIntoView({ behavior: "smooth" })
//   }
// }

let burger = document.getElementById("burger");
let name = document.getElementById("name");
let phone = document.getElementById("phone");
document.getElementById("order-action").onclick = function () {
  let hasError = false;

  [burger, name, phone].forEach(item => {
    if (!item.value) {
      item.parentElement.style.background = "red";
      hasError = true;
    } else {
      item.parentElement.style.background = "";
    }
  });

  if (!hasError) {
    [burger, name, phone].forEach(item => {
      item.value = "";
    });
    alert("Cпасибо за заказ! Мы скоро с вами свяжемся!");
  }
}
// ********************************************************************
// let coefficient = 1;
// let prices = document.getElementsByClassName("products-item-price");
// document.getElementById("change-currency").onclick = function (e) {
//   let currentCurrency = e.target.innerText;

//   let newCurrency = "$"
//   // let coefficient = 1; // вынесли в глобальную переменную

//   if (currentCurrency === "$") {
//     newCurrency = "₽";
//     coefficient = 80;
//   } else if (currentCurrency === "₽") {
//     newCurrency = "BYN";
//     coefficient = 3;
//   } else if (currentCurrency === 'BYN') {
//     newCurrency = '€';
//     coefficient = 0.9;
//   } else if (currentCurrency === '€') {
//     newCurrency = '¥';
//     coefficient = 6.9;
//   } else if (currentCurrency === "¥") {
//     newCurrency = '$';
//     coefficient = 1;
//   }

//   e.target.innerText = newCurrency;

//   for (let i = 0; i < prices.length; i++) {
//     prices[i].innerText = +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) + " " + newCurrency;
//   }

//   // !
//   // for (let i = 0; i < prices.length; i++) {
//   //   let priceElement = prices[i];
//   //   let basePrice = parseFloat(priceElement.getAttribute("data-base-price"));
//   //   let convertedPrice = (basePrice * coefficient).toFixed(1);
//   //   priceElement.innerText = `${convertedPrice} ${newCurrency}`;
//   // }

//   calculateTotalPrice();
// }
// **************************************************************

let coefficient = 1;
let prices = document.getElementsByClassName("products-item-price");
let cartProductPrices = document.querySelectorAll(".cart-product-price-item");

document.getElementById("change-currency").onclick = function (e) {
  let currentCurrency = e.target.innerText;

  let newCurrency = "$"

  if (currentCurrency === "$") {
    newCurrency = "₽";
    coefficient = 80;
  } else if (currentCurrency === "₽") {
    newCurrency = "BYN";
    coefficient = 3;
  } else if (currentCurrency === 'BYN') {
    newCurrency = '€';
    coefficient = 0.9;
  } else if (currentCurrency === '€') {
    newCurrency = '¥';
    coefficient = 6.9;
  } else if (currentCurrency === "¥") {
    newCurrency = '$';
    coefficient = 1;
  }

  e.target.innerText = newCurrency;

  // Обновляем цены для товаров на странице
  for (let i = 0; i < prices.length; i++) {
    prices[i].innerText = +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) + " " + newCurrency;
  }

  // Обновляем цены для товаров в корзине
  for (let i = 0; i < cartProductPrices.length; i++) {
    let cartProductPrice = cartProductPrices[i];
    let basePrice = parseFloat(cartProductPrice.getAttribute("data-base-price"));
    let convertedPrice = (basePrice * coefficient).toFixed(2);
    cartProductPrice.innerText = `${convertedPrice} ${newCurrency}`;
  }

  calculateTotalPrice();
}

function calculateTotalPrice() {
  let cartProducts = document.querySelectorAll(".cart-product-main-list");
  let total = 0;

  cartProducts.forEach((cartProduct) => {
    let priceElement = cartProduct.querySelector(".cart-product-price-item");
    let countElement = cartProduct.querySelector(".cart-product-count");
    let priceText = priceElement.innerText;
    let price = parseFloat(priceText.split(" ")[0]);
    let count = parseInt(countElement.innerText);

    total += price * count;
  });

  let cartTotalAmount = document.querySelector(".cart-total-amount");
  let currentCurrency = document.getElementById("change-currency").innerText;
  cartTotalAmount.innerText = `Итоговая стоимость: ${total.toFixed(2)} ${currentCurrency}`;
}

//! блок с ценой

// let productItems = document.querySelector('.products-items');
// // кнопка корзины в меню вверху
// let cartCounterLabel = document.querySelector('.cart-counter-label');
// // цифирки в меню - счет
// let cartItemsCounter = document.querySelector('.cart-items-counter');

// // реализую счет и добавление/вычитание для конкркетных товаров
// let quantityContainer = document.querySelector('.quantity');
// let countItem = document.querySelector('.count');
// let incrementButton = document.querySelector('.increment');
// let decrementButton = document.querySelector('.decrement');

// // счет и вычитание количества для конкретного товара
// let itemCounter = 0;
// // счет для конкретного количества товара
// let cartItems = {};

// let cartCounter = 0;
// let cartPrice = 0;


// // ?
// // ?

// // //! добавить при обнулении корзины отмену стиля
// //  cartItemsCounter.classList.remove('has-items');

// const productButton = document.querySelector('.product-button');

// // !!!
// const btnClickHandler = (e) => {
//   // делегирование на родительский элемент(пока не будет сделано)
//   const target = e.target;

//   // добавляем интервал, нужно для того, чтобы быстро что-то удалять и убирать(эффект времени)
//   const interval = 2000;

//   // создаем перемнную для отмены записи, с кнопкой заказать
//   let restoreHTML = null;

//   // если куда кликаем не является объектом, но ничего происходить не будет
//   if (typeof target !== 'object') return

//   // для делегирования нужно проверить куда кликаем, добавляем условия
//   if (!target.matches('.product-button')) return;

//   increment(cartCounterLabel, ++cartCounter, cartItemsCounter);

//   // !!!!
//   // const quantityContent = document.querySelector('.quantity').innerHTML;
//   // let productCounter;


//   // if (!restoreHTML) {
//   //   restoreHTML = target.innerHTML;
//   //   target.innerHTML = quantityContent;


//   //   if (target.dataset.action === 'plus' || (target.dataset.action === 'minus')) {

//   //     productCounter = quantityContent.querySelector('[data-counter]');

//   //     // // используем для обнуления, чтобы сохранить, что было записано ранее(структура)
//   //     // restoreHTML = target.innerHTML;
//   //   };

//   //   if (target.dataset.action === 'plus') {

//   //     productCounter.innerText = ++productCounter.innerText;

//   //     increment(cartCounterLabel, ++cartCounter, cartItemsCounter);

//   //   }

//   //   if (target.dataset.action === 'minus') {

//   //     if (parseInt(productCounter.innerText) === 0) quantity.classList.remove('active');

//   //     productCounter.innerText = --productCounter.innerText;

//   //     cartCounterLabel.querySelector('.cart-items-counter').innerText = --cartCounter;

//   //   }


//   // } else {
//   //   target.innerHTML = restoreHTML;
//   //   restoreHTML = null;
//   // }

//   // !!!

//   const quantityContent = document.querySelector('.quantity').innerHTML;




//   if (!restoreHTML) {
//     restoreHTML = target.innerHTML;
//     target.innerHTML = quantityContent;

//   } else {
//     target.innerHTML = restoreHTML;
//     restoreHTML = null;
//   }



//   // ?

//   // if (target.dataset.action === 'plus' || (target.dataset.action === 'minus')) {

//   //   productCounter = quantityContent.querySelector('[data-counter]');

//   //   // // используем для обнуления, чтобы сохранить, что было записано ранее(структура)
//   //   // restoreHTML = target.innerHTML;
//   // };

//   // if (target.dataset.action === 'plus') {

//   //   productCounter.innerText = ++productCounter.innerText;

//   //   increment(cartCounterLabel, ++cartCounter, cartItemsCounter);

//   // }

//   // if (target.dataset.action === 'minus') {

//   //   if (parseInt(productCounter.innerText) === 0) quantity.classList.remove('active');

//   //   productCounter.innerText = --productCounter.innerText;

//   //   cartCounterLabel.querySelector('.cart-items-counter').innerText = --cartCounter;

//   // }


//   // } else {
//   //   target.innerHTML = restoreHTML;
//   // restoreHTML = null;
//   //   }



//   // // !

//   //   //*** Правильный вариант рассчета стоимости для корзины, с разными валютами
//   //   // добавляем стоимость и переводим её в число
//   //   let mock = target.parentElement.previousElementSibling.querySelector('.products-item-price').innerText
//   //   let priceNumber = parseFloat(mock);
//   //   // округляем число, чтобы не было проблем с плавающими цифрами
//   //   cartPrice = Math.round((cartPrice + priceNumber) * 100) / 100;
//   //   // добавляем все валюты
//   //   let currentCurrency = document.getElementById("change-currency").innerText;

//   //   // используем для обнуления, чтобы сохранить, что было записано ранее(структура)
//   //   restoreHTML = target.innerHTML;

//   //   // пишем сколько было добавлено всего
//   //   target.innerHTML = `Добавлено в корзину ${cartPrice.toFixed(2)} ${currentCurrency}`;

//   // // !


//   //?**

//   // // вызов функции выключения возможности кликать на заказ
//   // disabledControls(target, productItems, btnClickHandler);

//   // //! попытка появления при клике заказать кнопок
//   // quantityContainer.classList.add('active');

//   // // сбрасываем цену, и возвращаем кнопку заказать
//   // setTimeout(() => {
//   //   // очищаем кнопку она возвращается к заказать
//   //   target.innerHTML = restoreHTML;

//   //   // вызов функции включения возможности кликать на заказать
//   //   enabledControls(target, productItems, btnClickHandler);
//   // }, interval);

//   //?**

//   // для показа товара на странице элемента
//   // updateElements();


// };


// // чтобы иметь возможность перенести код в другую страницу, вынесем его в функцию
// function increment($label, cartCn, $itCn) {
//   // $ - обозначает дом элемент
//   $label.querySelector('.cart-items-counter').innerText = cartCn;
//   if (cartCn === 1) $itCn.style.display = 'block' && $itCn.classList.add('has-items');
// };

// // функция выключения возможности кликать на заказ
// function disabledControls(target, productItems, btnClickHandler) {
//   // защита от дурака делаем так, чтобы на кнопку миллион раз нажимать было нельзя
//   target.disabled = true;
//   // чтобы выключить элементы рядом при состоянии не нажатия, а именно disabled
//   productItems.removeEventListener('click', btnClickHandler);
// };

// // функция включения возможности кликать на заказать
// function enabledControls(target, productItems, btnClickHandler) {
//   // разрешаем клик на кнопку(конкретную)
//   target.disabled = false;
//   // опять включаем возможность покупать на всех элементах
//   productItems.addEventListener('click', btnClickHandler);
// };
// // !!!!



// // ?
// window.addEventListener('click', function (event) {

//   const target = event.target;

//   let quantity;
//   let productCounter;

//   if (target.dataset.action === 'plus' || (target.dataset.action === 'minus')) {

//     quantity = target.closest('.quantity');
//     productCounter = quantity.querySelector('[data-counter]');

//     // // используем для обнуления, чтобы сохранить, что было записано ранее(структура)
//     // restoreHTML = target.innerHTML;
//   };

//   if (target.dataset.action === 'plus') {

//     productCounter.innerText = ++productCounter.innerText;

//     increment(cartCounterLabel, ++cartCounter, cartItemsCounter);

//   }

//   if (target.dataset.action === 'minus') {

//     if (parseInt(productCounter.innerText) === 0) quantity.classList.remove('active');

//     productCounter.innerText = --productCounter.innerText;

//     cartCounterLabel.querySelector('.cart-items-counter').innerText = --cartCounter;

//   }


// })
// // ?




// // document.addEventListener('click', function (e) {
// //   if (e.target.hasAttribute(''))
// // });



// // ?

// // !
// // // Обработчик клика на кнопку "+"
// // incrementButton.addEventListener('click', () => {
// //   countItem.innerHTML = ++itemCounter;

// // });

// // // Обработчик клика на кнопку "-"
// // decrementButton.addEventListener('click', () => {
// //   countItem.innerHTML = --itemCounter;

// // });
// // !

// productItems.addEventListener('click', btnClickHandler);

// !  попытка 2

// const btnMinus = document.querySelector('[data-action="minus"]');
// const btnPlus = document.querySelector('[data-action="plus"]');
// const counter = document.querySelector('[data-counter]');

// btnPlus.addEventListener('click', function () {
//   counter.innerText = ++counter.innerText;
// });

// btnMinus.addEventListener('click', function () {
//   if (parseInt(counter.innerText) === 0) quantityContainer.classList.remove('active');
//   counter.innerText = --counter.innerText;
// });




// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



let productItems = document.querySelector('.products-items');
// кнопка корзины в меню вверху
let cartCounterLabel = document.querySelector('.cart-counter-label');
// цифирки в меню - счет
let cartItemsCounter = document.querySelector('.cart-items-counter');

// Общий счетчик цены и общий счетчик количества
let cartCounter = 0;
let cartPrice = 0;



// //! добавить при обнулении корзины отмену стиля
//  cartItemsCounter.classList.remove('has-items');


// !!!
const btnClickHandler = (e) => {
  // делегирование на родительский элемент(пока не будет сделано)
  const target = e.target;

  // создаем перемнную для отмены записи, с кнопкой заказать
  let restoreHTML = null;

  // если куда кликаем не является объектом, но ничего происходить не будет
  if (typeof target !== 'object') return

  // для делегирования нужно проверить куда кликаем, добавляем условия
  if (!target.matches('.product-button')) return;

  increment(cartCounterLabel, ++cartCounter, cartItemsCounter);


  // !!!!!!
  // ??????
  // if (target.classList.contains('header-cart-actions')) {
  //   const cartProductItems = document.querySelector('.cart-product-items');
  //   if (!cartProductItems.classList.contains('active')) {
  //     cartProductItems.classList.add('active');
  //   } else {
  //     cartProductItems.classList.remove('active');
  //   }
  // }



  // !!!!!!!!!!!!!!!

};

// ! --------------------------- МОЖНО УДАЛЯТЬ
// // Получаем элемент корзины
// const cartProductItems = document.querySelector('.cart-product-items');

// // Получаем элемент, на который пользователь будет кликать
// const cartActions = document.querySelector('.header-cart-actions');

// // Добавляем обработчик события клика
// cartActions.addEventListener('click', function (e) {

//   const target = e.target;
//   // Получаем элемент "cart-items-counter"
//   const cartItemsCounter = document.querySelector('.cart-items-counter');

//   // Проверяем, есть ли у элемента класс "has-items"
//   if (cartItemsCounter.classList.contains('has-items')) {
//     // Добавляем или удаляем класс "active" у секции
//     cartProductItems.classList.add('active');
//   }
//   if (target.classList.contains('cart-counter-label') && cartProductItems.classList.contains('cart-product-items.active')) {
//     cartProductItems.classList.remove('active');
//   }
// });
// ! --------------------------- Финал


// Получаем элемент корзины
const cartProductItems = document.querySelector('.cart-product-items');


// Добавляем обработчик события клика
cartCounterLabel.addEventListener('click', function (e) {

  const target = e.target;
  // Получаем элемент "cart-items-counter"
  const cartItemsCounter = document.querySelector('.cart-items-counter');

  // Проверяем, есть ли у элемента класс "has-items"
  if (cartItemsCounter.classList.contains('has-items')) {
    // Добавляем или удаляем класс "active" у секции
    cartProductItems.classList.toggle('active');
  }

});






// чтобы иметь возможность перенести код в другую страницу, вынесем его в функцию
function increment($label, cartCn, $itCn) {
  // $ - обозначает дом элемент
  $label.querySelector('.cart-items-counter').innerText = cartCn;
  if (cartCn === 1) $itCn.style.display = 'block' && $itCn.classList.add('has-items');
};

// функция выключения возможности кликать на заказ
function disabledControls(target, productItems, btnClickHandler) {
  // защита от дурака делаем так, чтобы на кнопку миллион раз нажимать было нельзя
  target.disabled = true;
  // чтобы выключить элементы рядом при состоянии не нажатия, а именно disabled
  productItems.removeEventListener('click', btnClickHandler);
};

// функция включения возможности кликать на заказать
function enabledControls(target, productItems, btnClickHandler) {
  // разрешаем клик на кнопку(конкретную)
  target.disabled = false;
  // опять включаем возможность покупать на всех элементах
  productItems.addEventListener('click', btnClickHandler);
};
// !!!!



productItems.addEventListener('click', btnClickHandler);


// переключатель стиля в кнопке  при нажатии
function toggleProductCalculator(button) {
  let elements = getProductElements(button);

  toggleProductElement(elements.calculator, "block");
  toggleProductElement(elements.quantity, "flex");
  toggleProductElement(elements.productButton, "none");


};

// для кнопки "-" логика
// function decreaseQuantity(button) {

//   let countElement = button.parentNode.querySelector(".count");
//   let count = parseInt(countElement.innerText);
//   increment(cartCounterLabel, --cartCounter, cartItemsCounter);

//   // countElement.innerText = count > 1 ? count - 1 : (() => {
//   //   let elements = getProductElements(button);
//   //   toggleProductElement(elements.calculator, "none");
//   //   toggleProductElement(elements.quantity, "none");
//   //   toggleProductElement(elements.productButton, "flex");
//   //   return count;
//   // })();

//   // Проверяем, находится ли кнопка в корзине
//   let isInCart = button.closest('.cart-product-main-list') !== null;

//   if (isInCart) {
//     if (count > 1) {
//       countElement.innerText = count - 1;
//     } else {
//       let cartProduct = button.closest(".cart-product-main-list");
//       cartProduct.remove();

//       let productId = cartProduct.dataset.productId;

//       let catalogProduct = document.querySelector(`.products-item[data-product-id="${productId}"]`);
//       if (catalogProduct) {
//         let catalogButton = catalogProduct.querySelector(".product-button");
//         let catalogCountElement = catalogButton.parentNode.querySelector(".count");
//         catalogCountElement.innerText = "0";
//         toggleProductCalculator(catalogButton);
//       }
//     }
//   } else {
//     if (count > 1) {
//       countElement.innerText = count - 1;
//     } else {
//       let elements = getProductElements(button);
//       toggleProductElement(elements.calculator, "none");
//       toggleProductElement(elements.quantity, "none");
//       toggleProductElement(elements.productButton, "flex");
//     }
//   }

//   // ! запись товара в корзину + цена
//   calculateTotalPrice();

//   // !
//   // Находим ближайшего родителя с классом ".products-item"
//   let cartProduct = button.closest(".products-item");

//   // Получаем значение атрибута "data-product-id" из элемента
//   const productId = cartProduct.dataset.productId;

//   // Выполняем обновление количества товаров для конкретной карточки
//   updateCartItemQuantity(productId, countElement.innerText);

// };



function decreaseQuantity(button) {

  // *********************

  let countElement = button.parentNode.querySelector(".count");
  let count = parseInt(countElement.innerText);

  // ***********************

  increment(cartCounterLabel, --cartCounter, cartItemsCounter);


  // Проверяем, находится ли кнопка в корзине
  let isInCart = button.closest('.cart-product-main-list') !== null;

  if (isInCart) {
    if (count > 1) {
      countElement.innerText = count - 1;
    } else {
      let cartProduct = button.closest(".cart-product-main-list");
      cartProduct.remove();

      let productId = cartProduct.dataset.productId;

      let catalogProduct = document.querySelector(`.products-item[data-product-id="${productId}"]`);
      if (catalogProduct) {
        let catalogButton = catalogProduct.querySelector(".product-button");
        let catalogCountElement = catalogButton.parentNode.querySelector(".count");
        catalogCountElement.innerText = "0";
        toggleProductCalculator(catalogButton);
      }
    }
  } else {
    if (count > 1) {
      countElement.innerText = count - 1;
    } else {
      countElement.innerText = 0;

      let elements = getProductElements(button);
      toggleProductElement(elements.calculator, "none");
      toggleProductElement(elements.quantity, "none");
      toggleProductElement(elements.productButton, "flex");

    }
  }

  // ! запись товара в корзину + цена
  calculateTotalPrice();

  // !
  // Находим ближайшего родителя с классом ".products-item"
  let cartProduct = button.closest(".products-item");

  // Получаем значение атрибута "data-product-id" из элемента
  const productId = cartProduct.dataset.productId;

  // Выполняем обновление количества товаров для конкретной карточки
  updateCartItemQuantity(productId, countElement.innerText);

};









// ?

// function productIdClosest(button) {

// }
// ?



// для кнопки "+" логика
function increaseQuantity(button) {

  let countElement = button.parentNode.querySelector(".count");
  let count = parseInt(countElement.innerText);
  increment(cartCounterLabel, ++cartCounter, cartItemsCounter);
  countElement.innerText = count + 1;


  // ! запись товара в корзину + цена
  calculateTotalPrice();


  // !
  // Находим ближайшего родителя с классом ".products-item"
  let cartProduct = button.closest(".products-item, .cart-product-main-list");

  // Получаем значение атрибута "data-product-id" из элемента
  const productId = cartProduct.dataset.productId;

  // Выполняем обновление количества товаров для конкретной карточки
  updateCartItemQuantity(productId, countElement.innerText);

};



// чтобы избежать дубляжа кода выносим нахождение переменных
function getProductElements(button) {
  let parent = button.closest(".products-item");
  return {
    calculator: parent.querySelector(".calculator"),
    quantity: parent.querySelector(".quantity"),
    productButton: parent.querySelector(".product-button")
  };
};

// переключатель стиля для избежания дубляжа
function toggleProductElement(element, displayValue) {
  element.style.display = displayValue;
};


// !!!
function updateCartItemQuantity(productId, count) {

  const cartProduct = document.querySelector(`.cart-product-main-list[data-product-id="${productId}"]`);

  if (cartProduct) {
    const countElement = cartProduct.querySelector(".cart-product-count");
    countElement.innerText = count;
  }


  calculateTotalPrice()
}

// !!!


//************************************************************* */ ???

// function calculateTotalPrice() {
//   let cartProducts = document.querySelectorAll(".cart-product-main-list");
//   let total = 0;

//   cartProducts.forEach((cartProduct) => {
//     let priceElement = cartProduct.querySelector(".cart-product-price-item");
//     let countElement = cartProduct.querySelector(".cart-product-count");
//     let price = parseFloat(priceElement.innerText);
//     let count = parseInt(countElement.innerText);

//     total += price * count * coefficient;

//   });

//   let cartTotalAmount = document.querySelector(".cart-total-amount");
//   // добавляем все валюты
//   let currentCurrency = document.getElementById("change-currency").innerText;
//   cartTotalAmount.innerText = `Итоговая стоимость: ${total.toFixed(2)} ${currentCurrency}`;

// };
//************************************************************* */ ???


function calculateTotalPrice() {
  let cartProducts = document.querySelectorAll(".cart-product-main-list");
  let total = 0;


  cartProducts.forEach((cartProduct) => {
    let priceElement = cartProduct.querySelector(".cart-product-price-item");
    let countElement = cartProduct.querySelector(".cart-product-count");
    let productBasePrice = parseFloat(priceElement.getAttribute("data-base-price"));
    let count = parseInt(countElement.innerText);


    // Обновляем текст цены с учетом выбранной валюты и коэффициента
    let currentCurrency = document.getElementById("change-currency").innerText;
    switch (currentCurrency) {
      case "$":
        break;
      case "₽":
        productBasePrice *= 80;
        break;
      case "BYN":
        productBasePrice *= 3;
        break;
      case "€":
        productBasePrice *= 0.9;
        break;
      case "¥":
        productBasePrice *= 6.9;
        break;
    }

    let price = productBasePrice.toFixed(2);

    // Обновляем текст цены в карточке товара в корзине
    priceElement.innerText = price + " " + currentCurrency;

    total += price * count;
  });

  let cartTotalAmount = document.querySelector(".cart-total-amount");
  let currentCurrency = document.getElementById("change-currency").innerText;
  cartTotalAmount.innerText = `Итоговая стоимость: ${total.toFixed(2)} ${currentCurrency}`;
}





// ???
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// ? ДЛЯ КОРЗИНЫ ЛОГИКА

window.addEventListener('click', function (event) {
  let target = event.target;

  // проверяем был ли сделан клик по кнопке заказать
  if (target.classList.contains('product-button')) {
    // находим родителя этого элемента(те всю карточку)
    let parentProductItem = target.closest(".products-item");
    console.log(parentProductItem);



    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    let countElement = target.parentNode.querySelector(".count");
    let count = parseInt(countElement.innerText);

    if (count.innerText !== 0) {
      console.log(count);
      countElement.innerText = 1;
    }



    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // //   //*** Правильный вариант рассчета стоимости для корзины, с разными валютами
    // // добавляем стоимость и переводим её в число
    // let mock = target.parentElement.previousElementSibling.querySelector('.products-item-price').innerText
    // let priceNumber = parseFloat(mock);
    // // округляем число, чтобы не было проблем с плавающими цифрами
    // cartPrice = Math.round((cartPrice + priceNumber) * 100) / 100;
    // // ***
    // // добавляем все валюты
    // let currentCurrency = document.getElementById("change-currency").innerText;


    // cобираем данные с карточки товара

    const productInfo = {
      // нужно в id давать артикул товара пока его нет
      id: parentProductItem.getAttribute("data-product-id"),
      image: parentProductItem.querySelector("img").getAttribute("src"),
      title: parentProductItem.querySelector(".products-item-title").innerText,
      price: parentProductItem.querySelector(".products-item-price").innerText,
      weight: parentProductItem.querySelector(".products-item-weight").innerText,
      count: parentProductItem.querySelector("[data-counter]").innerText,
      basePrice: parseFloat(parentProductItem.querySelector(".products-item-price").getAttribute("data-base-price"))
    };

    console.log(productInfo);

    // !

    const cartProductHTML = `
      <div class="cart-product-main-list products-item" data-product-id="${productInfo.id}">
        <div class="cart-product-item-image">
          <img src="${productInfo.image}" alt="${productInfo.title}">
        </div>
        <div class="cart-product-item-title">
          <div class="cart-product-title">${productInfo.title}</div>
        </div>
        <div class="cart-product-item-weight">
          <div class="cart-product-weight">${productInfo.weight}</div>
        </div>
        <div class="cart-product-item-price">
          <div class="cart-product-price-item" data-base-price="${productInfo.basePrice}">${productInfo.price}</div>
        </div>
        <div class="quantity">
          <button class="decrement quantity-button" data-action="minus" onclick="decreaseQuantity(this)">-</button>
            <div class="cart-product-count count">${productInfo.count}</div>
          <button class="increment quantity-button" data-action="plus" onclick="increaseQuantity(this)">+</button>
        </div>
      </div>
    `;

    // !

    let cartContentContainer = document.querySelector(".cart-content-container");
    let cartProductListBody = document.querySelector(".cart-product-list-body");
    // cartContentContainer.insertAdjacentHTML('beforeend', cartProductHTML);
    cartProductListBody.insertAdjacentHTML('beforeend', cartProductHTML);


    calculateTotalPrice();

  };


  // Обработчик для кнопки "decrement"
  if (target.classList.contains('decrement')) {
    // Найдите родительскую карточку товара
    let productCard = target.closest('.products-item');

    if (productCard) {
      // Получите счетчик товара
      let countElement = productCard.querySelector('.count');
      let count = parseInt(countElement.innerText);

      // Проверьте, равен ли счетчик 0
      if (count === 0) {
        // Если счетчик равен 0, то можно вызвать функцию удаления товара из корзины
        // Получаю id товара
        let productId = productCard.getAttribute('data-product-id');
        // Вызов функции удаления товара из корзины
        removeProductFromCart(productId);
      }
    }

  }

  // ******************************************

  // if (target.classList.contains('decrement')) {
  //   // находим родителя этого элемента(те всю карточку)
  //   let parentProductItem = target.closest(".products-item");
  //   console.log(parentProductItem);

  //   // Получаем текущее количество товара в карточке товара на странице и преобразуем его в число
  //   let countOnPage = parseInt(parentProductItem.querySelector("[data-counter]").innerText);
  //   console.log(countOnPage);

  //   if (countOnPage < 0) {
  //     console.log('kkkkk');
  //   }
  //   // ******************************************************88
  //   // // Получаем элемент с количеством товара в корзине, который был только что добавлен
  //   // let addedCartItem = document.querySelector(`[data-product-id="${productInfo.id}"]`);



  //   // // Находим элемент с количеством товара в корзине для только что добавленного товара
  //   // let countInCartElement = addedCartItem.querySelector(".cart-product-count");

  //   // if (countOnPage < 1) {
  //   //   // Если количество на странице меньше 1, удаляем товар из корзины
  //   //   console.log(addedCartItem)
  //   //   console.log('lhjhj');
  //   // } else {
  //   //   // Иначе обновляем количество товара в корзине
  //   //   countInCartElement.innerText = countOnPage;
  //   // }
  // }

  // ******************************

});

function removeProductFromCart(productId) {
  // Найти карточку товара в корзине по productId и удалить ее
  let cartProduct = document.querySelector(`.cart-product-main-list[data-product-id="${productId}"]`);
  if (cartProduct) {
    cartProduct.remove();
  }
}




let actionCartBtn = document.querySelector('.cart-main-actions');
let orderBtn = actionCartBtn.querySelector('button[type="submit"]');
// orderBtn.addEventListener('click', () => {
//   alert('Ваше замовлення успішно виконано!');
//   // налаштувати логіку оплати

//   //1 варіант оновлення сторінки
//   location.reload();
// });


// 2й вариант  - Обновленный обработчик для кнопки "Заказать"
orderBtn.addEventListener('click', () => {
  alert('Ваше замовлення успішно виконано!');
  // налаштувати логіку оплати
  // Очищаем корзину после успешного заказа
  clearCart();
});

// Функция для очистки корзины
function clearCart() {
  const cartProducts = document.querySelectorAll('.cart-product-main-list');
  cartProducts.forEach((cartProduct) => {
    cartProduct.remove();
  });
  calculateTotalPrice();
  cartCounter = 0;
  cartItemsCounter.style.display = 'none';
  cartItemsCounter.classList.remove('has-items');
}

let clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click', () => {
  const confirmation = confirm('Видалити товари з кошика?');
  if (confirmation) {
    alert('Товари були успішно видалені з кошика!');
    location.reload();
  }
});

let continueBtn = actionCartBtn.querySelector('button[type="button"]');
continueBtn.addEventListener('click', () => { cartProductItems.classList.toggle('active'); })
