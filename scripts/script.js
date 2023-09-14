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
burger.value = `Номер замовлення: ${orderNumber}`;

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
    alert("Дякуємо за замовлення! Ми незабаром з вами зв'яжемося!");
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
    newCurrency = "₴";
    coefficient = 39;
  } else if (currentCurrency === "₴") {
    newCurrency = "£";
    coefficient = 0.021;
  } else if (currentCurrency === '£') {
    newCurrency = '€';
    coefficient = 1.17;
  } else if (currentCurrency === '€') {
    newCurrency = '¥';
    coefficient = 6.9;
  } else if (currentCurrency === "¥") {
    newCurrency = '$';
    coefficient = 1;
  }

  e.target.innerText = newCurrency;

  // Оновляємо ціни для товаров на страниці
  for (let i = 0; i < prices.length; i++) {
    prices[i].innerText = +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(2) + " " + newCurrency;
  }

  // Оновляємо ціни для товарів в кошику
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
  cartTotalAmount.innerText = `Підсумкова вартість: ${total.toFixed(2)} ${currentCurrency}`;
}

let productItems = document.querySelector('.products-items');
// кнопка кошику у меню зверху
let cartCounterLabel = document.querySelector('.cart-counter-label');
// цифирки у меню - рахунок
let cartItemsCounter = document.querySelector('.cart-items-counter');

// спільний лічильник цін та спільний лічильний кількості
let cartCounter = 0;
let cartPrice = 0;

const btnClickHandler = (e) => {
  // делегування на батьківський элемент(поки не буде виконана подія)
  const target = e.target;

  // створюємо зміну для того, щоб відмінити записи з кнопки замовити
  let restoreHTML = null;

  // якщо куди кликаємо не є объектом, то нічего відбуватися не буде
  if (typeof target !== 'object') return

  // для делегування потрібно перевірити куда клікаємо, добаємо умови
  if (!target.matches('.product-button')) return;

  increment(cartCounterLabel, ++cartCounter, cartItemsCounter);

};

// Отримуємо элемент кошику
const cartProductItems = document.querySelector('.cart-product-items');


// Добаємо обробник події клік
cartCounterLabel.addEventListener('click', function (e) {

  const target = e.target;
  // ОТримуємо элемент "cart-items-counter"
  const cartItemsCounter = document.querySelector('.cart-items-counter');

  // Перевіряємо, чи є у элемента класс "has-items"
  if (cartItemsCounter.classList.contains('has-items')) {
    // додаємо /видаляємо класс "active" у секції
    cartProductItems.classList.toggle('active');
  }

});


// щоб мати можливість перенести код на іншу сторінку, винесемо його до функції
function increment($label, cartCn, $itCn) {
  // $ - дом элемент
  $label.querySelector('.cart-items-counter').innerText = cartCn;
  if (cartCn === 1) $itCn.style.display = 'block' && $itCn.classList.add('has-items');
};

// функція вимкнення можливості кликати на замовлення
function disabledControls(target, productItems, btnClickHandler) {
  // захист від зависано, щоб на кнопку мильйон разів тиснути було не можливо
  target.disabled = true;
  // щоб вимкнути элементи поруч при стані не натискання, а саме disabled
  productItems.removeEventListener('click', btnClickHandler);
};

// функція включення можливості клікати на замовленні
function enabledControls(target, productItems, btnClickHandler) {
  // дозволяємо клік на кнопку(певну)
  target.disabled = false;
  // знов вмикаємо можливість купувати на всіх элементах
  productItems.addEventListener('click', btnClickHandler);
};


productItems.addEventListener('click', btnClickHandler);


// перемикач стилю в кнопці  при натисканні
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

  // Перевіряємо,чи знаходиться кнопка у кошику
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

        // щоб скрити рахунок товарів при 0 значенні у кошику,кнопка на сторінці
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

  // ! запис товару до кошику + ціна
  calculateTotalPrice();

  // !
  // Знаходимо найближчого родича з классом ".products-item"
  let cartProduct = button.closest(".products-item");

  // ОТримуємо значення атрибуту "data-product-id" з элемента
  const productId = cartProduct.dataset.productId;

  // Виконуємо оновлення кількості товарів для конкретной карточки
  updateCartItemQuantity(productId, countElement.innerText);

  // захист від великої кількості натискань
  disabledControls(button, cartProduct, btnClickHandler)

  setTimeout(function () {
    enabledControls(button, cartProduct, btnClickHandler);
  }, 1000);


};

