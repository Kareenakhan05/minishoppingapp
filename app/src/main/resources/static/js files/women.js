// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Define product categories with 15 women's products
const products = [
  { id: 1, name: 'Women\'s Dress', price: 90.00, image: '/images/women product 1.jpg', category: 'women' },
  { id: 2, name: 'Women\'s Skirt', price: 50.00, image: '/images/women product 2.jpg', category: 'women' },
  { id: 3, name: 'Women\'s Top', price: 30.00, image: '/images/women product 3.jpg', category: 'women' },
  { id: 4, name: 'Women\'s Jacket', price: 120.00, image: '/images/women product 4.jpg', category: 'women' },
  { id: 5, name: 'Women\'s Jeans', price: 70.00, image: '/images/women product 5.jpg', category: 'women' },
  { id: 6, name: 'Women\'s Blouse', price: 45.00, image: '/images/women product 6.jpg', category: 'women' },
  { id: 7, name: 'Women\'s Sweater', price: 85.00, image: '/images/women product 7.jpg', category: 'women' },
  { id: 8, name: 'Women\'s Leggings', price: 40.00, image: '/images/women product 8.jpg', category: 'women' },
  { id: 9, name: 'Women\'s Shorts', price: 35.00, image: '/images/women product 9.jpg', category: 'women' },
  { id: 10, name: 'Women\'s Suit', price: 150.00, image: '/images/women product 10.jpg', category: 'women' },
  { id: 11, name: 'Women\'s Shirt', price: 60.00, image: '/images/women product 11.jpg', category: 'women' },
  { id: 12, name: 'Women\'s Trousers', price: 75.00, image: '/images/women product 12.jpg', category: 'women' },
  { id: 13, name: 'Women\'s Cardigan', price: 95.00, image: '/images/women product 13.jpg', category: 'women' },
  { id: 14, name: 'Women\'s Vest', price: 25.00, image: '/images/women product 14.jpg', category: 'women' },
  { id: 15, name: 'Women\'s Romper', price: 55.00, image: '/images/women product 15.jpg', category: 'women' },
  { id: 16, name: 'Women\'s Gown', price: 56.00, image: '/images/women product 16.jpg', category: 'women' },
  { id: 17, name: 'Women\'s Stylish frock', price: 53.00, image: '/images/women product 17.jpg', category: 'women' },
  { id: 18, name: 'Women\'s Garara', price: 52.00, image: '/images/women product 18.jpg', category: 'women' },
  { id: 19, name: 'Women\'s Stylish Gown', price: 62.00, image: '/images/women product 19.jpg', category: 'women' },
  { id: 20, name: 'Women\'s Patiala suit', price: 32.00, image: '/images/women product 20.jpg', category: 'women' },
  { id: 21, name: 'Women\'s Anarkali Frock', price: 52.00, image: '/images/women product 21.jpg', category: 'women' },
  { id: 22, name: 'Women\'s Stylish comfortable shoes', price: 42.00, image: '/images/women product 22.jpg', category: 'women' },
  { id: 23, name: 'Women\'s Stylish white hills', price: 22.00, image: '/images/women product 23.jpg', category: 'women' },
  { id: 24, name: 'Women\'s black formal sandales', price: 12.00, image: '/images/women product 24.jpg', category: 'women' },


];

// Load Women’s Products into the women product grid
window.onload = function () {
  const womenProductGrid = document.getElementById('women-product-grid');

  // Filter products for women
  const womenProducts = products.filter(p => p.category === 'women');

  // Show women’s products
  womenProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${(product.price * 82).toFixed(2)}</p> <!-- Convert to rupees -->
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    womenProductGrid.appendChild(productCard);
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
      <span>₹${(item.price * 82).toFixed(2)}</span>
      <button onclick="removeFromCart(${index})" class="remove-item-btn">X</button>
    `;
    cartItemsList.appendChild(listItem);
    total += item.price * 82; // Convert to rupees
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

