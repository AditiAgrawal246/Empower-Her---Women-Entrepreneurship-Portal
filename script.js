// script.js

// JavaScript code can be added for interactivity, form validation, AJAX requests, etc.

// Example code for handling form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Fetch input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    // Validate inputs
    // Validate username
    var usernameError = document.getElementById('username-error');
    if (username === '') 
    {
        usernameError.textContent = 'Please enter your username';
        return;
    } 
    else 
    {
        usernameError.textContent = '';
    }
    
    // Validate password
    var passwordError = document.getElementById('password-error');
    if (password === '') {
        passwordError.textContent = 'Please enter your password';
        return;
    } else if(password.length<8){
        passwordError.textContent = 'Password should be atleast 8-characters long';
        return;
    }
    else {
        passwordError.textContent = '';
    }
    
    // Simulate authentication (replace with actual backend authentication)
    if (username === 'admin' && password === 'password') {
        // Authentication successful
        alert('Login successful!');
        // Redirect to dashboard or perform other actions as needed
    } else {
        // Authentication failed
        alert('Invalid username or password. Please try again.');
    }
});

// Implement search functionality on the resource library page
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var searchTerm = document.getElementById('search-input').value.toLowerCase();
    var articles = document.querySelectorAll('.article');
    articles.forEach(function(article) {
        var title = article.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
});

// Create interactive tools on relevant pages
// For example, a budget calculator
document.getElementById('budget-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var income = parseFloat(document.getElementById('income').value);
    var expenses = parseFloat(document.getElementById('expenses').value);
    var savings = income - expenses;
    document.getElementById('savings-result').textContent = '$' + savings.toFixed(2);
});

// Set up discussion forums
// For example, adding a new post
document.getElementById('post-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var postContent = document.getElementById('post-content').value;
    // Code to save the post to the database or display it on the page
});

// Display success stories dynamically
// For example, fetching success stories from an API
fetch('https://api.example.com/success-stories')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Code to display success stories on the page
    })
    .catch(function(error) {
        console.error('Error fetching success stories:', error);
    });

// Implement webinar registration form
document.getElementById('webinar-registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    // Code to handle form submission and send data to the backend for registration
});

// Create feedback form and handle form submission
document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    fetch('http://localhost:3000/submit-feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('feedback-form').reset();
    })
    .catch(error => console.error('Error:', error));
});




// Handle click event for "Buy Now" button
document.querySelectorAll('.buy-now-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const productName = button.getAttribute('data-product-name');
        const productPrice = parseFloat(button.getAttribute('data-product-price'));

        // Call backend API to add product to shopping cart or process payment
        addToCart(productId, productName, productPrice);
    });
});

// Function to add product to shopping cart or process payment (replace with actual backend logic)
function addToCart(productId, productName, productPrice) {
    // Example: Log product details to console
    console.log(`Product ID: ${productId}, Name: ${productName}, Price: $${productPrice}`);

    // Example: Redirect to checkout page
    // window.location.href = 'checkout.html';
}