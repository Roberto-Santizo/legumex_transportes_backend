import { User } from "../entities/entity";

export class RegisterTokenTemplate {
    static build(user: User, token: string): string {
        return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Verificación de Cuenta</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f8fafc; font-family: Arial, Helvetica, sans-serif;">
            
            <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
                <tr>
                    <td align="center">
                        
                        <table width="600" cellpadding="0" cellspacing="0"
                            style="
                                background-color:#ffffff;
                                border-radius:12px;
                                padding:40px;
                                box-shadow:0 8px 24px rgba(0,0,0,0.04);
                            ">

                            <!-- Logo -->
                            <tr>
                                <td align="center" style="padding-bottom:30px;">
                                    <img 
                                        src=${process.env.LOGO_URL} 
                                        alt="Legumex Transporte"
                                        width="160"
                                        style="display:block;"
                                    />
                                </td>
                            </tr>

                            <!-- Title -->
                            <tr>
                                <td align="center" style="padding-bottom:20px;">
                                    <h1 style="
                                        margin:0;
                                        font-size:22px;
                                        font-weight:600;
                                        color:#0f172a;
                                    ">
                                        Verificación de Cuenta
                                    </h1>
                                </td>
                            </tr>

                            <!-- Content -->
                            <tr>
                                <td style="
                                    color:#475569;
                                    font-size:15px;
                                    line-height:1.7;
                                ">
                                    <p style="margin:0 0 15px 0;">
                                        Hola <strong>${user.name}</strong>,
                                    </p>

                                    <p style="margin:0 0 20px 0;">
                                        Gracias por registrarte en <strong>Legumex Transporte</strong>.
                                        Para completar tu proceso de verificación, utiliza el siguiente código:
                                    </p>

                                    <!-- Token -->
                                    <div style="text-align:center; margin:30px 0;">
                                        <span style="
                                            display:inline-block;
                                            padding:18px 30px;
                                            font-size:24px;
                                            font-weight:bold;
                                            letter-spacing:6px;
                                            color:#0ea5e9;
                                            background-color:#f0f9ff;
                                            border-radius:10px;
                                            border:1px solid #e2e8f0;
                                        ">
                                            ${token}
                                        </span>
                                    </div>

                                    <p style="margin:0 0 10px 0;">
                                        Este código es válido por <strong>1 hora</strong>.
                                    </p>

                                    <p style="margin:0;">
                                        Si no solicitaste este registro, puedes ignorar este mensaje.
                                    </p>
                                </td>
                            </tr>

                            <!-- Divider -->
                            <tr>
                                <td style="padding:35px 0 20px 0;">
                                    <hr style="border:none; border-top:1px solid #e2e8f0;" />
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td align="center" style="
                                    font-size:12px;
                                    color:#94a3b8;
                                ">
                                    © ${new Date().getFullYear()} Legumex Transporte<br/>
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