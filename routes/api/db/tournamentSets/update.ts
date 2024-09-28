import { type Handlers } from "$fresh/server.ts";
import { ReqReadTournamentSet } from "@/src/apiTypes.ts";
import { updateTournamentSet } from "@/src/db/tournaments.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const data = (await req.json()) as ReqReadTournamentSet;
    await updateTournamentSet(data);
    return new Response(
      JSON.stringify({ ok: true }),
    );
  },
};
