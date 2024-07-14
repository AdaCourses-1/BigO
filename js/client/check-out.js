const checkElements = document.querySelectorAll(".checkout-info__check");
checkElements.forEach((checkElement) => {
  checkElement.addEventListener("click", function () {
    checkElements.forEach((element) => {
      element.classList.remove("active");
    });

    checkElement.classList.add("active");
  });
});
