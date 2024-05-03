//   ___      _       __  __        _   ___    _ __
//  / __| ___| |_    / / | _|__ ___| |_|_ _|__| |_ |
//  \__ \/ -_)  _|  / /  | (_-</ -_)  _|| |/ _` || |
//  |___/\___|\__| /_/   | /__/\___|\__|___\__,_|| |
//                       |__|                   |__|
////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * ### Individual set page (`/set/[setId]`)
 *
 * @module
 */
import { defineRoute } from "$fresh/server.ts";
import { getSetById, isSetUnstarted } from "@/src/startgg/mod.ts";
import { SetDefined, SetFinished } from "@/components/SetCard.tsx";

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
  const set = (await getSetById(ctx.params.setId)).set;
  console.log(set);
  return (
    <div>
      {isSetUnstarted(set)
        ? <SetDefined set={set} />
        : <SetFinished set={set} />}
    </div>
  );
});
