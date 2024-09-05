// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Define product categories with 15 Men's products
const products = [
  { id: 1, name: 'Men\'s Paint shirt set', price: 90.00, image: '/images/men product 1.jpg', category: 'Men' },
  { id: 2, name: 'Pack of 4 Shirts', price: 50.00, image: '/images/Men product 2.jpg', category: 'Men' },
  { id: 3, name: 'Men\'s Stylish black and white shirt', price: 30.00, image: '/images/Men product 3.jpg', category: 'Men' },
  { id: 4, name: 'Men\'s Stylish grey t-shirt', price: 120.00, image: '/images/Men product 4.jpg', category: 'Men' },
  { id: 5, name: 'Men\'s Stylish White shirt', price: 70.00, image: '/images/Men product 5.jpg', category: 'Men' },
  { id: 6, name: 'Pack of 6 different t-shirts', price: 45.00, image: '/images/Men product 6.jpg', category: 'Men' },
  { id: 7, name: 'Men\'s Jeans', price: 85.00, image: '/images/Men product 7.jpg', category: 'Men' },
  { id: 8, name: 'Men\'s Pack of 4 jeans', price: 40.00, image: '/images/Men product 8.jpg', category: 'Men' },
  { id: 9, name: 'Stylish black leather jacket', price: 35.00, image: '/images/Men product 9.jpg', category: 'Men' },
  { id: 10, name: 'Men\'s Jacket', price: 150.00, image: '/images/Men product 10.jpg', category: 'Men' },
  { id: 11, name: 'Men\'s Stylish hoodeed', price: 60.00, image: '/images/Men product 11.jpg', category: 'Men' },
  { id: 12, name: 'Men\'s Stylish Denim', price: 75.00, image: '/images/Men product 12.jpg', category: 'Men' },
  { id: 13, name: 'Men\'s grey denim', price: 95.00, image: '/images/Men product 13.jpg', category: 'Men' },
  { id: 14, name: 'Men\'s Sweater', price: 25.00, image: '/images/Men product 14.jpg', category: 'Men' },
  { id: 15, name: 'Stylish black kurta', price: 55.00, image: '/images/Men product 15.jpg', category: 'Men' },
  { id: 16, name: 'Men\'s Kurta set', price: 56.00, image: '/images/Men product 16.jpg', category: 'Men' },
  { id: 17, name: 'Men\'s Stylish 3 set of suit', price: 53.00, image: '/images/Men product 17.jpg', category: 'Men' },
  { id: 18, name: 'Men\'s Brown suit', price: 52.00, image: '/images/Men product 18.jpg', category: 'Men' },
  { id: 19, name: 'Men\'s Stylish comfortable lowers', price: 32.00, image: '/images/Men product 19.jpg', category: 'Men' },
  { id: 20, name: 'Men\'s Black Cargo', price: 42.00, image: '/images/Men product 20.jpg', category: 'Men' },
  { id: 21, name: 'Men\'s Set of 3 Trouser', price: 52.00, image: '/images/Men product 21.jpg', category: 'Men' },
  { id: 22, name: 'Men\'s Stylish shoes', price: 44.00, image: '/images/Men product 22.jpg', category: 'Men' },
  { id: 23, name: 'Men\'s Formal shoes', price: 32.00, image: '/images/Men product 23.jpg', category: 'Men' },
  { id: 24, name: 'Men\'s Stylish formal shoes', price: 46.00, image: '/images/Men product 24.jpg', category: 'Men' }
];

// Load Men’s Products into the Men product grid
window.onload = function () {
  const MenProductGrid = document.getElementById('men-product-grid');

  // Filter products for Men
  const MenProducts = products.filter(p => p.category === 'Men');

  // Show Men’s products
  MenProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${(product.price * 82).toFixed(2)}</p> <!-- Convert to rupees -->
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    MenProductGrid.appendChild(productCard);
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

