// Sends one row to the Supabase `contact_submissions` table through its REST
// endpoint. A plain fetch keeps the ~180 KB supabase-js client out of the bundle.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export type Lead = {
  name: string;
  email: string;
  message: string;
};

export async function submitLead(lead: Lead): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(lead),
    });
    return res.ok;
  } catch {
    return false;
  }
}
