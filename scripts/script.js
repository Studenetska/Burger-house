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

let prices = document.getElementsByClassName("products-item-price");
document.getElementById("change-currency").onclick = function (e) {
  let currentCurrency = e.target.innerText;

  let newCurrency = "$"
  let coefficient = 1;

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
  }

  e.target.innerText = newCurrency;

  for (let i = 0; i < prices.length; i++) {
    prices[i].innerText = +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) + " " + newCurrency;
  }
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


};


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


}

// для кнопки "-" логика
function decreaseQuantity(button) {
  let countElement = button.parentNode.querySelector(".count");
  let count = parseInt(countElement.innerText);
  increment(cartCounterLabel, --cartCounter, cartItemsCounter);

  countElement.innerText = count > 1 ? count - 1 : (() => {
    let elements = getProductElements(button);
    toggleProductElement(elements.calculator, "none");
    toggleProductElement(elements.quantity, "none");
    toggleProductElement(elements.productButton, "flex");
    return count;
  })();

}

// для кнопки "+" логика
function increaseQuantity(button) {
  let countElement = button.parentNode.querySelector(".count");
  let count = parseInt(countElement.innerText);
  increment(cartCounterLabel, ++cartCounter, cartItemsCounter);
  countElement.innerText = count + 1;
}

// чтобы избежать дубляжа кода выносим нахождение переменных
function getProductElements(button) {
  let parent = button.closest(".products-item");
  return {
    calculator: parent.querySelector(".calculator"),
    quantity: parent.querySelector(".quantity"),
    productButton: parent.querySelector(".product-button")
  };
}

// переключатель стиля для избежания дубляжа
function toggleProductElement(element, displayValue) {
  element.style.display = displayValue;
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!