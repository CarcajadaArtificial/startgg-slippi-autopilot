import { type Handlers } from "$fresh/server.ts";
import { mapGameFiles } from "@/src/slippi.ts";

export const handler: Handlers = {
  POST(_req, _ctx) {
    mapGameFiles((gameFile) =>
      Deno.remove(`./slippi/cyntiha/${gameFile.name}`)
    );
    return Response.json({ from: "/api/slippi/cleanDirectory" });
  },
};
