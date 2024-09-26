/// <reference lib="deno.unstable" />
export const kv = await Deno.openKv();

export interface dbTournament {
  slug: string;
}

export async function createTournament(slug: string) {
  const tournamentKey = slug.split("/");

  const atomicOp = kv.atomic()
    .check({ key: tournamentKey, versionstamp: null })
    .set(tournamentKey, { slug: slug });

  const res = await atomicOp.commit();
  if (!res.ok) throw new Error("Failed to create tournament");
}

export function readTournamentList() {
  return kv.list<dbTournament>({ prefix: ["tournament"] });
}
