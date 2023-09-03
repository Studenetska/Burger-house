document.getElementById("main-action-button").onclick = function () {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" })
}

let links = document.querySelectorAll(".menu-item > a");
for (let i = 0; i < links.length; i++) {
  links[i].onclick = function () {
    document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({ behavior: "smooth" })
  }
}

let burger = document.getElementById("burger");
let name = document.getElementById("name");
let phone = document.getElementById("phone");

const orderNumber = generateOrderNumber();
burger.value = `Номер заказа: ${orderNumber}`;

document.getElementById("order-action").onclick = function () {
  let hasError = false;

  [name, phone].forEach(item => {
    if (!item.value) {
      item.parentElement.style.background = "red";
      hasError = true;
    } else {
      item.parentElement.style.background = "";
    }
  });

  if (!hasError) {
    [name, phone].forEach(item => {
      item.value = "";
    });
    alert("Cпасибо за заказ! Мы скоро с вами свяжемся!");
    location.reload();
    const newOrderNumber = generateOrderNumber();
  }
}

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

let productItems = document.querySelector('.products-items');
// кнопка корзины в меню вверху
let cartCounterLabel = document.querySelector('.cart-counter-label');
// цифирки в меню - счет
let cartItemsCounter = document.querySelector('.cart-items-counter');

// Общий счетчик цены и общий счетчик количества
let cartCounter = 0;
let cartPrice = 0;

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


productItems.addEventListener('click', btnClickHandler);


// переключатель стиля в кнопке  при нажатии
function toggleProductCalculator(button) {
  let elements = getProductElements(button);

  toggleProductElement(elements.calculator, "block");
  toggleProductElement(elements.quantity, "flex");
  toggleProductElement(elements.productButton, "none");


};

function decreaseQuantity(button) {

  let countElement = button.parentNode.querySelector(".count");
  let count = parseInt(countElement.innerText);

  increment(cartCounterLabel, --cartCounter, cartItemsCounter);

  // Проверяем, находится ли кнопка в корзине
  let isInCart = button.closest('.cart-product-main-list') !== null;


  if (isInCart) {
    if (count > 1) {

      let cartProduct = button.closest(".cart-product-main-list");
      let productId = cartProduct.dataset.productId;
      let productsOnPage = document.querySelectorAll('.products-item');

      productsOnPage.forEach((productOnPage) => {
        let productIdOnPage = productOnPage.dataset.productId;
        if (productId === productIdOnPage) {

          let actionProductBtn = productOnPage.querySelector('.products-item-action');

          if (actionProductBtn) {
            let countElementOnPage = actionProductBtn.querySelector('.count');
            let count = +(countElementOnPage.innerText)
            if (count > 0) {
              countElementOnPage.innerText = --count;
            }
          }
        }
      });

      countElement.innerText = count - 1;
    } else {

      let cartProduct = button.closest(".cart-product-main-list");

      cartProduct.remove();

      let productId = cartProduct.dataset.productId;

      let catalogProduct = document.querySelector(`.products-item[data-product-id="${productId}"]`);
      if (catalogProduct) {
        let catalogButton = catalogProduct.querySelector(".product-button");
        let catalogCountElement = catalogButton.parentNode.querySelector(".count");
        catalogCountElement.innerText = 0;

        // чтобы скрывать счет товаров при 0 значении в корзине,кнопка на странице
        let productActionButton = catalogProduct.querySelector('.products-item-action');
        let productOrderButton = catalogProduct.querySelector('button.product-button');
        let productCalculator = productActionButton.querySelector('.quantity.calculator');

        if (productActionButton) {
          toggleProductElement(productCalculator, "none");
          toggleProductElement(productOrderButton, "flex");
        }

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

// для кнопки "+" логика
function increaseQuantity(button) {

  let countElement = button.parentNode.querySelector(".count");
  let count = parseInt(countElement.innerText);
  increment(cartCounterLabel, ++cartCounter, cartItemsCounter);
  countElement.innerText = count + 1;


  // ! запись товара в корзину + цена
  calculateTotalPrice();

  let isInCart = button.closest('.cart-product-main-list') !== null;

  if (isInCart) {
    if (count > 1) {

      let cartProduct = button.closest(".cart-product-main-list");
      let productId = cartProduct.dataset.productId;
      let productsOnPage = document.querySelectorAll('.products-item');

      productsOnPage.forEach((productOnPage) => {
        let productIdOnPage = productOnPage.dataset.productId;
        if (productId === productIdOnPage) {

          let actionProductBtn = productOnPage.querySelector('.products-item-action');

          if (actionProductBtn) {
            let countElementOnPage = actionProductBtn.querySelector('.count');
            let count = +(countElementOnPage.innerText)
            if (count > 0) {
              countElementOnPage.innerText = ++count;
            }
          }
        }
      })
    }
  }

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

  const orderNumberElement = document.getElementById('order-number');
  orderNumberElement.innerText = burger.value;
}

// Функция для генерации уникальных номеров заказов
function generateOrderNumber() {

  // Существет или нет в localStorage номер заказа
  let orderNumber = localStorage.getItem('orderNumber');

  // при условии что заказ не сгенерирован или не является уникальным
  if (!orderNumber || !isUniqueOrderNumber(orderNumber)) {
    // Текущая дата
    const currentDate = new Date();
    // числа определяються до 10000
    const randomNumber = Math.floor(Math.random() * 10000);
    orderNumber = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}-${randomNumber}`;

    // Сохраняю номер заказа в localStorage
    localStorage.setItem('orderNumber', orderNumber);
  }

  return orderNumber;
}

// Проверка на уникальность номера заказа
function isUniqueOrderNumber(orderNumber) {
  // Получаем все ранее использованные номера заказов из localStorage
  const usedOrderNumbers = JSON.parse(localStorage.getItem('usedOrderNumbers')) || [];

  // Проверяем, уникальный ли текущий номер заказа
  if (usedOrderNumbers.includes(orderNumber)) {
    return false; // Номер заказа не уникальный
  }

  // Добавляем текущий номер заказа в список использованных
  usedOrderNumbers.push(orderNumber);

  // Сохраняем обновленный список обратно в localStorage
  localStorage.setItem('usedOrderNumbers', JSON.stringify(usedOrderNumbers));

  return true;

}

// ? ДЛЯ КОРЗИНЫ ЛОГИКА

window.addEventListener('click', function (event) {
  let target = event.target;

  // проверяем был ли сделан клик по кнопке заказать
  if (target.classList.contains('product-button')) {
    // находим родителя этого элемента(те всю карточку)
    let parentProductItem = target.closest(".products-item");
    // console.log(parentProductItem);


    let countElement = target.parentNode.querySelector(".count");
    let count = parseInt(countElement.innerText);

    if (count.innerText !== 0) {
      countElement.innerText = 1;
    }

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


// 1й вариант  - Обновленный обработчик для кнопки "Заказать"
orderBtn.addEventListener('click', () => {
  alert('Ваше замовлення успішно виконано!');
  // налаштувати логіку оплати
  // Очищаем корзину после успешного заказа
  clearCart();
  location.reload();
  const newOrderNumber = generateOrderNumber();
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
