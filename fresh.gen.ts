// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_db_tournamentSets_read from "./routes/api/db/tournamentSets/read.ts";
import * as $api_db_tournamentSets_update from "./routes/api/db/tournamentSets/update.ts";
import * as $api_db_tournaments_create from "./routes/api/db/tournaments/create.ts";
import * as $api_slippi_cleanDirectory from "./routes/api/slippi/cleanDirectory.ts";
import * as $api_slippi_getCurrentGame from "./routes/api/slippi/getCurrentGame.ts";
import * as $api_startgg_searchTournaments from "./routes/api/startgg/searchTournaments.ts";
import * as $api_startgg_startSet from "./routes/api/startgg/startSet.ts";
import * as $api_startgg_updateSet from "./routes/api/startgg/updateSet.ts";
import * as $index from "./routes/index.tsx";
import * as $set_setId_ from "./routes/set/[setId].tsx";
import * as $set_index from "./routes/set/index.tsx";
import * as $set_next from "./routes/set/next.tsx";
import * as $tournament_tournamentSlug_setId_ from "./routes/tournament/[tournamentSlug]/[setId].tsx";
import * as $tournament_tournamentSlug_index from "./routes/tournament/[tournamentSlug]/index.tsx";
import * as $InteractiveSet from "./islands/InteractiveSet.tsx";
import * as $PlayerInterface from "./islands/PlayerInterface.tsx";
import * as $PortSelectionInterface from "./islands/PortSelectionInterface.tsx";
import * as $PortSelector from "./islands/PortSelector.tsx";
import * as $StartNextMatchButton from "./islands/StartNextMatchButton.tsx";
import * as $TournamentSearch from "./islands/TournamentSearch.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/db/tournamentSets/read.ts": $api_db_tournamentSets_read,
    "./routes/api/db/tournamentSets/update.ts": $api_db_tournamentSets_update,
    "./routes/api/db/tournaments/create.ts": $api_db_tournaments_create,
    "./routes/api/slippi/cleanDirectory.ts": $api_slippi_cleanDirectory,
    "./routes/api/slippi/getCurrentGame.ts": $api_slippi_getCurrentGame,
    "./routes/api/startgg/searchTournaments.ts": $api_startgg_searchTournaments,
    "./routes/api/startgg/startSet.ts": $api_startgg_startSet,
    "./routes/api/startgg/updateSet.ts": $api_startgg_updateSet,
    "./routes/index.tsx": $index,
    "./routes/set/[setId].tsx": $set_setId_,
    "./routes/set/index.tsx": $set_index,
    "./routes/set/next.tsx": $set_next,
    "./routes/tournament/[tournamentSlug]/[setId].tsx":
      $tournament_tournamentSlug_setId_,
    "./routes/tournament/[tournamentSlug]/index.tsx":
      $tournament_tournamentSlug_index,
  },
  islands: {
    "./islands/InteractiveSet.tsx": $InteractiveSet,
    "./islands/PlayerInterface.tsx": $PlayerInterface,
    "./islands/PortSelectionInterface.tsx": $PortSelectionInterface,
    "./islands/PortSelector.tsx": $PortSelector,
    "./islands/StartNextMatchButton.tsx": $StartNextMatchButton,
    "./islands/TournamentSearch.tsx": $TournamentSearch,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
