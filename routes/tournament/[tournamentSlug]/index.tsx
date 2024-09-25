import { ComponentChildren } from "preact";
import { RouteContext } from "$fresh/server.ts";
import Header from "lunchbox/components/Header/index.tsx";
import Main from "lunchbox/components/Main/index.tsx";
import Layout from "lunchbox/components/Layout/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import Module from "lunchbox/components/Module/index.tsx";
import Code from "lunchbox/components/Code/index.tsx";
import Sidebar from "lunchbox/components/Sidebar/index.tsx";
import Linkmap from "lunchbox/components/Linkmap/index.tsx";
import Panel from "lunchbox/components/Panel/index.tsx";
import {
  sggEntrant,
  sggEvent,
  sggGame,
  sggPhase,
  sggSet,
} from "@/src/startgg/types.ts";
import {
  getTournamentDetails,
  sggCompleteEvent,
  sggSetNodes,
} from "@/src/startgg/queries.ts";
import { cn } from "cn";
import GameStock from "@/components/GameStock.tsx";

const makeSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

const EntrantView = (entrant: sggEntrant) => (
  <div class="flex items-center gap-2">
    <Text noMargins type="small">
      <Code>{entrant.id}</Code>
    </Text>
    <Text>{entrant.participants[0].gamerTag}</Text>
  </div>
);

const SetView = (set: sggSet & { children?: ComponentChildren }) => (
  <Panel
    class={cn(
      "rounded pt-2 pb-1 px-2 mt-2",
      set.state === 3
        ? "opacity-50"
        : set.state === 2
        ? "border border-1"
        : null,
    )}
  >
    <Text noMargins type="small">
      {set.identifier} <Code>{set.fullRoundText}</Code>
    </Text>
    <div class="flex items-start gap-2">
      <Text noMargins style={{ lineBreak: "anywhere" }} class="flex-1">
        {set.slots[0].entrant ? set.slots[0].entrant.name : "-"}
      </Text>
      <Text noMargins type="small">v.s.</Text>
      <Text
        noMargins
        style={{ lineBreak: "anywhere" }}
        class="text-right flex-1"
      >
        {set.slots[1].entrant ? set.slots[1].entrant.name : "-"}
      </Text>
    </div>
    {set.children}
  </Panel>
);

const EventView = (event: sggEvent & sggCompleteEvent) => (
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
      {event.entrants.nodes.map(EntrantView)}
    </div>
    {event.phases.map((phase) => <PhaseView phase={phase} event={event} />)}
  </section>
);

const PhaseView = (
  props: { phase: sggPhase & sggSetNodes; event: sggEvent },
) => (
  <div>
    <h2 id={`${makeSlug(props.event.name)}-${makeSlug(props.phase.name)}`}>
      <Text noMargins type="heading">{props.phase.name}</Text>
    </h2>
    <Text noMargins type="small">{props.phase.id}</Text>
    {props.phase.sets.nodes.map(SetView)}
  </div>
);

const GameView = (game: sggGame) => {
  const scores = [game.entrant1Score, game.entrant2Score];
  const characterIds = game.selections.map((selection) =>
    selection.character.id
  );
  return (
    <div>
      <div class="flex items-center">
        <div class="flex flex-1">
          <GameStock
            characterId={characterIds[0]}
            amount={4 - scores[0]}
            lost
          />
          <GameStock
            characterId={characterIds[0]}
            amount={scores[0]}
          />
        </div>
        <Text noMargins type="small">
          <Code class="text-center">{game.stage.name}</Code>
        </Text>
        <div class="flex flex-1 justify-end">
          <GameStock
            characterId={characterIds[1]}
            amount={scores[1]}
          />
          <GameStock
            characterId={characterIds[1]}
            amount={4 - scores[1]}
            lost
          />
        </div>
      </div>
    </div>
  );
};

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
                    <div class="w-96">
                      <SetView {...setInProgress}>
                        {setInProgress.games
                          ? (
                            <div class="pt-4 pb-1">
                              {setInProgress.games.map(GameView)}
                            </div>
                          )
                          : null}
                      </SetView>
                    </div>
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
                  href: ctx.url.href + "/" + makeSlug(event.name),
                  children: event.phases.map((phase) => ({
                    name: phase.name,
                    href: ctx.url.href + "/" + makeSlug(event.name) + "-" +
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
