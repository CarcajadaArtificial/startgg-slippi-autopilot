//   ___                  _      _____                                     _
//  / __| ___ __ _ _ _ __| |_   |_   _|__ _  _ _ _ _ _  __ _ _ __  ___ _ _| |_ ___
//  \__ \/ -_) _` | '_/ _| ' \    | |/ _ \ || | '_| ' \/ _` | '  \/ -_) ' \  _(_-<
//  |___/\___\__,_|_| \__|_||_|   |_|\___/\_,_|_| |_||_\__,_|_|_|_\___|_||_\__/__/
//
////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * ### API endpoint for searching for published tournaments (`/api/startgg/searchTournaments`).
 *
 * @module
 */
import { type Handlers } from "$fresh/server.ts";
import { ReqSearchTournaments } from "@/src/apiTypes.ts";
import { searchTournaments } from "@/src/startgg/queries.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const data = (await req.json()) as ReqSearchTournaments;
    return new Response(
      JSON.stringify({
        results: (await searchTournaments(data.name)).tournaments.nodes,
      }),
    );
  },
};
