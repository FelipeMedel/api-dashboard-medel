"use strict";
const  nodemailer = require('nodemailer');

export class SendEmail {
    
    async sendEmail(emailTo: string, subject: string, type: number) {
        /*
            Enviar Email
            params: 
                emailTo = email donde se envia
                subject = asunto del email
                type = tipo de mensaje o contenido
        */ 
        const transporter = nodemailer.createTransport({
            debug: true,
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'email_is_here',
                pass: 'password_is_here'
            }
        });

        const html = `<html lang="es">
        <head>
    <meta charset="UTF-8">
    <title>${subject}</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>
<body>
    <div class="container">
        ${this.contentEmail(type)}
        <hr>
        <p>
            Atentamente, Equipo My Work App.
        </p>
    </div>
</body>
</html>`;

        const mailInfo = {
            from: '"My Work App" <support@myworkapp.com>',
            to: emailTo,
            subject: subject,
            html: html
        };
        return transporter.sendMail(mailInfo);
    }

    contentEmail(type: number): string{
        /*
            contenido del email
            params:
                type = número para validar el tipo de mensaje a retornar
            return: un string con el contenido del mensaje
        */
        const contents = [
            {
                id: 1,
                type: 'recoveryPassword',
                content: '<h3>Cambio de Contraseña</h3><p>Hola {usuario}, el sistema registra una solicitud para restablecer la contraseña el {fecha}. <br>Temporalmente se te asignó una contraseña y el sistema te solicitará cambiarla una vez ingreses a la aplicación.</p><p><table class="table table-striped"><thead class="thead-dark"><tr><th>Correo Eléctronico</th><th>Contraseña temporal</th></tr></thead><tbody><tr><td>{email}</td><td>{password}</td></tr></tbody></table></p><p>Si no has solicitado restablecer la contraseña por favor contacta al equipo de soporte.</p>'
            },
            {
                id: 2,
                type: 'welcomeApplication',
                content: ''
            },
            {
                id: 3,
                type: 'welcomeApplication',
                content: ''
            }
        ];
        
        let response = '';
        contents.forEach(item => {
            if (item.id === type) {
                response = item.content;
            }
        });

        return response;
    }

    
}
