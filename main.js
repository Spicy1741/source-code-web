// Initialize users from localStorage or as an empty array
let users = JSON.parse(localStorage.getItem('users')) || [];

// Login form validation
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', username); // Save the username for personalization
            alert(`Welcome back, ${username}!`);
            window.location.href = 'home_page.html';
        } else {
            document.getElementById('error-message').textContent = 'Invalid username or password';
        }
    });
}

// Signup form validation
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('new-username').value.trim();
        const password = document.getElementById('new-password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        if (password !== confirmPassword) {
            document.getElementById('signup-error-message').textContent = 'Passwords do not match';
            return;
        }

        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            document.getElementById('signup-error-message').textContent = 'Username already exists';
            return;
        }

        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users)); // Save users to localStorage
        alert('Signup successful! Please login.');
        window.location.href = 'login.html';
    });
}

// Navbar Login/Logout button management
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        loginBtn.textContent = 'Logout';
        loginBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loggedInUser'); // Clear user-specific data
            alert('You have logged out successfully.');
            window.location.href = 'login.html';
        });
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.setAttribute('href', 'login.html');
    }
}

//cart
// Initialize cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to Cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        // Extract item data from button attributes
        const item = {
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            img: button.dataset.img,
            quantity: 1,
        };

        // Check if item already exists in the cart
        const existingItem = cart.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += 1; // Increment quantity if item exists
        } else {
            cart.push(item); // Add new item to the cart
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${item.name} has been added to your cart!`);
    });
});
// Render cart items on the cart page
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (!cartItemsContainer || !cartTotal) return; // Exit if not on the cart page

    cartItemsContainer.innerHTML = ''; // Clear the container
    let total = 0; // Initialize total price

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${item.img}" alt="${item.name}" style="width: 50px;">
                ${item.name}
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button class="decrease-quantity" data-name="${item.name}">-</button>
                ${item.quantity}
                <button class="increase-quantity" data-name="${item.name}">+</button>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Attach event listeners for quantity controls
    attachQuantityHandlers();
}

// Attach event listeners for quantity controls
function attachQuantityHandlers() {
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', event => {
            const itemName = button.dataset.name;
            const item = cart.find(cartItem => cartItem.name === itemName);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(cartItem => cartItem.name !== itemName); // Remove if quantity is 0
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', event => {
            const itemName = button.dataset.name;
            const item = cart.find(cartItem => cartItem.name === itemName);
            if (item) {
                item.quantity += 1;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });

    // Remove item functionality
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', event => {
            const itemName = button.dataset.name;
            cart = cart.filter(cartItem => cartItem.name !== itemName);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });
}

// Render the cart on page load
document.addEventListener('DOMContentLoaded', renderCart);

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Your form submission logic here

    // Show the popup
    document.getElementById('popup').style.display = 'block';
});

document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // You can add your form validation logic here

    // Simulate form submission
    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Update user's information with the form data
    // You can make an AJAX request to update the user information on the server

    // Show a success message or redirect the user to another page
    alert('Profile updated successfully!');
});

// Add to Cart functionality for all 'add-to-cart' buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        const item = {
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            img: button.dataset.img,
            quantity: 1
        };

        // Check if item already exists in the cart
        const existingItem = cart.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += 1; // Increment quantity if item exists
        } else {
            cart.push(item); // Add new item to the cart
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${item.name} has been added to your cart!`);
    });
});
