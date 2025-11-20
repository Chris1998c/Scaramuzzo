import { Resend } from "resend";
import OrderConfirmationEmail from "@/app/emails/OrderConfirmationEmail";

// Tipo corretto senza ANY
export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail({
  orderId,
  customerEmail,
  total,
  items,
}: {
  orderId: string;
  customerEmail: string;
  total: number;
  items: OrderItem[];
}) {
  try {
    const response = await resend.emails.send({
      from: "Scaramuzzo <scaramuzzohnb@gmail.com>",
      to: customerEmail,
      subject: `Il tuo ordine ${orderId} è stato confermato`,
      react: OrderConfirmationEmail({
        orderId,
        customerEmail,
        total,
        items,
      }),
    });

    return { success: true, response };
  } catch (error) {
    console.error("❌ Errore invio email ordine:", error);
    return { success: false, error };
  }
}
