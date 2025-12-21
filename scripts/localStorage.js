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
  console.log("i am here", wishlist.length);
  if (wishlist.length === 8) {
    alert("You can only save up to 8 wishlist items.");
    return;
  }
  const newItem = {
    name: itemName.value.trim(),
    image: itemImage.value.trim(),
    description: itemDescription.value.trim(),
  };
  wishlist.push(newItem);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  console.log(localStorage.getItem("wishlist"), "localStorage");
}
