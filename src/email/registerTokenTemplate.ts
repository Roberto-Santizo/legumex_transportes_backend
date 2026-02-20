export class RegisterTokenTemplate {
    static build(token: string): string {
        return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Verificación de Cuenta</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f0f9ff; font-family: Arial, Helvetica, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0; background-color:#f0f9ff;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" 
                            style="background-color:#ffffff; border-radius:10px; padding:40px; box-shadow:0 6px 18px rgba(0,0,0,0.05);">
                            
                            <!-- Header -->
                            <tr>
                                <td align="center" style="padding-bottom: 25px;">
                                    <h2 style="
                                        margin:0;
                                        font-size:24px;
                                        color:#ffffff;
                                        background: linear-gradient(90deg, #0ea5e9, #0369a1);
                                        padding:18px;
                                        border-radius:8px;
                                    ">
                                        Bienvenido a Legumex Transporte
                                    </h2>
                                </td>
                            </tr>

                            <tr>
                                <td style="color:#334155; font-size:16px; line-height:1.6;">
                                    <p>
                                        Gracias por registrarte en nuestra plataforma.
                                        Para completar tu proceso de verificación, utiliza el siguiente código:
                                    </p>

                                    <div style="margin:30px 0; text-align:center;">
                                        <span style="
                                            display:inline-block;
                                            padding:16px 28px;
                                            font-size:22px;
                                            font-weight:bold;
                                            letter-spacing:4px;
                                            color:#0369a1;
                                            background-color:#e0f2fe;
                                            border-radius:8px;
                                            border:1px solid #bae6fd;
                                        ">
                                            ${token}
                                        </span>
                                    </div>

                                    <p>
                                        Este código es válido por un tiempo limitado.
                                        Si no solicitaste este registro, puedes ignorar este mensaje.
                                    </p>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="
                                    padding-top:40px;
                                    font-size:12px;
                                    color:#64748b;
                                    text-align:center;
                                ">
                                    © ${new Date().getFullYear()} Legumex Transporte.
                                    Todos los derechos reservados.
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;
    }
}