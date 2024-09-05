// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Define product categories with 15 stationary products
const products = [
  { id: 1, name: 'Notebook', price: 150.00, image: '/images/stationary1.jpg', category: 'Stationary' },
  { id: 2, name: 'Pen Set', price: 80.00, image: '/images/stationary2.jpg', category: 'Stationary' },
  { id: 3, name: 'Pencil Box', price: 120.00, image: '/images/stationary3.jpg', category: 'Stationary' },
  { id: 4, name: 'Sketchbook', price: 200.00, image: '/images/stationary4.jpg', category: 'Stationary' },
  { id: 5, name: 'Highlighter Set', price: 300.00, image: '/images/stationary5.jpg', category: 'Stationary' },
  { id: 6, name: 'Eraser Pack', price: 50.00, image: '/images/stationary6.jpg', category: 'Stationary' },
  { id: 7, name: 'Stapler', price: 100.00, image: '/images/stationary7.jpg', category: 'Stationary' },
  { id: 8, name: 'File Folder', price: 180.00, image: '/images/stationary8.jpg', category: 'Stationary' },
  { id: 9, name: 'Sharpener', price: 40.00, image: '/images/stationary9.jpg', category: 'Stationary' },
  { id: 10, name: 'Ruler Set', price: 90.00, image: '/images/stationary10.jpg', category: 'Stationary' },
  { id: 11, name: 'Drawing Kit', price: 500.00, image: '/images/stationary11.jpg', category: 'Stationary' },
  { id: 12, name: 'Calculator', price: 350.00, image: '/images/stationary12.jpg', category: 'Stationary' },
  { id: 13, name: 'Glue Stick', price: 30.00, image: '/images/stationary13.jpg', category: 'Stationary' },
  { id: 14, name: 'Scissors', price: 150.00, image: '/images/stationary14.jpg', category: 'Stationary' },
  { id: 15, name: 'Paper Clips', price: 25.00, image: '/images/stationary15.jpg', category: 'Stationary' },
  { id: 16, name: 'colorful chart papers', price: 25.00, image: '/images/stationary16.webp', category: 'Stationary' },
  { id: 17, name: 'Diary set', price: 25.00, image: '/images/stationary17.jpg', category: 'Stationary' },
  { id: 18, name: 'Stylish pen', price: 25.00, image: '/images/stationary18.jpg', category: 'Stationary' },
  { id: 19, name: 'Correction Pen set', price: 25.00, image: '/images/stationary19.jpg', category: 'Stationary' },
  { id: 20, name: 'Glitter pen set', price: 250.00, image: '/images/stationary20.jpg', category: 'Stationary' },
  { id: 21, name: 'Pack of 12 Stress Ball', price: 300.00, image: '/images/stationary21.jpg', category: 'Stationary' },
  { id: 22, name: 'Lightening Lamp for night', price: 350.00, image: '/images/stationary22.jpg', category: 'Stationary' },
  { id: 23, name: 'Poster Colors Pack of 15', price: 200.00, image: '/images/stationary23.jpg', category: 'Stationary' },
  { id: 24, name: 'Stylish Globe for desk', price: 699.00, image: '/images/stationary24.jpg', category: 'Stationary' }
];

// Load Stationary Products into the stationary product grid
window.onload = function () {
  const stationaryProductGrid = document.getElementById('stationary-product-grid');

  // Filter products for Stationary
  const stationaryProducts = products.filter(p => p.category === 'Stationary');

  // Show Stationary products
  stationaryProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${(product.price).toFixed(2)}</p> <!-- Price in rupees -->
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    stationaryProductGrid.appendChild(productCard);
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

