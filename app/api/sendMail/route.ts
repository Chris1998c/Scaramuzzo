import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { enforceRateLimit } from "@/lib/rateLimit";

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

// 🎨 Email premium (table-based, inline style, niente font/immagini esterne)
function buildContactEmailHtml(input: {
  name: string;
  email: string;
  message: string;
}): string {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const message = escapeHtml(input.message).replace(/\n/g, "<br/>");

  const bg = "#0b0604";
  const card = "#170d08";
  const cardSoft = "#241710";
  const border = "#3a251b";
  const gold = "#c9a35e";
  const goldSoft = "#e2c894";
  const text = "#f5efe6";
  const muted = "#bcab9c";
  const dim = "#8a7b70";
  const fontBody = "Helvetica, Arial, sans-serif";
  const fontHeading = "Georgia, 'Times New Roman', Times, serif";

  return `
  <!DOCTYPE html>
  <html lang="it">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body style="margin:0;padding:24px 0;background-color:${bg};font-family:${fontBody};color:${text};-webkit-text-size-adjust:100%;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${bg};">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;">
              <!-- barra oro -->
              <tr>
                <td style="height:4px;line-height:4px;font-size:1px;background-color:${gold};border-top-left-radius:16px;border-top-right-radius:16px;">&nbsp;</td>
              </tr>
              <!-- card -->
              <tr>
                <td style="background-color:${card};border:1px solid ${border};border-top:none;border-bottom-left-radius:16px;border-bottom-right-radius:16px;padding:36px 32px;">
                  <!-- brand -->
                  <p style="margin:0 0 4px 0;font-family:${fontHeading};font-size:13px;letter-spacing:3px;text-transform:uppercase;color:${gold};text-align:center;">
                    Scaramuzzo
                  </p>
                  <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${dim};text-align:center;">
                    Hair Natural Beauty
                  </p>

                  <!-- titolo -->
                  <h1 style="margin:24px 0 6px 0;font-family:${fontHeading};font-size:26px;font-weight:normal;color:${text};text-align:center;">
                    Nuovo messaggio dal sito
                  </h1>
                  <p style="margin:0 0 24px 0;font-size:14px;line-height:22px;color:${muted};text-align:center;">
                    Richiesta ricevuta da Scaramuzzo Hair Natural Beauty
                  </p>

                  <!-- dati cliente -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${cardSoft};border-radius:12px;">
                    <tr>
                      <td style="padding:18px 20px;">
                        <p style="margin:0 0 2px 0;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${dim};">Nome</p>
                        <p style="margin:0 0 14px 0;font-size:15px;font-weight:bold;color:${text};">${name}</p>

                        <p style="margin:0 0 2px 0;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${dim};">Email</p>
                        <p style="margin:0;font-size:15px;font-weight:bold;">
                          <a href="mailto:${email}" style="color:${goldSoft};text-decoration:none;word-break:break-all;">${email}</a>
                        </p>
                      </td>
                    </tr>
                  </table>

                  <!-- messaggio -->
                  <p style="margin:24px 0 8px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${gold};">
                    Messaggio
                  </p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${cardSoft};border:1px solid ${border};border-radius:12px;">
                    <tr>
                      <td style="padding:18px 20px;font-size:15px;line-height:24px;color:${text};">
                        ${message}
                      </td>
                    </tr>
                  </table>

                  <p style="margin:24px 0 0 0;font-size:13px;line-height:20px;color:${muted};text-align:center;">
                    Rispondi a questa email per scrivere direttamente al cliente.
                  </p>
                </td>
              </tr>
              <!-- footer -->
              <tr>
                <td style="padding:20px 8px;text-align:center;font-size:12px;line-height:20px;color:${dim};">
                  Scaramuzzo Hair Natural Beauty<br/>
                  © ${new Date().getFullYear()} Tutti i diritti riservati
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

export async function POST(req: NextRequest) {
  const limited = enforceRateLimit(req, "sendmail", 3);
  if (limited) return limited;

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
      html: buildContactEmailHtml({ name, email, message }),
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
