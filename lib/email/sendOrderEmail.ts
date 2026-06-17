import { Resend } from "resend";
import OrderConfirmationEmail from "@/app/emails/OrderConfirmationEmail";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type SendOrderEmailInput = {
  recipientEmail: string;
  customerEmail: string;
  orderId: string;
  orderRef: string;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  items: OrderItem[];
  billingAddress?: string;
  shippingAddress?: string;
};

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(input: SendOrderEmailInput) {
  const { recipientEmail, ...templateProps } = input;

  try {
    const response = await resend.emails.send({
      from: "Scaramuzzo Green <noreply@scaramuzzo.green>",
      replyTo: "scaramuzzohnb@gmail.com",
      to: recipientEmail,
      subject: `Il tuo ordine ${input.orderRef} è stato confermato`,
      react: OrderConfirmationEmail(templateProps),
    });

    return { success: true, response };
  } catch (error) {
    console.error("❌ Errore invio email ordine:", error);
    return { success: false, error };
  }
}
