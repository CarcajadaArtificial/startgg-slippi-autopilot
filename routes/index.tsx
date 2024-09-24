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
import Code from "lunchbox/components/Code/index.tsx";
import Link from "lunchbox/components/Link/index.tsx";
import { kvIteratorToArray } from "lunchbox/src/db.ts";
import TournamentSearch from "@/islands/TournamentSearch.tsx";
import { readTournamentList } from "@/src/db/tournaments.ts";
import {
  getTournamentDetails,
  iGetTournamentDetails,
} from "@/src/startgg/queries.ts";

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
  const tournaments = await Promise.all(
    (await kvIteratorToArray(readTournamentList())).map(
      async (tournamentSlug) =>
        await getTournamentDetails(tournamentSlug.value.slug),
    ),
  );
  const noTournaments = tournaments.length === 0;

  return (
    <Main class="h-screen">
      <Layout whitespace>
        <Module size={noTournaments ? "sm" : "md"}>
          {noTournaments ? null : (
            tournaments.map((tournament) => (
              <TournamentDetails {...tournament} />
            ))
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

function TournamentDetails(props: iGetTournamentDetails) {
  const {
    name,
    slug,
    url,
    owner,
    events,
    // id,
    // isRegistrationOpen,
    // eventRegistrationClosesAt,
    // images,
  } = props.tournament;

  return (
    <div>
      <Card>
        <Text noMargins type="subheading" class="text-center">{name}</Text>
        {events.map((event) => (
          <ol class="list-decimal ml-4">
            {event.phases.map((phase) => (
              <li class="mt-2">
                <Text>{phase.name}</Text>
                <Text type="small" noMargins>
                  <Code>{phase.bracketType}</Code>/<Code>{phase.state}</Code>
                </Text>
              </li>
            ))}
          </ol>
        ))}
      </Card>
      <Text noMargins type="small" class="mt-2 px-4">
        <div class="flex justify-between">
          <Link target="_blank" href={`https://start.gg${url}`}>{slug}</Link>
          <span>
            By:{" "}
            <Link target="_blank" href={`https://start.gg/${owner.slug}`}>
              {owner.player.prefix} {owner.player.gamerTag}
            </Link>
          </span>
        </div>
      </Text>
    </div>
  );
}
