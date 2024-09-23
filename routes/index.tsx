//   _  _
//  | || |___ _ __  ___
//  | __ / _ \ '  \/ -_)
//  |_||_\___/_|_|_\___|
//
////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * ### Home page (`/`)
 *
 * @module
 */
import Main from "lunchbox/components/Main/index.tsx";
import Layout from "lunchbox/components/Layout/index.tsx";
import Module from "lunchbox/components/Module/index.tsx";
import Card from "lunchbox/components/Card/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import { kvIteratorToArray } from "lunchbox/src/db.ts";
import TournamentSearch from "@/islands/TournamentSearch.tsx";
import { readTournamentList } from "@/src/db/tournaments.ts";

/**
 * This function renders the home page. The home page functions as a status dashboard, here, one can see
 * logs, the current thing the autopilot is doing, current status for games, sets, phases, and
 * tournaments.
 *
 * @todo
 *  - [ ] Query start.gg for all tournament matches and display them.
 *  - [ ] Loop that detects changes in .slp files with on/off switch.
 *  - [ ] Detects characters and stage and reports it to start.gg.
 *  - [ ] Detects changes in stocks and reports it to start.gg.
 *  - [ ] At the end of the match reports the winning player.
 *  - [ ] Logger that shows the autopilot's activity.
 *
 * @returns {JSXInternal.Element}
 */
export default async function Home() {
  const tournaments = await kvIteratorToArray(readTournamentList());
  const slugs = tournaments.map((tournament) => tournament.value.slug);
  const noTournaments = tournaments.length === 0;

  console.log(tournaments);
  return (
    <Main class="h-screen">
      <Layout whitespace>
        <Module size={noTournaments ? "sm" : "md"}>
          {noTournaments ? null : (
            tournaments.map((tournament) => <Card>{tournament.value.slug}
            </Card>)
          )}
        </Module>
        <Module size="md">
          <Card>
            <Text noMargins type="heading">Find your tournament</Text>
            <Text class="mb-8">
              Look for your start.gg tournament filtering their name with the
              search bar below. Make sure the tournament is published and
              visible to search for it to appear.
            </Text>
            <TournamentSearch />
          </Card>
        </Module>
      </Layout>
    </Main>
  );
}
