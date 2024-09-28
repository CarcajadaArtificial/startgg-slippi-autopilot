import { type Handlers } from "$fresh/server.ts";
import { ReqStartSet } from "@/src/apiTypes.ts";
import { startSet } from "@/src/startgg/queries.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const data = (await req.json()) as ReqStartSet;
    await startSet(data.setId);
    return new Response(JSON.stringify({ ok: true }));
  },
};
