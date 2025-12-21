document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wishlist-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemName = document.getElementById("item-name");
    const itemImage = document.getElementById("item-image");
    const itemDescription = document.getElementById("item-description");
    localStorage.setItem("wishlistSubmitted", "true");
    localStorage.setItem("itemName", itemName.value);
    localStorage.setItem("itemImage", itemImage.value);
    localStorage.setItem("itemDescription", itemDescription.value);
    form.submit();
  });
});
