import { ComponentChildren } from "preact";
import { RouteContext } from "$fresh/server.ts";
import Main from "lunchbox/components/Main/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import Code from "lunchbox/components/Code/index.tsx";
import Panel from "lunchbox/components/Panel/index.tsx";
import { getSet } from "@/src/startgg/queries.ts";
import PortSelectionInterface from "@/islands/PortSelectionInterface.tsx";
import { readTournamentSet } from "@/src/db/tournaments.ts";
import { sggSet } from "@/src/startgg/types.ts";
import { dbTournamentSetValues } from "@/src/db/tournaments.ts";

const MainLayout = (
  props: {
    set: sggSet;
    children?: ComponentChildren;
    dbSet: dbTournamentSetValues;
  },
) => (
  <Main class="min-h-screen flex items-center justify-center">
    <Panel class="rounded p-4" style={{ width: "1280px", height: "720px" }}>
      <Text noMargins type="subheading" class="text-center mb-2">
        <Code>
          Group {props.set.phaseGroup.displayIdentifier}-{props.set.identifier}
          {", "}
          {props.set.fullRoundText}
        </Code>
        <br />
        Best of {props.dbSet.bestOf}
      </Text>
      <div className="flex justify-between mt-8">
        <Text type="heading">{props.set.slots[0].entrant.name}</Text>
        <Text type="heading">{props.set.slots[1].entrant.name}</Text>
      </div>
      {props.children}
    </Panel>
  </Main>
);

export default async function (_req: Request, ctx: RouteContext) {
  const set = (await getSet(ctx.params.setId)).set;

  if (set === null) return await ctx.renderNotFound();

  const dbSeKeys = {
    tournamentSlug: `tournament/${ctx.params.tournamentSlug}`,
    phaseId: String(set.phaseGroup.phase.id),
    setIdentifierCombo: `${set.phaseGroup.displayIdentifier}-${set.identifier}`,
  };

  const dbSet = await readTournamentSet(dbSeKeys);

  if (!dbSet.value || !dbSet.value.bestOf) return await ctx.renderNotFound();

  if (
    dbSet.value.entrant1Port === undefined ||
    dbSet.value.entrant2Port === undefined
  ) {
    return (
      <MainLayout set={set} dbSet={dbSet.value}>
        <PortSelectionInterface
          tournamentSetDbKey={`${dbSeKeys.tournamentSlug}/${dbSeKeys.phaseId}/${dbSeKeys.setIdentifierCombo}`}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout set={set} dbSet={dbSet.value}>
    </MainLayout>
  );
}
