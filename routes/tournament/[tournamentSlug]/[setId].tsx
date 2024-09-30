import { RouteContext } from "$fresh/server.ts";
import Main from "lunchbox/components/Main/index.tsx";
import Panel from "lunchbox/components/Panel/index.tsx";
import { getSet } from "@/src/startgg/queries.ts";
import PlayerInterface from "@/islands/PlayerInterface.tsx";

export default async function (_req: Request, ctx: RouteContext) {
  const set = await getSet(ctx.params.setId);

  return (
    <Main class="flex items-center justify-center">
      <Panel class="rounded" style={{ width: "1280px", height: "720px" }}>
      </Panel>
    </Main>
  );
}
