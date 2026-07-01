import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Campos requeridos faltantes" }, { status: 400 });
    }

    // Si hay RESEND_API_KEY configurada, enviamos el email
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Estudio Modo Casa <noreply@estudiomodocasa.com>",
          to: ["hola@estudiomodocasa.com"],
          subject: `Nuevo contacto web, ${nombre}`,
          html: `
            <h2>Nuevo mensaje desde el sitio web</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ""}
            <p><strong>Mensaje:</strong></p>
            <p>${mensaje.replace(/\n/g, "<br>")}</p>
          `,
        }),
      });

      if (!res.ok) {
        return NextResponse.json({ error: "Error al enviar email" }, { status: 500 });
      }
    }

    // Sin Resend configurado: log en desarrollo, success en producción
    if (process.env.NODE_ENV === "development") {
      console.log("[Contact form]", { nombre, email, telefono, mensaje });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
