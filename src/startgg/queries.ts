import {
  gql,
  GraphQLClient,
} from "https://deno.land/x/graphql_request@v4.1.0/mod.ts";
import { iEvent, iSet } from "./types.ts";

const client = new GraphQLClient("https://api.start.gg/gql/alpha", {
  headers: {
    authorization: `Bearer ${Deno.env.get("STARTGG_ACCESS_KEY")}`,
  },
});

export const getAllTournamentSets = () =>
  client.request<{ event: iEvent }>(
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
              fullRoundText
              identifier
              phaseGroup {
                phase {
                  name
                }
              }
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

export const getSetById = (setId: string) =>
  client.request<{ set: iSet }>(
    gql`
    query getSetById($setId: ID!) {
      set(id: $setId) {
        id
        state
        winnerId
        games {
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
    `,
    { setId },
  );
