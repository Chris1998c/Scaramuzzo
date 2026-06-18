"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CRM_COOKIE, isValidSessionValue } from "@/lib/crm/auth";
import { isValidOrderStatus } from "@/lib/crm/orderTypes";
import { updateOrderById } from "@/lib/crm/updateOrder";

async function assertCrmAuth(): Promise<void> {
  const cookieStore = await cookies();
  const authed = await isValidSessionValue(cookieStore.get(CRM_COOKIE)?.value);
  if (!authed) {
    throw new Error("CRM_UNAUTHORIZED");
  }
}

export async function updateOrderAction(
  orderId: string,
  formData: FormData
): Promise<void> {
  await assertCrmAuth();

  const status = String(formData.get("status") ?? "");
  if (!isValidOrderStatus(status)) {
    throw new Error("ORDER_INVALID_STATUS");
  }

  await updateOrderById(orderId, {
    status,
    trackingCode: String(formData.get("tracking_code") ?? ""),
    trackingUrl: String(formData.get("tracking_url") ?? ""),
    internalNotes: String(formData.get("internal_notes") ?? ""),
  });

  revalidatePath(`/crm/ordini/${orderId}`);
  revalidatePath("/crm/ordini");
}
