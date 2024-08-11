
const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (!email || !password) {
    try {
        const response = await fetch('/api/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        })

        if (!response.ok) {
            return(error);
        }
        const data = await response.json()
        
        console.log("DATA: LOGIN: ", data)

            console.log("Token:", data.token)
            console.log("Role:", data.role)
            console.log("cartId:", data.cartId)
            
        if (data.token && data.role && data.cartId) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('role', data.role)
            localStorage.setItem('cartId', data.cartId)

            const cartResponse = await fetch(`/api/cart/${data.cartId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.token}`
                }
            })

            if (!cartResponse.ok) {
                console.error('Error al obtener el carrito')
            } else {
                const cartData = await cartResponse.json()
                console.log('Datos del carrito:', cartData)
            } return (() => {

                if (data.role === 'Admin') {
                    window.location.href = '/adminPanel' 
                    console.log('Logeaste como Admin man')
                } else {
                    window.location.href = '/home'
                }
            })
            } else {
                console.log("Faltan datos: token, rol o cartId no están presentes")
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }
})
