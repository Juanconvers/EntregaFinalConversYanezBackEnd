
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('/api/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            console.log(response.json())
            const result = await response.json();
            document.getElementById('error').textContent = result.message;
        } else {
            console.log("entramos al ELSE")
            const result = await response.json();
            if (result.role === "Admin") {
                window.location.href = '/adminPanel';
            } else {
                window.location.href = '/home';
            }
        }
    } catch (error) {
        document.getElementById('error').textContent = "Datos erroneos";
    }
})
