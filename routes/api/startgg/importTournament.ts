//   _                     _  _____                                     _   
//  (_)_ __  _ __  ___ _ _| ||_   _|__ _  _ _ _ _ _  __ _ _ __  ___ _ _| |_ 
//  | | '  \| '_ \/ _ \ '_|  _|| |/ _ \ || | '_| ' \/ _` | '  \/ -_) ' \  _|
//  |_|_|_|_| .__/\___/_|  \__||_|\___/\_,_|_| |_||_\__,_|_|_|_\___|_||_\__|
//          |_|                                                             
////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * ### API endpoint for importing the sets of a tournament (`/api/startgg/importTournament`).
 *
 * @module
 */
import { type Handlers } from '$fresh/server.ts';

export const handler: Handlers = {
  /**
    This endpoint is a POST method that receives a startgg accesskey and tournament id and returns the
    tournamnet information with players and sets.

    @returns 
      The tournament data object.
   */
  async POST(req, ctx) {
    await console.log('api/startgg/importTournament', req, ctx);
    return new Response('api/startgg/importTournament');
  },
};
