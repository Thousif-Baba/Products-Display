const menTabButton = document.getElementById('menTab');
const womenTabButton = document.getElementById('womenTab');
const kidsTabButton = document.getElementById('kidsTab');

const productsContainer = document.getElementById('products');

function changeTab(tab) {
  menTabButton.className = tab === 'men' ? 'tab active' : 'tab';
  womenTabButton.className = tab === 'women' ? 'tab active' : 'tab';
  kidsTabButton.className = tab === 'kids' ? 'tab active' : 'tab';

  fetchProducts(tab);
}

function renderProductCards(products, container) {

  container.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const productImageContainer = document.createElement('div');
    productImageContainer.className = 'product-image-container';

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productImage.className = 'product-image';

    const productBadge = document.createElement('div');
    productBadge.textContent = product.badge_text;
    productBadge.className = "product-badge"

    const productNameContainer = document.createElement("div");
    productNameContainer.className = "product-name-container"

    const productTitle = document.createElement('h3');
    productTitle.textContent = product.title;
    productTitle.className="product-title";

    const productDot = document.createElement("span");
    productDot.className="dot"

    const productVendor = document.createElement('p');
    productVendor.textContent = product.vendor;
    productVendor.className="product-vendor";

    const productPriceContainer = document.createElement("div");
    productPriceContainer.className = "product-price-container";

    const productPrice = document.createElement('p');
    productPrice.textContent = `Rs ${product.price}.00`;
    productPrice.className = "product-price";

    const comparePrice = document.createElement('p');
    comparePrice.textContent = `${product.compare_at_price}.00`;
    comparePrice.className = "compare-price";

    const discountPercent = document.createElement('p');
    const discount = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;
    discountPercent.textContent = `${discount.toFixed(2)}% off`;
    discountPercent.className = "dicount-price";

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.className = 'add-to-cart-btn';

    productImageContainer.appendChild(productImage);
    productImageContainer.appendChild(productBadge);
    productNameContainer.appendChild(productTitle);
    productNameContainer.appendChild(productDot);
    productNameContainer.appendChild(productVendor);
    productPriceContainer.appendChild(productPrice);
    productPriceContainer.appendChild(comparePrice);
    productPriceContainer.appendChild(discountPercent);
    productCard.appendChild(productImageContainer);
    productCard.appendChild(productNameContainer);
    productCard.appendChild(productPriceContainer);
    productCard.appendChild(addToCartButton);

    container.appendChild(productCard);
  });
}


function fetchProducts(tab) {
  fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
      const categories = data.categories;

      const selectedCategory = categories.find(category => category.category_name.toLowerCase() === tab.toLowerCase());

      if (selectedCategory) {
        const products = selectedCategory.category_products;
        renderProductCards(products, productsContainer);
      } else {
        console.error(`Category not found for tab: ${tab}`);
      }
    })
    .catch(error => console.error('Error fetching products:', error));
}

changeTab('men');