import { RouteContext } from "$fresh/server.ts";
import Header from "lunchbox/components/Header/index.tsx";
import Main from "lunchbox/components/Main/index.tsx";
import Layout from "lunchbox/components/Layout/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import Module from "lunchbox/components/Module/index.tsx";
import Sidebar from "lunchbox/components/Sidebar/index.tsx";
import Linkmap from "lunchbox/components/Linkmap/index.tsx";
import { getTournamentDetails } from "@/src/startgg/queries.ts";
import { makeSlug } from "@/src/utils.ts";
import GameView from "@/components/GameView.tsx";
import SetView from "@/components/SetView.tsx";
import EventView from "@/components/EventView.tsx";

export default async function (_req: Request, ctx: RouteContext) {
  const tournament =
    (await getTournamentDetails(`tournament/${ctx.params.tournamentSlug}`))
      .tournament;

  if (tournament === null) return await ctx.renderNotFound();

  const events = tournament.events;

  const setsInProgress = events.map((event) => event.phases).flat().map((
    phase,
  ) => phase.sets.nodes).flat().filter((set) => set.state === 2);

  return (
    <div>
      <Header>
        <Layout whitespace>
          <Module size="sm">
          </Module>
          <Module size="lg">
            {setsInProgress.length === 0
              ? (
                <Text class="text-center opacity-50">
                  Here is where the sets in progress will appear.
                </Text>
              )
              : (
                <div class="flex flex-wrap gap-8">
                  {setsInProgress.map((setInProgress) => (
                    <SetView {...setInProgress}>
                      {setInProgress.games
                        ? (
                          <div class="pt-4 pb-1">
                            {setInProgress.games.map(GameView)}
                          </div>
                        )
                        : null}
                    </SetView>
                  ))}
                </div>
              )}
          </Module>
        </Layout>
      </Header>
      <Main class="min-h-screen">
        <Layout whitespace>
          <Module size="sm">
            <Sidebar sticky fwd={{ container: { class: "mt-20" } }}>
              <Linkmap
                links={events.map((event) => ({
                  name: event.name,
                  href: ctx.url.href + "#" + makeSlug(event.name),
                  children: event.phases.map((phase) => ({
                    name: phase.name,
                    href: ctx.url.href + "#" + makeSlug(event.name) + "-" +
                      makeSlug(phase.name),
                  })),
                }))}
              />
            </Sidebar>
          </Module>
          <Module size="lg">
            {events.map(EventView)}
          </Module>
        </Layout>
      </Main>
    </div>
  );
}
