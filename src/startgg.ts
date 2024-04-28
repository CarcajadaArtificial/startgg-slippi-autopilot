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

interface iRequestedTournament {
  event: {
    id: number;
    name: string;
    phases: {
      id: number;
      name: string;
      sets: {
        pageInfo: {
          total: number;
        };
        nodes: {
          id: number;
          /* 1=Not started, 2=In Progress, 3=Finished */
          state: number;
          slots: {
            id: number;
            entrant: {
              id: number;
              name: string;
            };
          }[];
        }[];
      };
    }[];
    entrants: {
      nodes: {
        id: number;
        participants: {
          id: number;
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
