// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Define product categories with 15 jewelry products
const products = [
  { id: 1, name: 'Gold Necklace', price: 30000.00, image: '/images/jewelry1.jpg', category: 'Jewelry' },
  { id: 2, name: 'Stylish pearl chain', price: 45000.00, image: '/images/jewelry2.jpg', category: 'Jewelry' },
  { id: 3, name: 'Stylish pearl pendant', price: 12000.00, image: '/images/jewelry3.jpg', category: 'Jewelry' },
  { id: 4, name: 'Diamond Necklace with earings', price: 9000.00, image: '/images/jewelry4.jpg', category: 'Jewelry' },
  { id: 5, name: 'Pearl necklace', price: 22000.00, image: '/images/jewelry5.jpg', category: 'Jewelry' },
  { id: 6, name: 'Platinum Stylish Necklace', price: 35000.00, image: '/images/jewelry6.jpg', category: 'Jewelry' },
  { id: 7, name: 'Golden Bracelet', price: 18000.00, image: '/images/jewelry7.jpg', category: 'Jewelry' },
  { id: 8, name: 'Silver Bracelet', price: 40000.00, image: '/images/jewelry8.jpg', category: 'Jewelry' },
  { id: 9, name: 'Silver latent cross pendant', price: 15000.00, image: '/images/jewelry9.jpg', category: 'Jewelry' },
  { id: 10, name: 'Stylish platinum laten cross pendant', price: 50000.00, image: '/images/jewelry10.jpg', category: 'Jewelry' },
  { id: 11, name: 'Platinium ring', price: 24000.00, image: '/images/jewelry11.jpg', category: 'Jewelry' },
  { id: 12, name: 'Diamond Ring', price: 30000.00, image: '/images/jewelry12.jpg', category: 'Jewelry' },
  { id: 13, name: 'Stylish diamond ring', price: 28000.00, image: '/images/jewelry13.jpg', category: 'Jewelry' },
  { id: 14, name: 'Platinium rings for couples', price: 1000.00, image: '/images/jewelry14.jpg', category: 'Jewelry' },
  { id: 15, name: 'Stylish Platinium Pendant for couples', price: 2000.00, image: 'images/jewelry15.jpg', category: 'Jewelry' },
  { id: 16, name: 'Golden Earings', price: 4200.00, image: '/images/jewelry16.jpg', category: 'Jewelry' },
  { id: 17, name: 'Silver Leaves style earings', price: 200.00, image: '/images/jewelry17.jpg', category: 'Jewelry' },
  { id: 18, name: 'Golden Ankel jewelry', price: 42000.00, image: '/images/jewelry18.jpg', category: 'Jewelry' },
  { id: 19, name: 'Silver earings sets', price: 2000.00, image: '/images/jewelry19.jpg', category: 'Jewelry' },
  { id: 20, name: 'Silver tops set', price: 100.00, image: '/images/jewelry20.jpg', category: 'Jewelry' },
  { id: 21, name: 'Golden Ankel jewelry', price: 4200.00, image: '/images/jewelry21.jpg', category: 'Jewelry' },
  { id: 22, name: 'Set Of 2 Stylish watch', price: 2500.00, image: '/images/jewelry22.jpg', category: 'Jewelry' },
  { id: 23, name: 'Stylish Watch with bracelet', price: 3000.00, image: '/images/jewelry23.jpg', category: 'Jewelry' },
  { id: 24, name: 'Smart Watch for girls', price: 45000.00, image: '/images/jewelry24.jpg', category: 'Jewelry' }
];

// Load Jewelry Products into the jewelry product grid
window.onload = function () {
  const jewelryProductGrid = document.getElementById('jewellery-product-grid');

  // Filter products for Jewelry
  const jewelryProducts = products.filter(p => p.category === 'Jewelry');

  // Show Jewelry products
  jewelryProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${(product.price).toFixed(2)}</p> <!-- Price in rupees -->
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    jewelryProductGrid.appendChild(productCard);
  });

  // Add event listener to the cart icon
  const cartIcon = document.getElementById('cart-icon');
  cartIcon.addEventListener('click', showCart);
};

// Add to Cart Functionality
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!cart) cart = [];
  cart.push(product);
  saveCart();
  updateCartCount();
  showNotification(`${product.name} added to cart!`);
}

// Save cart to local storage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart Count in Navbar
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.innerText = (JSON.parse(localStorage.getItem('cart')) || []).length;
  }
}

// Show Cart Modal
function showCart() {
  const cartModal = document.getElementById('cart-modal');
  const cartItemsList = document.getElementById('cart-items');
  const totalAmount = document.getElementById('total-amount');

  // Clear previous items
  cartItemsList.innerHTML = '';

  // Calculate total amount
  let total = 0;

  // Display cart items
  cart.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <span>${item.name}</span>
      <span>₹${(item.price).toFixed(2)}</span>
      <button onclick="removeFromCart(${index})" class="remove-item-btn">X</button>
    `;
    cartItemsList.appendChild(listItem);
    total += item.price;
  });

  totalAmount.innerText = `Total: ₹${total.toFixed(2)}`;
  cartModal.style.display = 'block';
}

// Remove Item from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  showCart(); // Update cart display
}

// Close Cart Modal
document.getElementById('close-cart-btn').addEventListener('click', function() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = 'none';
});


let deliveryInfo = {};
let paymentMethod = '';

function goToDelivery() {
  document.getElementById('cart-modal').style.display = 'none';
  document.getElementById('delivery-form').style.display = 'block';
}

function goToPayment() {
  deliveryInfo.name = document.getElementById('name').value;
  deliveryInfo.address = document.getElementById('address').value;
  deliveryInfo.pincode = document.getElementById('pincode').value;
  deliveryInfo.mobile = document.getElementById('mobile').value;

  if (deliveryInfo.name && deliveryInfo.address && deliveryInfo.pincode && deliveryInfo.mobile) {
    document.getElementById('delivery-form').style.display = 'none';
    document.getElementById('payment-method').style.display = 'block';
  } else {
    alert("Please fill in all fields.");
  }
}

function showPlaceOrder() {
  paymentMethod = document.getElementById('payment-options').value;
  document.getElementById('payment-method').style.display = 'none';
  document.getElementById('place-order').style.display = 'block';
}



function placeOrder() {
  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  const orderDetails = {
    cartItems: JSON.stringify(cart),  // Send cart as a JSON string
    name: deliveryInfo.name,
    address: deliveryInfo.address,
    pincode: deliveryInfo.pincode,
    mobile: deliveryInfo.mobile,
    paymentMethod: paymentMethod
  };

  fetch('/api/orders/place_order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderDetails)
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Order placed successfully!') {
      window.location.href = '/api/orders/confirmation'; // Redirect to confirmation page
    } else {
      alert('Failed to place order.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while placing the order.');
  });
}





// Show Notification Function
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.innerText = message;
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}
