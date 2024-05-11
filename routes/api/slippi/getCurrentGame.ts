import { type Handlers } from "$fresh/server.ts";
import { gameInProgress } from "@/src/slippi.ts";

export const handler: Handlers = {
  POST(_req, _ctx) {
    return Response.json({
      gameInProgress: gameInProgress(),
      from: "/api/slippi/getCurrentGame",
    });
  },
};
