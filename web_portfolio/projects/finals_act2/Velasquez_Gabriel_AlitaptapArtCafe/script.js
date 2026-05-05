function placeOrder() {

  const flavorEl = document.getElementById("flavor");
  const flavorPrice = parseInt(flavorEl.value);
  const flavorName = flavorEl.options[flavorEl.selectedIndex].text.split(' -')[0];
  const sizeEl = document.querySelector('input[name="size"]:checked');
  const sizePrice = parseInt(sizeEl.value);
  const sizeName = sizeEl.parentElement.textContent.trim().split(' (')[0];

  const addonEls = document.querySelectorAll(".addon:checked");
  let addonTotal = 0;
  let addonNames = [];

  addonEls.forEach(addon => {
    addonTotal += parseInt(addon.value);
    addonNames.push(addon.parentElement.textContent.trim().split(' (')[0]);
  });

  const total = flavorPrice + sizePrice + addonTotal;
  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");
  
  resultDiv.innerHTML = `
    <strong>Order Summary:</strong><br>
    Flavor: ${flavorName}<br>
    Size: ${sizeName}<br>
    Add-ons: ${addonNames.length > 0 ? addonNames.join(", ") : "None"}<br>
    <hr>
    <strong>Total Price: ₱${total}</strong>
  `;
}