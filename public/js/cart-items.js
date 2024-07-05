let cartItems = [
  {
    id: 1,
    name: "Asgaard sofa",
    price: 49900,
    count: 2,
    imageUrl:
      "https://c0.klipartz.com/pngpicture/669/62/gratis-png-sofa-muebles-salon-minimalismo-viento-nordico-material-de-tres-sofas.png",
  },
  {
    id: 2,
    name: "Али Софа",
    price: 19900,
    count: 3,
    imageUrl:
      "https://c0.klipartz.com/pngpicture/867/598/gratis-png-sofa-de-sofa-sofa-cama-publicidad-exterior-material-del-sofa.png",
  },
  {
    id: 3,
    name: "Олег Шкафостайл",
    price: 9900,
    count: 19,
    imageUrl:
      "https://www.pngall.com/wp-content/uploads/12/Wardrobe-Furniture-PNG-Images-HD.png",
  },
]; // Наши товары которые будут показывается в корзине

const cartWrapper = document.getElementById("cart-modal__items"); // ГДЕ, в каком блоке появятся товары

cartItems.forEach((item) => {
  // Проходимся по всем товарам
  const cartItem = document.createElement("div"); // Создаем новый пустой div

  cartItem.className = "cart-modal__item"; // Даём этому div класс cart-modal__item
  cartItem.id = item.id; // Даём этому div его уникальное id

  // Вносим в этот div верстку товара + делаем интерполяцию строк
  cartItem.innerHTML = `<img class="cart-modal__image" src="${item.imageUrl}" alt="${item.name}">
                        <div class="cart-modal__info">
                            <h4 class="cart-modal__subtitle">${item.name}</h4>
                            <div class="cart-modal__details"> <span class="cart-modal__count">${item.count}</span><span
                                class="cart-modal__multiply">X</span><span class="cart-modal__price">${item.price} ⃀</span></div>
                        </div><img class="cart-modal__close" src="./img/close.svg" alt="">`;

  cartWrapper.innerHTML += cartItem.outerHTML; // Создаем товар в html внутри блока cartWrapper
});

// Даная функция вычесляет итоговую сумму товаров
function getTotalSum() {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0); // Проходимся циклом и собираем все поля price в итоговую сумму
  const totalPriceBlock = document.querySelector(".cart-modal__sum"); // Выбираем в каком элемент его показывать в HTML

  totalPriceBlock.innerHTML = `${totalPrice} ⃀`; // рисуем итоговую цену в сомах
}

function setRemoveActions() {
  const cartItemsHTML = document.querySelectorAll(".cart-modal__item"); // Получаем из HTML все созданные товары

  cartItemsHTML.forEach((item) => {
    // Проходимся по всем товарам
    item.addEventListener("click", (event) => {
      // Каждому товару добавляем событие клика
      if (event.target.className.includes("cart-modal__close")) {
        // Если мы нажали на иконку закрытия с классом close

        // То удали из массива выбранный товар
        cartItems = cartItems.reduce((acc, element) => {
          if (element.id === Number(item.id)) {
            return acc;
          }

          return [...acc, element];
        }, []);

        // Перевычесли итоговую сумму
        getTotalSum();

        // Удали товар из HTML
        item.remove();
      }
    });
  });
}

setRemoveActions();
getTotalSum();



