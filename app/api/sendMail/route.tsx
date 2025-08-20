import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json()

  const gmailUser = process.env.GMAIL_USER

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmailUser,
      pass: process.env.GMAIL_APP_PASSWORD // Usa la variabile d'ambiente
    }
  })

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: gmailUser,
      subject: "Nuovo messaggio dal form di contatto",
      text: `Nome: ${name}\nEmail: ${email}\nMessaggio: ${message}`,
      html: `<p><strong>Nome:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Messaggio:</strong> ${message}</p>`
    })
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Errore nell\'invio dell\'email' }, { status: 500 })
  }
}
