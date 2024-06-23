// Client/register.js

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    const message = await response.text();
    alert(message);
    window.location.href = '/index.html'; 
});
