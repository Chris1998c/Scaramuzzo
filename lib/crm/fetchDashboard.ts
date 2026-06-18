import { getSupabaseAdmin, hasSupabaseAdminCredentials } from "@/lib/supabase/admin";
import type { ConsultationRow } from "@/lib/crm/fetchConsultations";
import type { CrmOrderListItem } from "@/lib/crm/fetchOrders";

const OPEN_CONSULTATION_STATUSES = [
  "nuova",
  "in_lavorazione",
  "in_attesa_cliente",
] as const;

const CONSULTATION_LIST_COLUMNS =
  "id, public_ref, type, source, status, language, payload, customer_name, customer_phone, created_at";

const ORDER_LIST_COLUMNS =
  "id, order_ref, customer_email, total, currency, status, payment_status, source, created_at, stripe_session_id";

export type TeamDashboardMetrics = {
  newConsultations: number;
  quizOpen: number;
  bceOpen: number;
  ordersToFulfill: number;
  ordersInPreparation: number;
  ordersShipped: number;
};

export type TeamDashboardData = {
  metrics: TeamDashboardMetrics;
  recentNewConsultations: ConsultationRow[];
  recentQuizConsultations: ConsultationRow[];
  recentBceConsultations: ConsultationRow[];
  ordersToFulfill: CrmOrderListItem[];
  ordersInPreparation: CrmOrderListItem[];
  recentShippedOrders: CrmOrderListItem[];
  recentOrders: CrmOrderListItem[];
  ordersAvailable: boolean;
};

async function countConsultations(filters: {
  status?: string;
  type?: string;
  statuses?: readonly string[];
}): Promise<number> {
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("consultations")
    .select("*", { count: "exact", head: true });

  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.type) {
    query = query.eq("type", filters.type);
  }
  if (filters.statuses?.length) {
    query = query.in("status", [...filters.statuses]);
  }

  const { count, error } = await query;
  if (error) {
    throw new Error(`COUNT_CONSULTATIONS_FAILED: ${error.message}`);
  }

  return count ?? 0;
}

async function listConsultationsFiltered(
  limit: number,
  filters: {
    status?: string;
    type?: string;
    statuses?: readonly string[];
  }
): Promise<ConsultationRow[]> {
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("consultations")
    .select(CONSULTATION_LIST_COLUMNS)
    .order("created_at", { ascending: false });

  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.type) {
    query = query.eq("type", filters.type);
  }
  if (filters.statuses?.length) {
    query = query.in("status", [...filters.statuses]);
  }

  const { data, error } = await query.limit(limit);
  if (error) {
    throw new Error(`LIST_CONSULTATIONS_FAILED: ${error.message}`);
  }

  return (data ?? []) as ConsultationRow[];
}

function mapOrderRow(row: Record<string, unknown>): CrmOrderListItem {
  return {
    id: row.id as string,
    orderRef: row.order_ref as string,
    customerEmail: row.customer_email as string | null,
    totalCents: row.total as number,
    currency: row.currency as string,
    status: row.status as string,
    paymentStatus: row.payment_status as string | null,
    source: row.source as string | null,
    createdAt: row.created_at as string,
    stripeSessionId: row.stripe_session_id as string | null,
    fromDatabase: true,
  };
}

async function countOrdersByStatus(status: string): Promise<number> {
  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("status", status);

  if (error) {
    throw new Error(`COUNT_ORDERS_FAILED: ${error.message}`);
  }

  return count ?? 0;
}

async function listOrdersByStatus(
  status: string,
  limit: number
): Promise<CrmOrderListItem[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_LIST_COLUMNS)
    .eq("status", status)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`LIST_ORDERS_FAILED: ${error.message}`);
  }

  return (data ?? []).map(mapOrderRow);
}

async function listRecentOrders(limit: number): Promise<CrmOrderListItem[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_LIST_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`LIST_ORDERS_FAILED: ${error.message}`);
  }

  return (data ?? []).map(mapOrderRow);
}

export async function fetchTeamDashboard(): Promise<TeamDashboardData> {
  const openStatuses = OPEN_CONSULTATION_STATUSES;

  const [
    newConsultations,
    quizOpen,
    bceOpen,
    recentNewConsultations,
    recentQuizConsultations,
    recentBceConsultations,
  ] = await Promise.all([
    countConsultations({ status: "nuova" }),
    countConsultations({ type: "personalizzati", statuses: openStatuses }),
    countConsultations({ type: "botanical_color", statuses: openStatuses }),
    listConsultationsFiltered(5, { status: "nuova" }),
    listConsultationsFiltered(5, {
      type: "personalizzati",
      statuses: openStatuses,
    }),
    listConsultationsFiltered(5, {
      type: "botanical_color",
      statuses: openStatuses,
    }),
  ]);

  let ordersToFulfill = 0;
  let ordersInPreparation = 0;
  let ordersShipped = 0;
  let ordersToFulfillList: CrmOrderListItem[] = [];
  let ordersInPreparationList: CrmOrderListItem[] = [];
  let recentShippedOrders: CrmOrderListItem[] = [];
  let recentOrders: CrmOrderListItem[] = [];
  let ordersAvailable = false;

  if (hasSupabaseAdminCredentials()) {
    try {
      [
        ordersToFulfill,
        ordersInPreparation,
        ordersShipped,
        ordersToFulfillList,
        ordersInPreparationList,
        recentShippedOrders,
        recentOrders,
      ] = await Promise.all([
        countOrdersByStatus("paid"),
        countOrdersByStatus("processing"),
        countOrdersByStatus("shipped"),
        listOrdersByStatus("paid", 5),
        listOrdersByStatus("processing", 5),
        listOrdersByStatus("shipped", 5),
        listRecentOrders(8),
      ]);
      ordersAvailable = true;
    } catch (err) {
      console.warn("⚠️ Metriche ordini dashboard non disponibili:", err);
    }
  }

  return {
    metrics: {
      newConsultations,
      quizOpen,
      bceOpen,
      ordersToFulfill,
      ordersInPreparation,
      ordersShipped,
    },
    recentNewConsultations,
    recentQuizConsultations,
    recentBceConsultations,
    ordersToFulfill: ordersToFulfillList,
    ordersInPreparation: ordersInPreparationList,
    recentShippedOrders,
    recentOrders,
    ordersAvailable,
  };
}
