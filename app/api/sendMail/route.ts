import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// 🔥 Forza runtime Node (Nodemailer NON funziona in Edge)
export const runtime = "nodejs";

// Limiti di lunghezza ragionevoli per evitare abusi/payload enormi
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

// Validazione email semplice ma robusta
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Escape minimo per il corpo HTML (evita HTML injection nell'email)
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 🕳️ HONEYPOT: campo invisibile agli umani. Se valorizzato → è un bot.
    // Rispondiamo "success" per non insospettire il bot, ma NON inviamo nulla.
    if (typeof body?.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    // Normalizzazione input
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message =
      typeof body?.message === "string" ? body.message.trim() : "";

    // --- VALIDAZIONE SERVER-SIDE ---
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Tutti i campi sono obbligatori." },
        { status: 400 }
      );
    }

    if (name.length > MAX_NAME) {
      return NextResponse.json(
        { success: false, error: "Nome troppo lungo." },
        { status: 400 }
      );
    }

    if (email.length > MAX_EMAIL || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Email non valida." },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE) {
      return NextResponse.json(
        { success: false, error: "Messaggio troppo lungo." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      return NextResponse.json(
        { success: false, error: "Missing email credentials" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      // ✉️ Mittente = nostro indirizzo (no spoofing). Il nome utente resta visibile.
      from: `"Scaramuzzo Sito - Contatti" <${gmailUser}>`,
      to: gmailUser,
      // 📨 Rispondendo si scrive direttamente al cliente
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Nuovo messaggio dal form di contatto — ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nMessaggio:\n${message}`,
      html: `
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Messaggio:</strong><br/>${escapeHtml(message).replace(
          /\n/g,
          "<br/>"
        )}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Email sending failed" },
      { status: 500 }
    );
  }
}
