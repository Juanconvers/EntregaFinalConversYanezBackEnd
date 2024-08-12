const registerForm = document.getElementById('registerForm')

registerForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const first_name = document.getElementById('first_name').value
    const last_name = document.getElementById('last_name').value
    const email = document.getElementById('email').value
    const age = parseInt(document.getElementById('age').value)
    const password = document.getElementById('password').value

    fetch("/api/session/register", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        // Datos a JSON
        body: JSON.stringify({ first_name, last_name, password, email, age }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Respuesta Not OK')
        }
        return response.json()
    })
    .then(data => {
        console.log("Resultado:", data)
        return (() => {
            window.location.href = '/login'
        })
    })
    .catch(error => {
        console.error('Error:', error)
    });
});