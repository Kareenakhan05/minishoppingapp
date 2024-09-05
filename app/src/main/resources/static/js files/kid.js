// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Define product categories with 18 Kid's products
const products = [
  { id: 1, name: 'Kid\'s Dress', price: 90.00, image: '/images/kid product 1.jpg', category: 'Kid' },
  { id: 2, name: 'Girl\'s S tylish floral frock', price: 50.00, image: '/images/Kid product 2.jpg', category: 'Kid' },
  { id: 3, name: 'Kid\'s Pack of two summer frocks', price: 30.00, image: '/images/Kid product 3.jpg', category: 'Kid' },
  { id: 4, name: 'Kid\'s set of suit', price: 120.00, image: '/images/Kid product 4.jpg', category: 'Kid' },
  { id: 5, name: 'Kid\'s 3 pieces suit for boy', price: 70.00, image: '/images/Kid product 5.jpg', category: 'Kid' },
  { id: 6, name: 'Kid\'s Kurta set', price: 45.00, image: '/images/Kid product 6.jpg', category: 'Kid' },
  { id: 7, name: 'Kid\'s hoodded jacket', price: 85.00, image: '/images/Kid product 7.jpg', category: 'Kid' },
  { id: 8, name: 'Kid\'s Pack of 3 Winter jackets', price: 40.00, image: '/images/Kid product 8.jpg', category: 'Kid' },
  { id: 9, name: 'Kid\'s Stylish top for baby girls', price: 35.00, image: '/images/Kid product 9.jpg', category: 'Kid' },
  { id: 10, name: 'Kid\'s Stylish off shoulder top for girl', price: 150.00, image: '/images/Kid product 10.jpg', category: 'Kid' },
  { id: 11, name: 'Kid\'s Night suit set for boy and girl', price: 60.00, image: '/images/Kid product 11.jpg', category: 'Kid' },
  { id: 12, name: 'Kid\'s Night suit ', price: 75.00, image: '/images/Kid product 12.jpg', category: 'Kid' },
  { id: 13, name: 'Kid\'s Night suit for girl', price: 95.00, image: '/images/Kid product 13.jpg', category: 'Kid' },
  { id: 14, name: 'Kid\'s Cute dress for new born baby', price: 25.00, image: '/images/Kid product 14.jpg', category: 'Kid' },
  { id: 15, name: 'Kid\'s Pack of 2 dress set for new born baby', price: 55.00, image: '/images/Kid product 15.jpg', category: 'Kid' },
  { id: 16, name: 'Kid\'s Two in one piece', price: 56.00, image: '/images/Kid product 16.jpg', category: 'Kid' },
  { id: 17, name: 'Kid\'s Pack of 2 winter dress ', price: 53.00, image: '/images/Kid product 17.jpg', category: 'Kid' },
  { id: 18, name: 'Kid\'s Night suit for baby girl and boy', price: 52.00, image: '/images/Kid product 18.jpg', category: 'Kid' },
  { id: 19, name: 'Kid\'s Hooded Blanket', price: 41.00, image: '/images/Kid product 19.jpg', category: 'Kid' },
  { id: 20, name: 'Kid\'s Stylish suit for girls', price: 52.00, image: '/images/Kid product 20.webp', category: 'Kid' },
  { id: 21, name: 'Kid\'s Jacket set of 2 items', price: 64.00, image: '/images/Kid product 21.jpg', category: 'Kid' },
  { id: 22, name: 'Kid\'s Stylish denim shoes for girl and boy', price: 22.00, image: '/images/Kid product 22.jpg', category: 'Kid' },
  { id: 23, name: 'Kid\'s  Strap Shoes for girls', price: 12.00, image: '/images/Kid product 23.jpg', category: 'Kid' },
  { id: 24, name: 'Kid\'s Shoes for boys', price: 13.00, image: '/images/Kid product 24.jpg', category: 'Kid' }
];

// Load Kid’s Products into the Kid product grid
window.onload = function () {
  const kidProductGrid = document.getElementById('kid-product-grid');

  // Filter products for Kid category
  const kidProducts = products.filter(p => p.category === 'Kid');

  // Show Kid’s products
  kidProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${(product.price * 82).toFixed(2)}</p> <!-- Convert to rupees -->
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    kidProductGrid.appendChild(productCard);
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

