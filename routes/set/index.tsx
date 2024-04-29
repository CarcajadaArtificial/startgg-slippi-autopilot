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
import SetCard from "@/components/SetCard.tsx";

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
  return (
    <div class="px-4 py-8">
      <div class="ml-4">
        <h1 class="text-4xl font-extrabold">{tournament.name}</h1>
        <code class="text-xs opacity-50">{tournament.id}</code>
      </div>
      {tournament.phases.map((phase) => (
        <div class="mt-8">
          <div class="ml-4 mb-2">
            <h2 class="text-3xl font-bold">{phase.name}</h2>
            <code class="text-xs opacity-50">{phase.id}</code>
          </div>
          <div class="flex flex-wrap gap-4">
            {phase.sets.nodes.map((set, index) => (
              <SetCard set={set} isNext={index === 0} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});
