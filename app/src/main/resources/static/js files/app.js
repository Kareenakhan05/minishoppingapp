let cart = [];

// Generate 54 products dynamically
const products = [];
for (let i = 1; i <= 54; i++) {
  products.push({
    id: i,
    name: `My Store Product ${i}`,
    price: parseFloat((Math.random() * 100).toFixed(2)), // Price in rupees
    image: `/images/product${i}.jpg`
  });
}

// Load Products into the product grid
document.addEventListener('DOMContentLoaded', function () {
  const productGrid = document.getElementById('product-grid');

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${(product.price * 82).toFixed(2)}</p> <!-- Convert to rupees -->
      <button onclick="addToCart(${product.id})">Add to Cart</button>
       <button id="trybutton" onclick="setProductForTryItNow(${product.id}, '${product.image}')">Try It Now</button>
    `;
    productGrid.appendChild(productCard);
  });
});
let selectedProduct = null;

// Set the product image to be used for "Try It Now"
function setProductForTryItNow(productId, productImage) {
  selectedProduct = {
    id: productId,
    image: productImage
  };
  
  // Set the product image in the modal
  const productImageContainer = document.getElementById('product-image-container');
  productImageContainer.innerHTML = `<img src="${productImage}" alt="Product Image" id="modalProductImage" />`;

  document.getElementById('try-it-now-section').style.display = 'flex'; // Show modal
}

function closeTryItNow() {
  document.getElementById('try-it-now-section').style.display = 'none'; // Hide modal
}
function processImages() {
  if (!selectedProduct) {
    alert('Please select a product to try.');
    return;
  }

  const userImageInput = document.getElementById('userImage');
  if (userImageInput.files.length === 0) {
    alert('Please upload your image.');
    return;
  }

  const userImageFile = userImageInput.files[0];
  const formData = new FormData();
  formData.append('userImage', userImageFile);
  formData.append('productImageUrl', selectedProduct.image); // Use selected product image

  fetch('/api/process_images', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.resultImageUrl) {
      document.getElementById('resultImage').src = data.resultImageUrl;
      document.getElementById('result-container').style.display = 'block'; // Show result
      closeTryItNow();
    } else {
      alert('Image processing failed. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while processing the images. Please try again.');
  });
}

function closeTryItNow() {
  document.getElementById('try-it-now-section').style.display = 'none';
}






// Add to Cart Functionality
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCartCount();
  showNotification(`${product.name} added to cart!`);
}

// Update Cart Count in Navbar
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.innerText = cart.length;
}

// Show Cart Modal
document.getElementById('cart').addEventListener('click', function(event) {
  event.preventDefault();
  showCart();
});

function showCart() {
  const cartModal = document.getElementById('cart-modal');
  const cartItems = document.getElementById('cart-items');
  const totalAmount = document.getElementById('total-amount');

  cartItems.innerHTML = '';

  let total = 0;
  cart.forEach((item, index) => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      ${item.name} - ₹${(item.price * 82).toFixed(2)}
      <button onclick="removeFromCart(${index})">X</button>
    `;
    cartItems.appendChild(cartItem);
    total += item.price * 82;
  });

  totalAmount.innerText = `Total: ₹${total.toFixed(2)}`;

  cartModal.style.display = 'flex';
}

// Remove Item from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  showCart();
  updateCartCount();
}

// Close Cart Modal
document.getElementById('close-cart-btn').addEventListener('click', function() {
  document.getElementById('cart-modal').style.display = 'none';
});

// Checkout Process: Delivery, Payment, Place Order

let deliveryInfo = {};
let paymentMethod = '';

function goToDelivery() {
  document.getElementById('cart-modal').style.display = 'none';
  document.getElementById('delivery-form').style.display = 'block';
}

function goToPayment() {
  deliveryInfo.name = document.getElementById('name').value.trim();
  deliveryInfo.address = document.getElementById('address').value.trim();
  deliveryInfo.pincode = document.getElementById('pincode').value.trim();
  deliveryInfo.mobile = document.getElementById('mobile').value.trim();

  if (deliveryInfo.name && deliveryInfo.address && deliveryInfo.pincode && deliveryInfo.mobile) {
    document.getElementById('delivery-form').style.display = 'none';
    document.getElementById('payment-method').style.display = 'block';
  } else {
    alert("Please fill in all fields.");
  }
}
// Show the Place Your Order button immediately after choosing a payment method
function showPlaceOrder() {
  paymentMethod = document.getElementById('payment-options').value;

  if (!paymentMethod) {
    alert('Please select a payment method.');
    return;
  }

  // Hide payment method section and show the Place Your Order button only in the modal
  document.getElementById('payment-method').style.display = 'block';
  document.getElementById('place-order-section').style.display = 'none'; // Ensure it's hidden if it was used previously
}

// Place Order Functionality
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
