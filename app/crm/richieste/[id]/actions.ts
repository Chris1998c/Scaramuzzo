"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CRM_COOKIE, isValidSessionValue } from "@/lib/crm/auth";
import {
  isValidStatus,
  updateConsultationStatus,
} from "@/lib/crm/updateConsultation";
import { addConsultationNote } from "@/lib/crm/notes";

async function assertCrmAuth(): Promise<void> {
  const cookieStore = await cookies();
  const authed = await isValidSessionValue(cookieStore.get(CRM_COOKIE)?.value);
  if (!authed) {
    throw new Error("CRM_UNAUTHORIZED");
  }
}

export async function updateStatusAction(
  id: string,
  status: string
): Promise<void> {
  await assertCrmAuth();
  if (!isValidStatus(status)) {
    throw new Error("CRM_INVALID_STATUS");
  }
  await updateConsultationStatus(id, status);
  revalidatePath(`/crm/richieste/${id}`);
  revalidatePath("/crm");
}

export async function addNoteAction(
  id: string,
  formData: FormData
): Promise<void> {
  await assertCrmAuth();
  const body = String(formData.get("body") ?? "").trim();
  if (body.length === 0) {
    return;
  }
  await addConsultationNote(id, body, "Staff");
  revalidatePath(`/crm/richieste/${id}`);
}
