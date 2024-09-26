import { type Handlers } from "$fresh/server.ts";
import { ReqTournamentCreate } from "@/src/apiTypes.ts";
import { createTournament } from "@/src/db/tournaments.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const data = (await req.json()) as ReqTournamentCreate;
    createTournament(data.slug);
    return new Response(
      JSON.stringify({ ok: true }),
    );
  },
};
