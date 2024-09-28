import { type Handlers } from "$fresh/server.ts";
import { ReqReadTournamentSet } from "@/src/apiTypes.ts";
import { readTournamentSet } from "@/src/db/tournaments.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const data = (await req.json()) as ReqReadTournamentSet;
    const dbSettings = await readTournamentSet(data);
    return new Response(
      JSON.stringify(dbSettings.value),
    );
  },
};
