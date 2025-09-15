const filter = document.getElementById("categoryFilter");
const products = document.querySelectorAll(".product");

filter.addEventListener("change", () => {
  const selected = filter.value;

  products.forEach(product => {
    const category = product.getAttribute("data-category");

    if (selected === "all" || category === selected) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});
