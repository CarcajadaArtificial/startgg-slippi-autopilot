// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_startgg_importTournament from "./routes/api/startgg/importTournament.ts";
import * as $api_startgg_updateSet from "./routes/api/startgg/updateSet.ts";
import * as $index from "./routes/index.tsx";
import * as $set_setId_ from "./routes/set/[setId].tsx";
import * as $set_index from "./routes/set/index.tsx";

import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/startgg/importTournament.ts": $api_startgg_importTournament,
    "./routes/api/startgg/updateSet.ts": $api_startgg_updateSet,
    "./routes/index.tsx": $index,
    "./routes/set/[setId].tsx": $set_setId_,
    "./routes/set/index.tsx": $set_index,
  },
  islands: {},
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
