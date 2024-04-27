import {
  gql,
  GraphQLClient,
} from "https://deno.land/x/graphql_request@v4.1.0/mod.ts";

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
            perPage: 8
            sortType: STANDARD
          ){
            pageInfo {
              total
            }
            nodes {
              id
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
