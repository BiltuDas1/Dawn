import type { D1Database } from "@cloudflare/workers-types";

export type Bindings = {
  SCRAPPER_DB: D1Database;
  TOTP_SECRET: string;
};
