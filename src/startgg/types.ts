export interface iGame {
  id: string;
  entrant1Score: number;
  entrant2Score: number;
  state: number;
  stage: {
    id: string;
    name: string;
  };
  selections: {
    character: {
      id: string;
      name: string;
    };
    entrant: {
      id: string;
      name: string;
    };
  }[];
}

export interface iSet {
  id: string;
  /* 1=Not started, 2=In Progress, 3=Finished */
  state: number;
  games: iGame[];
  winnerId: string;
  slots: {
    id: string;
    entrant: {
      id: string;
      name: string;
    };
  }[];
}

export interface iPhase {
  id: string;
  name: string;
  sets: {
    pageInfo: {
      total: number;
    };
    nodes: iSet[];
  };
}

export interface iRequestedTournament {
  event: {
    id: string;
    name: string;
    phases: iPhase[];
    entrants: {
      nodes: {
        id: string;
        participants: {
          id: string;
          gamerTag: string;
        };
      }[];
    };
  };
}
