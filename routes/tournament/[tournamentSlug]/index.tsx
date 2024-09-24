import { RouteContext } from "$fresh/server.ts";
import Main from "lunchbox/components/Main/index.tsx";
import Layout from "lunchbox/components/Layout/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import Module from "lunchbox/components/Module/index.tsx";
import Code from "lunchbox/components/Code/index.tsx";
import Sidebar from "lunchbox/components/Sidebar/index.tsx";
import Linkmap from "lunchbox/components/Linkmap/index.tsx";
import Panel from "lunchbox/components/Panel/index.tsx";
import { getAllTournamentSets } from "@/src/startgg/queries.ts";

const makeSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

export default async function (_req: Request, ctx: RouteContext) {
  const tournament = await getAllTournamentSets(
    `tournament/${ctx.params.tournamentSlug}`,
  );

  if (tournament.tournament === null) return await ctx.renderNotFound();

  const events = tournament.tournament.events;

  return (
    <Main class="min-h-screen">
      <Layout whitespace>
        <Module size="sm">
          <Sidebar>
            <Linkmap />
          </Sidebar>
        </Module>
        <Module size="lg">
          {events.map((event) => (
            <section class="flex flex-col gap-4">
              <div>
                <h1 id={makeSlug(event.name)}>
                  <Text noMargins type="title">
                    {event.name}
                  </Text>
                </h1>
                <Text noMargins type="small">{event.id}</Text>
              </div>
              <div>
                <Text noMargins type="subheading">Participants</Text>
                {event.entrants.nodes.map((entrant) => (
                  <div class="flex items-center gap-2">
                    <Text noMargins type="small">
                      <Code>{entrant.id}</Code>
                    </Text>
                    <Text>{entrant.participants[0].gamerTag}</Text>
                  </div>
                ))}
              </div>
              {event.phases.map((phase) => (
                <div>
                  <h2 id={`${makeSlug(event.name)}-${makeSlug(phase.name)}`}>
                    <Text noMargins type="heading">{phase.name}</Text>
                  </h2>
                  <Text noMargins type="small">{event.id}</Text>
                  {phase.sets.nodes.map((set) => (
                    <Panel class="rounded pt-2 pb-1 px-2 mt-2">
                      <Text noMargins type="small">
                        {set.identifier} <Code>{set.fullRoundText}</Code>
                      </Text>
                      <div class="flex items-start">
                        <Text noMargins class="flex-1">
                          {set.slots[0].entrant
                            ? set.slots[0].entrant.name
                            : "-"}
                        </Text>
                        <Text noMargins type="small">v.s.</Text>
                        <Text noMargins class="text-right flex-1">
                          {set.slots[1].entrant
                            ? set.slots[1].entrant.name
                            : "-"}
                        </Text>
                      </div>
                    </Panel>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </Module>
      </Layout>
    </Main>
  );
}
