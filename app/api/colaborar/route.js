import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { nombre, profesion, interes, email } = await request.json();

        if (!nombre || !email) {
            return NextResponse.json({ error: "Nombre y correo son obligatorios" }, { status: 400 });
        }

        await resend.emails.send({
            from: "EstadoHUB <onboarding@resend.dev>",
            to: process.env.COLABORACION_EMAIL,
            subject: `🤝 Nuevo colaborador: ${nombre}`,
            html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px; background: #171614; color: #cdccca; border-radius: 12px;">
          <h2 style="color: #4f98a3; margin-bottom: 24px;">Nuevo colaborador interesado en EstadoHUB</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #797876; width: 160px;">Nombre</td><td style="padding: 8px 0; color: #cdccca;">${nombre}</td></tr>
            <tr><td style="padding: 8px 0; color: #797876;">Profesión / área</td><td style="padding: 8px 0; color: #cdccca;">${profesion || "—"}</td></tr>
            <tr><td style="padding: 8px 0; color: #797876;">Cómo quiere aportar</td><td style="padding: 8px 0; color: #cdccca;">${interes || "—"}</td></tr>
            <tr><td style="padding: 8px 0; color: #797876;">Correo de contacto</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #4f98a3;">${email}</a></td></tr>
          </table>
        </div>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error enviando correo:", error);
        return NextResponse.json({ error: "No se pudo enviar el correo" }, { status: 500 });
    }
}