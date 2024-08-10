import nodemailer from 'nodemailer'

// El nodemailer se usa para el proceso de recuperar la contraseña

export const sendEmailRecoverPassword = async(email, linkChangePassword) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "juanconvers.legal@gmail.com",
            pass: ""
            // user: varenv.email_user,
            // pass: varenv.email_pass
        }
    })
    
    // Settings del correo
    
    const mailOption = {
        from: "juanconvers.legal@gmail.com", 
        to: email,
        subject: "Recuperación de contraseña",
        text: `Haga click en el siguiente enlace para cambiar su contraseña ${linkChangePassword}`,
        html:
        `
            <div>
                <p>Haga click en el siguiente enlace para cambiar su contraseña: <button></p><a href=${linkChangePassword}>Reestablecer contraseña</a></button>
            </div>
        `   
       }

    // Se envía el email
       transporter.sendMail(mailOption, (error, info) => {
            if(error) {
                console.log("Error al enviar email para reestablecer contraseña")
            } else {
                console.log("Email enviado correctamente", info.response)
            }
       })
}