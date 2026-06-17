export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const DEFAULT_CONSENT: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: "",
};

export const ACCEPT_ALL_CONSENT: ConsentPreferences = {
  necessary: true,
  analytics: true,
  marketing: true,
  updatedAt: "",
};
