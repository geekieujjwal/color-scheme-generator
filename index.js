let url =
  "https://www.thecolorapi.com/scheme?hex=20cf2c&mode=monochrome&count=5";

const colorInput = document.getElementById("color-input");
const modeSelector = document.getElementById("mode-selector");
const table = document.getElementById("color-table");
const loader = document.querySelector(".loader");
const row1 = document.getElementById("row1");
const form = document.getElementById("myForm");
const row2 = document.getElementById("row2");

async function getColor() {
  //
  loader.classList.remove("hide"); //Showing Loader
  table.classList.add("hide"); //Hiding Table
  form.removeEventListener("submit", onSubmit);

  const res = await fetch(url);
  const data = await res.json();
  //
  loader.classList.add("hide"); //Hiding Loader
  table.classList.remove("hide"); //Showing Table

  data.colors.forEach((color) => {
    let hexValue = color.hex.value;
    row1.innerHTML += `
        <td style="background-color: ${hexValue}"></td>`;
    row2.innerHTML += `
        <td>${hexValue}
            <i class="fa-regular fa-copy copyIcon"
            onclick = "copyToClipboard('${hexValue}')"></i>
        </td>`;
  });
  form.addEventListener("submit", onSubmit);
}
getColor();

function onSubmit(e) {
  e.preventDefault();
  url = `https://www.thecolorapi.com/scheme?hex=${
    colorInput.value
  }&mode=${modeSelector.value.toLowerCase()}&count=5`.replace("#", "");
  row1.innerHTML = "";
  row2.innerHTML = "";
  getColor();
}

async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
  alert("Copied to clipboard: " + text);
}
