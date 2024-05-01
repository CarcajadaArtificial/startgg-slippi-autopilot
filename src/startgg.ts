import {
  gql,
  GraphQLClient,
} from "https://deno.land/x/graphql_request@v4.1.0/mod.ts";

const _meleeStages = [
  {
    "id": 1,
    "name": "Mushroom Kingdom",
  },
  {
    "id": 2,
    "name": "Princess Peach's Castle",
  },
  {
    "id": 3,
    "name": "Rainbow Cruise",
  },
  {
    "id": 4,
    "name": "Yoshi's Island",
  },
  {
    "id": 5,
    "name": "Yoshi's Story",
  },
  {
    "id": 6,
    "name": "Kongo Jungle",
  },
  {
    "id": 7,
    "name": "Jungle Japes",
  },
  {
    "id": 8,
    "name": "Great Bay",
  },
  {
    "id": 9,
    "name": "Temple",
  },
  {
    "id": 10,
    "name": "Brinstar",
  },
  {
    "id": 11,
    "name": "Fountain of Dreams",
  },
  {
    "id": 12,
    "name": "Green Greens",
  },
  {
    "id": 13,
    "name": "Corneria",
  },
  {
    "id": 14,
    "name": "Venom",
  },
  {
    "id": 15,
    "name": "Pokémon Stadium",
  },
  {
    "id": 16,
    "name": "Mute City",
  },
  {
    "id": 17,
    "name": "Onett",
  },
  {
    "id": 18,
    "name": "Icicle Mountain",
  },
  {
    "id": 19,
    "name": "Battlefield",
  },
  {
    "id": 20,
    "name": "Final Destination",
  },
  {
    "id": 21,
    "name": "Mushroom Kingdom II",
  },
  {
    "id": 22,
    "name": "Yoshi's Island 64",
  },
  {
    "id": 23,
    "name": "Kongo Jungle 64",
  },
  {
    "id": 24,
    "name": "Brinstar Depths",
  },
  {
    "id": 25,
    "name": "Dream Land",
  },
  {
    "id": 26,
    "name": "Poké Floats",
  },
  {
    "id": 27,
    "name": "Big Blue",
  },
  {
    "id": 28,
    "name": "Fourside",
  },
  {
    "id": 29,
    "name": "Flat Zone",
  },
];

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

const client = new GraphQLClient("https://api.start.gg/gql/alpha", {
  headers: {
    authorization: `Bearer ${Deno.env.get("STARTGG_ACCESS_KEY")}`,
  },
});

export const getAllTournamentSets = () =>
  client.request<iRequestedTournament>(
    gql`
    query getEventId($slug: String) {
      event(slug: $slug) {
        id
        name
        phases {
          id
          name
          sets(
            page: 1
            perPage: 12
            sortType: STANDARD
          ){
            pageInfo {
              total
            }
            nodes {
              id
              state
              winnerId
              games {
                id
                entrant1Score
                entrant2Score
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
                state
              }
              slots {
                id
                entrant {
                  id
                  name
                }
              }
            }
          }
        }
        entrants(query: {
          page: 1
          perPage: 8
        }) {
          nodes {
            id
            participants {
              id
              gamerTag
            }
          }
        }
      }
    }`,
    {
      slug: Deno.env.get("STARTGG_TOURNAMENT_SLUG"),
    },
  );

export const isSetDefined = (set: iSet) =>
  set.slots[0].entrant && set.slots[1].entrant;

export const isSetUnstarted = (set: iSet) =>
  set.state === 1 && isSetDefined(set);
export const isSetPlaying = (set: iSet) => set.state === 2 && isSetDefined(set);
export const isSetFinished = (set: iSet) =>
  set.state === 3 && isSetDefined(set);
