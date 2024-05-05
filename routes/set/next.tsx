//   ___      _       __  _  _         _
//  / __| ___| |_    / / | \| |_____ _| |_
//  \__ \/ -_)  _|  / /  | .` / -_) \ /  _|
//  |___/\___|\__| /_/   |_|\_\___/_\_\\__|
//
////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * ### Page for the next set (`/set/next`)
 *
 * @module
 */
import { defineRoute } from "$fresh/server.ts";
import { getAllTournamentSets, isSetUnstarted } from "@/src/startgg/mod.ts";
import PlayerInterface from "@/islands/PlayerInterface.tsx";

/**
 * This function renders the page for an individual set in the tournament. If the set is currently not
 * the "next" one, disables the functionalities and guides the user to the next match. If the current
 * match is the "next" one, the intended functionality is to oficially start the match and confirm
 * the results when the match is over.
 *
 * @todo
 *
 * @returns {JSXInternal.Element}
 */
export default defineRoute(async (_req, ctx) => {
  const event = (await getAllTournamentSets()).event;
  const nextSet = event.phases.map((phase) =>
    phase.sets.nodes
  ).flat().filter(isSetUnstarted)[0];

  return <PlayerInterface set={nextSet} />;
});
