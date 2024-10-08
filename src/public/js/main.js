
const socket = io()

const chatBox = document.getElementById('chatBox')
const messageLogs = document.getElementById('messageLogs')
let user

Swal.fire({
    title: "Inicio de Sesion",
    input: "text",
    text: "Por favor ingrese su nombre de usuario para continuar",
    inputValidator: (valor) => {
        return !valor && 'Ingrese un valor valido'
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
})


checkBox.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        if (checkBox.value.trim().length > 0){ 
            socket.emit('mensaje', { usuario: user, mensaje: chatBox.value, hora: new Date().toLocaleTimeString()})
            chatBox.value = '' //Limpio el chatBox
        } 
    }
})

socket.on('mensajeLogs', info => {
    messageLogs.innerHTML = ''
    info.forEach(mensaje => {
        messageLogs.innerHTML += `<p><strong>${mensaje.usuario} dice: </strong>: ${mensaje.mensaje}. ${mensaje.hora}</p>`
    });
})


// const socket = io()

// socket.emit('movimiento', "Ca7")

// socket.emit('rendirse', "Me he rendido")

// socket.on('mensaje-jugador', info => {
//     console.log(info)
// })

// socket.on('rendicion', info => {
//     console.log(info)
// })