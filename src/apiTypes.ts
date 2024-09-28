import { sggTournament } from "@/src/startgg/types.ts";
import type {
  dbTournament,
  dbTournamentSetKeys,
  dbTournamentSetValues,
  dbUpdateTournamentSet,
} from "@/src/db/tournaments.ts";

export interface ReqSearchTournaments {
  name: string;
}

export interface ResSearchTournaments {
  results: sggTournament[];
}

export interface ReqTournamentCreate extends dbTournament {}

export interface ReqReadTournamentSet extends dbTournamentSetKeys {}

export interface ResReadTournamentSet extends dbTournamentSetValues {}

export interface ReqUpdateTournamentSet extends dbUpdateTournamentSet {}

export interface ReqStartSet {
  setId: number;
}
