document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wishlist-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    saveToLocalStorage();
  });
});

function saveToLocalStorage() {
  const itemName = document.getElementById("item-name");
  const itemImage = document.getElementById("item-image");
  const itemDescription = document.getElementById("item-description");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!itemName.value.trim()) {
    document.getElementById("name-error").classList.remove("hidden");
    return;
  } else {
    document.getElementById("name-error").classList.add("hidden");
  }
  if (
    itemImage.value.startsWith("http://") ||
    itemImage.value.startsWith("https://")
  ) {
    document.getElementById("image-error").classList.add("hidden");
  } else {
    console.log("invalid image url");
    document.getElementById("image-error").classList.remove("hidden");
    return;
  }
  if (wishlist.length === 8) {
    document.getElementById("inventory-full").classList.remove("hidden");
    return;
  } else {
    document.getElementById("inventory-full").classList.add("hidden");
  }
  const newItem = {
    name: itemName.value.trim(),
    image: itemImage.value.trim(),
    description: itemDescription.value.trim(),
  };
  wishlist.push(newItem);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  showSuccessModal();
}

function showSuccessModal() {
  const modal = document.getElementById("success-modal");
  modal.classList.remove("hidden");
}

function closeSuccessModal() {
  const modal = document.getElementById("success-modal");
  modal.classList.add("hidden");
  document.getElementById("wishlist-form").reset();
}
