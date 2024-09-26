export interface sggTournament {
  id: number;
  name: string;
  slug: string;
  url: string;
  isRegistrationOpen: false;
  eventRegistrationClosesAt: string;
}

export const gqlTournament = `
id
name
slug
url
isRegistrationOpen
eventRegistrationClosesAt
`;

export interface sggImage {
  id: number;
  url: string;
}

export const gqlImage = `
id
url
`;

export interface sggOwner {
  id: number;
  slug: string;
  player: { id: number; gamerTag: string; prefix: string };
}

export const gqlOwner = `
id
slug
player {
  id
  gamerTag
  prefix
}
`;

export interface sggEntrant {
  id: string;
  participants: {
    id: string;
    gamerTag: string;
  }[];
}

export const gqlEntrant = `
id
participants {
  id
  gamerTag
}
`;

export interface sggEvent {
  id: number;
  name: string;
  state: string;
  slug: string;
}

export const gqlEvent = `
id
name
state
slug
`;

export interface sggPhase {
  id: number;
  name: string;
  state: string;
  bracketType: string;
}

export const gqlPhase = `
id
name
state
bracketType
`;

export interface sggGame {
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

export const gqlGame = `
id
entrant1Score
entrant2Score
state
stage {
  id
  name
}
selections {
  character {
    id
    name
  }
  entrant {
    id
    name
  }
}
`;

export interface sggSet {
  id: string;
  /* 1=Not started, 2=In Progress, 3=Finished */
  state: number;
  games: sggGame[];
  winnerId: string;
  fullRoundText: string;
  identifier: string;
  phaseGroup: {
    phase: sggPhase;
  };
  slots: {
    id: string;
    entrant: {
      id: string;
      name: string;
    };
  }[];
}

export const gqlSet = `
id
state
winnerId
fullRoundText
identifier
phaseGroup {
  phase {
    ${gqlPhase}
  }
}
games {
  ${gqlGame}
}
slots {
  id
  entrant {
    id
    name
  }
}
`;
