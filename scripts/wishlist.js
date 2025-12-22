document.addEventListener("DOMContentLoaded", () => {
  loadWishlist();
  setupModalListeners();
});

/* Load and display wishlist items */
function loadWishlist() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const container = document.getElementById("wishlist-container");

  container.innerHTML = ""; // Clear previous content

  wishlist.forEach((item, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white/10 border border-white/20 rounded-lg p-3 sm:p-4 text-white shadow-lg w-56 sm:w-64 md:w-72 flex-shrink-0 snap-start flex flex-col justify-between hover:shadow-xl transition";
    card.setAttribute("data-index", index);

    card.innerHTML = `
      <div>
        <img src="${item.image}" alt="${item.name}" class="w-full h-40 object-contain rounded-md mb-4" />
        <h2 class="text-xl font-semibold mb-2">${item.name}</h2>
        <p class="text-sm text-gray-300 mb-4 line-clamp-3">${item.description}</p>
      </div>
      <div class="flex gap-2 items-end justify-between" >
        <button type="button" class="cursor-pointer read-more-btn text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-500/50 shadow-md font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none transition flex items-center justify-center gap-2 flex-1" data-index="${index}">
          Read More <span class="text-lg">→</span>
        </button>
        <button type="button" class=" cursor-pointer delete-btn w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500/50 text-white font-bold text-sm flex items-center justify-center focus:outline-none transition flex-shrink-0" data-index="${index}" onClick="deleteWishCard(${index})" title="Delete item" > 
          ✕
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

/* Setup modal event listeners */
function setupModalListeners() {
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Open modal on read more button click
  document.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("read-more-btn") ||
      e.target.parentElement?.classList.contains("read-more-btn")
    ) {
      const btn = e.target.classList.contains("read-more-btn")
        ? e.target
        : e.target.parentElement;
      const index = btn.dataset.index;
      const item = wishlist[index];

      if (item) {
        document.getElementById("modal-title").textContent = item.name;
        document.getElementById("modal-description").textContent =
          item.description;
        modalOverlay.classList.remove("hidden");
      }
    }
  });

  // Close modal
  modalClose.addEventListener("click", () => {
    modalOverlay.classList.add("hidden");
  });

  // Close modal when clicking outside
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.add("hidden");
    }
  });

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalOverlay.classList.add("hidden");
    }
  });
}

/* Delete a wishcard from localStorage and reload display */
function deleteWishCard(index) {
  console.log("deleteWishCard called for index:", index);
  if (confirm("Are you sure you want to delete this item?")) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    loadWishlist();
  }
}
