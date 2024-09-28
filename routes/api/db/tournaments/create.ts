import { type Handlers } from "$fresh/server.ts";
import { ReqTournamentCreate } from "@/src/apiTypes.ts";
import { createTournament, createTournamentSet } from "@/src/db/tournaments.ts";
import { getTournamentDetails } from "@/src/startgg/queries.ts";
import { getSetsFromCompleteEvent } from "@/src/utils.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const data = (await req.json()) as ReqTournamentCreate;
    await createTournament(data.slug);
    const completeTournament = await getTournamentDetails(data.slug);
    const tournamentSetsCreation = completeTournament
      .tournament.events
      .map(getSetsFromCompleteEvent)
      .flat()
      .map(async (set) =>
        await createTournamentSet({
          tournamentSlug: data.slug,
          setIdentifierCombo:
            `${set.phaseGroup.displayIdentifier}-${set.identifier}`,
          phaseId: String(set.phaseGroup.phase.id),
          bestOf: 3,
        })
      );
    await Promise.all(tournamentSetsCreation);

    return new Response(
      JSON.stringify({ ok: true }),
    );
  },
};
