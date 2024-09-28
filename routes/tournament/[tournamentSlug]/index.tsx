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
import { getSetsFromCompleteEvent } from "@/src/utils.ts";
import { readTournamentSet } from "@/src/db/tournaments.ts";
import InteractiveSet from "@/islands/InteractiveSet.tsx";
import StartNextMatchButton from "@/islands/StartNextMatchButton.tsx";
import { isSetPlaying, isSetUnstarted } from "@/src/startgg/utils.ts";

export default async function (_req: Request, ctx: RouteContext) {
  const tournament =
    (await getTournamentDetails(`tournament/${ctx.params.tournamentSlug}`))
      .tournament;

  if (tournament === null) return await ctx.renderNotFound();

  const events = tournament.events;

  const tournamentSets = events
    .map(getSetsFromCompleteEvent)
    .flat();

  const setsInProgress = tournamentSets.filter(isSetPlaying);
  const setsToDo = tournamentSets.filter(isSetUnstarted);
  const nextSetToDo = setsToDo[0];

  return (
    <div>
      <Header>
        <Layout>
          <Module size="xs">
          </Module>
          <Module size="xl">
            {setsInProgress.length === 0
              ? <StartNextMatchButton {...nextSetToDo} />
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
        <Layout>
          <Module size="xs">
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
          <Module size="xl">
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
                {event.phases.map((phase) => (
                  <div>
                    <h2 id={`${makeSlug(event.name)}-${makeSlug(phase.name)}`}>
                      <Text noMargins type="heading">{phase.name}</Text>
                    </h2>
                    <Text noMargins type="small">{phase.id}</Text>
                    <div className="flex flex-wrap gap-6 mt-4 mb-8">
                      {phase.sets.nodes.map((set) => (
                        <InteractiveSet
                          set={set}
                          tournamentSlug={tournament.slug}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </Module>
        </Layout>
      </Main>
    </div>
  );
}
