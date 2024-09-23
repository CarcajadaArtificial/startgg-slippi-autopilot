import { iTournamentPeek } from "@/src/startgg/types.ts";
import type { dbTournament } from "@/src/db/tournaments.ts";

export interface ReqSearchTournaments {
  name: string;
}

export interface ResSearchTournaments {
  results: iTournamentPeek[];
}

export interface ReqTournamentCreate extends dbTournament {}
