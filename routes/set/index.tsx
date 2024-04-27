//   ___      _
//  / __| ___| |_
//  \__ \/ -_)  _|
//  |___/\___|\__|
//
////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * ### Tournament sets page (`/set`)
 *
 * @module
 */
import { defineRoute } from "$fresh/server.ts";
import { getAllTournamentSets } from "@/src/startgg.ts";

/**
 * This route contains a collection of all of the sets in a tournament. The set collection must show
 * the sets that have already ended and show the results. If a set has been called or has started it
 * should display this. Sets where the players are unknown must be dissabled. Every enabled set must
 * be liked to the corresponding `/set/[setId]` page.
 *
 * @todo
 *
 * @returns {JSXInternal.Element}
 */
export default defineRoute(async (_req, _ctx) => {
  const tournament = (await getAllTournamentSets()).event;
  console.log(tournament.phases[0].sets.nodes[0].slots[0].entrant.name);
  return (
    <div class="m-4">
      <div class="ml-4">
        <h1 class="text-4xl font-extrabold">{tournament.name}</h1>
        <code class="text-xs">{tournament.id}</code>
      </div>
      {tournament.phases.map((phase) => (
        <div class="mt-8">
          <div class="ml-4 mb-2">
            <h2 class="text-3xl font-bold">{phase.name}</h2>
            <code class="text-xs">{phase.id}</code>
          </div>
          <div class="flex flex-wrap gap-4">
            {phase.sets.nodes.map((set) =>
              set.slots[0].entrant && set.slots[1].entrant
                ? (
                  <a class="bg-darker hover:bg-dark p-4 rounded cursor-pointer">
                    <p class="font-bold">{set.slots[0].entrant.name}</p>
                    <p class="font-bold">{set.slots[1].entrant.name}</p>
                    <code class="text-xs">{set.id}</code>
                  </a>
                )
                : (
                  <div class="bg-darker p-4 rounded cursor-not-allowed opacity-50">
                    <p></p>
                    <code class="text-xs">{set.id}</code>
                  </div>
                )
            )}
          </div>
        </div>
      ))}
    </div>
  );
});
