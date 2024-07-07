const grid = document.querySelector(".grid");

const msnry = new Masonry(grid, {
  // options...
  itemSelector: ".grid-item",
  columnWidth: ".grid-sizer",
  percentPosition: true,
});

msnry.layout();