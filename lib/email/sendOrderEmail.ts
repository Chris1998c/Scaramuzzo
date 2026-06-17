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
  orderId: string;
  orderRef: string;
  customerEmail: string;
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
  try {
    const response = await resend.emails.send({
      from: "Scaramuzzo Green <noreply@scaramuzzo.green>",
      replyTo: "scaramuzzohnb@gmail.com",
      to: input.customerEmail,
      subject: `Il tuo ordine ${input.orderRef} è stato confermato`,
      react: OrderConfirmationEmail(input),
    });

    return { success: true, response };
  } catch (error) {
    console.error("❌ Errore invio email ordine:", error);
    return { success: false, error };
  }
}
