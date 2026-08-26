import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().trim().min(1).max(60),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  accuracy: z.number().min(0).max(1_000_000).nullable(),
  device: z.string().trim().max(40),
  browser: z.string().trim().max(80),
  userAgent: z.string().trim().max(500),
  unlockedCount: z.number().int().min(0).max(52),
});

const progressSchema = z.object({
  id: z.string().uuid(),
  unlockedCount: z.number().int().min(0).max(52),
});

const ownerSchema = z.object({
  password: z.string().min(1).max(200),
});

export const createVisitor = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("visitors")
      .insert({
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        accuracy: data.accuracy,
        maps_url: `https://www.google.com/maps?q=${data.latitude},${data.longitude}`,
        device: data.device,
        browser: data.browser,
        user_agent: data.userAgent,
        unlocked_count: data.unlockedCount,
        total_cards: 52,
      })
      .select("id")
      .single();

    if (error || !row) {
      console.error("createVisitor failed", error);
      throw new Error("Could not save visitor");
    }
    return { id: row.id as string };
  });

export const updateVisitorProgress = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => progressSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("visitors")
      .update({ unlocked_count: data.unlockedCount })
      .eq("id", data.id);
    if (error) {
      console.error("updateVisitorProgress failed", error);
      throw new Error("Could not update progress");
    }
    return { ok: true };
  });

export const listVisitors = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ownerSchema.parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["OWNER_DASHBOARD_PASSWORD"];
    if (!expected || data.password !== expected) {
      throw new Error("Unauthorized");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("visitors")
      .select("*")
      .order("visited_at", { ascending: false });
    if (error || !rows) {
      console.error("listVisitors failed", error);
      throw new Error("Could not load visitors");
    }
    return rows;
  });
