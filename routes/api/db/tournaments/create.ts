import { type Handlers } from "$fresh/server.ts";
import { ReqTournamentCreate } from "@/src/apiTypes.ts";
import { createTournament } from "@/src/db/tournaments.ts";
import { ulid } from "ulid";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const data = (await req.json()) as ReqTournamentCreate;
    createTournament(ulid(), data.slug);
    return new Response(
      JSON.stringify({ ok: true }),
    );
  },
};
