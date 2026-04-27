"use server";

import { revalidatePath } from "next/cache";
import { sql, ensureSchema } from "./db";
import type { Participant } from "./categories";

export async function getParticipants(): Promise<Participant[]> {
  await ensureSchema();
  const rows = await sql`
    SELECT id, first_name, last_name, company, phone, email, created_at
    FROM participants
    ORDER BY created_at DESC
  `;
  return rows as Participant[];
}

export async function createParticipant(formData: {
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  email: string;
}) {
  await ensureSchema();
  const id = `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  await sql`
    INSERT INTO participants (id, first_name, last_name, company, phone, email)
    VALUES (${id}, ${formData.firstName}, ${formData.lastName},
            ${formData.company || null}, ${formData.phone || null}, ${formData.email || null})
  `;
  revalidatePath("/");
  return { id };
}

export async function deleteParticipant(id: string) {
  await ensureSchema();
  await sql`DELETE FROM participants WHERE id = ${id}`;
  revalidatePath("/");
}

export async function getParticipant(id: string): Promise<Participant | null> {
  await ensureSchema();
  const rows = await sql`
    SELECT id, first_name, last_name, company, phone, email, created_at
    FROM participants WHERE id = ${id}
  `;
  return (rows[0] as Participant) ?? null;
}