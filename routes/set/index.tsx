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
export default defineRoute((_req, ctx) =>  {
  const { setId } = ctx.params;

  console.log(setId);
  return (
    <div>
    </div>
  );
})
