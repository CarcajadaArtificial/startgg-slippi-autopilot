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
import {
  getAllTournamentSets,
  isSetDefined,
  isSetFinished,
  isSetPlaying,
  isSetUnstarted,
} from "@/src/startgg/mod.ts";
import {
  SetDefined,
  SetFinished,
  SetUndefined,
} from "@/components/SetCard.tsx";

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
  const event = (await getAllTournamentSets()).event;
  const allSets = event.phases.map((phase) => phase.sets.nodes).flat();
  const setPlaying = allSets.filter(isSetPlaying)[0];
  return (
    <div class="px-4 py-8">
      <div class="ml-4">
        <h1 class="text-4xl font-extrabold">{event.name}</h1>
        <a class="text-light underline font-bold" href="/set/next">
          Go to next set
        </a>
      </div>
      <div class="mt-16">
        {setPlaying ? <SetFinished set={setPlaying} /> : null}
      </div>
      <div class="flex flex-wrap gap-4 mt-16">
        {allSets.filter(isSetUnstarted).map((set, index) => (
          <SetDefined set={set} isNext={index === 0} />
        ))}
      </div>
      <div class="flex flex-wrap gap-4 mt-16">
        {allSets.filter((set) => !isSetDefined(set)).map((set) => (
          <SetUndefined set={set} />
        ))}
      </div>
      <div class="flex flex-wrap gap-4 mt-16">
        {allSets.filter(isSetFinished).map((set) => <SetFinished set={set} />)}
      </div>
    </div>
  );
});