// для кнопки "+" логіка
function increaseQuantity(button) {

  let countElement = button.parentNode.querySelector(".count");
  let count = parseInt(countElement.innerText);
  increment(cartCounterLabel, ++cartCounter, cartItemsCounter);
  countElement.innerText = count + 1;


  // ! запис товару до  кошику + ціна
  calculateTotalPrice();

  let isInCart = button.closest('.cart-product-main-list') !== null;

  if (isInCart) {
    if (count > 0) {

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
  // Находимо найближчого родича з классом ".products-item"
  let cartProduct = button.closest(".products-item, .cart-product-main-list");

  // Отримуємо значення атрибуту "data-product-id" з элементу
  const productId = cartProduct.dataset.productId;

  // виконуємо оновлення кількості товарів для конкретноі карточки
  updateCartItemQuantity(productId, countElement.innerText);

  // захист від великої кількості натискань
  disabledControls(button, cartProduct, btnClickHandler)

  setTimeout(function () {
    enabledControls(button, cartProduct, btnClickHandler);
  }, 1000);

};


//  для уникнення дубляжу коду виносимо знаходження змінних
function getProductElements(button) {
  let parent = button.closest(".products-item");
  return {
    calculator: parent.querySelector(".calculator"),
    quantity: parent.querySelector(".quantity"),
    productButton: parent.querySelector(".product-button")
  };
};

// перемикач стилю для уникнення дубляжу коду
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


    // Оновляємо текст цін с рахунком обранної валюти та її коєффіціенту
    let currentCurrency = document.getElementById("change-currency").innerText;
    switch (currentCurrency) {
      case "$":
        break;
      case "₴":
        productBasePrice *= 39;
        break;
      case "£":
        productBasePrice *= 0.021;
        break;
      case "€":
        productBasePrice *= 1.17;
        break;
      case "¥":
        productBasePrice *= 6.9;
        break;
    }

    let price = productBasePrice.toFixed(2);

    // Оновлюємо текст цін у карточці товару у кошику
    priceElement.innerText = price + " " + currentCurrency;

    total += price * count;
  });

  let cartTotalAmount = document.querySelector(".cart-total-amount");
  let currentCurrency = document.getElementById("change-currency").innerText;
  cartTotalAmount.innerText = `Підсумкова вартість: ${total.toFixed(2)} ${currentCurrency}`;

  const orderNumberElement = document.getElementById('order-number');
  orderNumberElement.innerText = burger.value;
}

// Функція для генерації унікальних номерів замовлення
function generateOrderNumber() {

  // Чи існує в localStorage номер замовлення
  let orderNumber = localStorage.getItem('orderNumber');

  // при умові, що замовлення не сгенерировано, чи не является унікальним
  if (!orderNumber || !isUniqueOrderNumber(orderNumber)) {
    // Поточка дата
    const currentDate = new Date();
    // числа надаються до 10000
    const randomNumber = Math.floor(Math.random() * 10000);
    orderNumber = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}-${randomNumber}`;

    // Збережу. номер замовлення в localStorage
    localStorage.setItem('orderNumber', orderNumber);
  }

  return orderNumber;
}

// Перевірка на унікальність номер замовлення
function isUniqueOrderNumber(orderNumber) {
  // Отримуємо всі раніше використані номери замовлень з localStorage
  const usedOrderNumbers = JSON.parse(localStorage.getItem('usedOrderNumbers')) || [];

  // Перевіряемо, унікальність поточного номеру замовлення
  if (usedOrderNumbers.includes(orderNumber)) {
    return false; // Номер замовлення не унікальний
  }

  // Добавляем текущий номер заказа в список использованных
  usedOrderNumbers.push(orderNumber);

  // Сохраняем обновленный список обратно в localStorage
  localStorage.setItem('usedOrderNumbers', JSON.stringify(usedOrderNumbers));

  return true;

}

// ? ДЛЯ Кошику ЛОГіКА

window.addEventListener('click', function (event) {
  let target = event.target;

  // перевіряем чи був зроблен клік по кнопці замовити
  if (target.classList.contains('product-button')) {
    // знаходимо батьків цього элементу(не всю карточку)
    let parentProductItem = target.closest(".products-item");
    // console.log(parentProductItem);


    let countElement = target.parentNode.querySelector(".count");
    let count = parseInt(countElement.innerText);

    if (count.innerText !== 0) {
      countElement.innerText = 1;
    }

    const productInfo = {
      // потрібно в id додати артикул товару поки що его немає
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


  // обробник для кнопки "decrement"
  if (target.classList.contains('decrement')) {
    //Знаходемо батьківську карточку товару
    let productCard = target.closest('.products-item');

    if (productCard) {
      // Лічильник товару
      let countElement = productCard.querySelector('.count');
      let count = parseInt(countElement.innerText);

      // Перевікра, чи рівен лічильник 0
      if (count === 0) {
        // Якщо лічильник рівен 0, то можно викликати функцію видалення товару з кошику
        // ОТримаю id товару
        let productId = productCard.getAttribute('data-product-id');
        //виклик функції видалення товару з кошику
        removeProductFromCart(productId);
      }
    }

  }

});

function removeProductFromCart(productId) {
  // Функція для того, щоб знайти карту товару у уошику по productId та видалити її
  let cartProduct = document.querySelector(`.cart-product-main-list[data-product-id="${productId}"]`);
  if (cartProduct) {
    cartProduct.remove();
  }
}




let actionCartBtn = document.querySelector('.cart-main-actions');
let orderBtn = actionCartBtn.querySelector('button[type="submit"]');


// 1й вариант  - оновленний обробник для кнопки "Заказать"
orderBtn.addEventListener('click', () => {
  alert('Ваше замовлення успішно виконано!');
  // налаштувати логіку оплати
  // Очищаем корзину после успешного заказа
  clearCart();
  location.reload();
  const newOrderNumber = generateOrderNumber();
});

// Функція для видалення з кошику
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
