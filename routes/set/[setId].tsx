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
export default defineRoute((_req, ctx) =>  {
  const { setId } = ctx.params;

  console.log(setId);
  return (
    <div>
    </div>
  );
})
