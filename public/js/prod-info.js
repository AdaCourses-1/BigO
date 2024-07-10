function toggleBlock(id) {
  // Находим все блоки с классом "block"
  let blocks = document.querySelectorAll(".block");

  // Удаляем класс "active" у всех блоков
  blocks.forEach(function (block) {
    block.classList.remove("active");
  });

  // Находим выбранный блок по его id и добавляем ему класс "active"
  let selectedBlock = document.getElementById(id);
  if (selectedBlock) {
    selectedBlock.classList.add("active");
  }
}

const buttons = document.querySelectorAll(".prod-info__btn");

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Вызывайте вашу функцию toggleBlock с соответствующим id блока
    switch (index) {
      case 0:
        toggleBlock("block1");
        break;
      case 1:
        toggleBlock("block2");
        break;
      case 2:
        toggleBlock("block3");
        break;
      default:
        break;
    }
  });
});
