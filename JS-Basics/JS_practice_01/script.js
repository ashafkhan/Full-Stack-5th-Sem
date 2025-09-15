const textarea = document.getElementById("textInput");
const counter = document.getElementById("charCounter");
const maxLength = textarea.getAttribute("maxlength");

textarea.addEventListener("input", () => {
  const length = textarea.value.length;
  counter.textContent = `${length} / ${maxLength}`;

  if (length >= maxLength) {
    counter.classList.add("exceeded");
  } else {
    counter.classList.remove("exceeded");
  }
});
