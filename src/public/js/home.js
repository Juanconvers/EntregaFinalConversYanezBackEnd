ocument.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");
    main.classList.remove("flex", "items-center", "justify-center");
    loadProducts();
});

async function loadProducts() {
    try {
      const url = new URL(window.location.href);
      const category = url.searchParams.get("category");
      const search = url.searchParams.get("search");
      let apiUrl = "/api/products";
  
      if (category) {
        apiUrl += `?category=${encodeURIComponent(category)}`;
      }
      if (search) {
        apiUrl += category ? "&" : "?";
        apiUrl += `search=${encodeURIComponent(search)}`;
        currentSearch = search;
      }
  
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data && data.payload && Array.isArray(data.payload)) {
        products = data.payload;
      } else {
        console.error(
          "data format is not valid. Expected an array in payload:",
          data
        );
        products = [];
      }
  
      renderProducts(products);
      updateClearSearchButtonVisibility();
    } catch (error) {
      console.error("Error loading products:", error);
      productGrid.innerHTML =
        "<p class=dark:text-gray-300>Error loading products.</p>";
    }
  }
  

  function renderProducts(productsToRender) {
    if (!Array.isArray(productsToRender)) {
      console.error("renderProducts got an invalid argument:", productsToRender);
      productGrid.innerHTML =
        "<p class=dark:text-gray-300>Error rendering products.</p>";
      return;
    }
  
    if (productsToRender.length === 0) {
      productGrid.innerHTML =
        "<p class=dark:text-gray-300> No products were found.</p>";
      return;
    }
  
    productGrid.innerHTML = productsToRender
      .map(
        (product) => `
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
        <img src="${getFirstValidThumbnail(
          product.thumbnails
        )}" alt="Product image" width="400" height="400" class="rounded-t-lg object-cover w-full h-56" style="aspect-ratio: 400 / 400; object-fit: cover;">
        <div class="p-4 flex flex-col flex-grow">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50">${
            product.title
          }</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-4 flex-grow">${
            product.description
          }</p>
          <div class="flex items-center justify-between mt-auto">
            <span class="text-xl font-bold text-gray-900 dark:text-gray-50">${formatPrice(
              product.price
            )}</span>
            <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 bg-gray-400 text-gray-50 hover:bg-gray-600 dark:bg-primary-400 dark:text-gray-900 dark:hover:bg-primary-500" type="button" onclick="addProductToCart(event, '${
              product._id
            }')">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }


function setupClearSearchButton() {
    const filterButton = document.querySelector("#filter-button");
    if (filterButton) {
      const clearSearchButton = document.createElement("button");
      clearSearchButton.id = "clear-search-button";
      clearSearchButton.className = filterButton.className; // use same classes as filter button
      clearSearchButton.classList.add(
        "dark:text-gray-300",
        "hover:border-red-500"
      );
      clearSearchButton.textContent = "Clear Search";
      clearSearchButton.style.display = "none";
      filterButton.parentNode.insertBefore(clearSearchButton, filterButton);
  
      clearSearchButton.addEventListener("click", clearSearch);
    }
  }
  

  function clearSearch() {
    const url = new URL(window.location.href);
    url.searchParams.delete("search");
    window.history.pushState({}, "", url);
    currentSearch = "";
    const searchInput = document.querySelector(".search-input");
    const pageTitleCategory = document.querySelector("#titleProductsPage");
    pageTitleCategory.textContent = "All Products";
    if (searchInput) {
      searchInput.value = "";
    }
    loadProducts();
  }