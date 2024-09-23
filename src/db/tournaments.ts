/// <reference lib="deno.unstable" />
export const kv = await Deno.openKv();
import {} from "@/src/apiTypes.ts";

export interface dbTournament {
  slug: string;
}

export async function createTournament(id: string, slug: string) {
  const tournamentKey = ["tournaments", id];

  const atomicOp = kv.atomic()
    .check({ key: tournamentKey, versionstamp: null })
    .set(tournamentKey, { slug: slug });

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error("Failed to create tournament");
}

export function readTournamentList() {
  return kv.list<dbTournament>({ prefix: ["tournaments"] });
}
