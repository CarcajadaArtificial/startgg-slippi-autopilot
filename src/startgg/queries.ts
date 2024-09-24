import {
  gql,
  GraphQLClient,
} from "https://deno.land/x/graphql_request@v4.1.0/mod.ts";
import { iEvent, iSet } from "./types.ts";
import { iTournamentPeek } from "@/src/startgg/types.ts";

const client = new GraphQLClient("https://api.start.gg/gql/alpha", {
  headers: {
    authorization: `Bearer ${Deno.env.get("STARTGG_ACCESS_KEY")}`,
  },
});

export interface iGetAllTournamentSets {
  tournament: { events: iEvent[] };
}

export const getAllTournamentSets = (slug: string) =>
  client.request<iGetAllTournamentSets>(
    gql`
    query getEventId($slug: String) {
      tournament(slug: $slug) {
        events {
          id
          name
          phases {
            id
            name
            sets(page: 1, perPage: 12, sortType: STANDARD) {
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
          entrants(query: {page: 1, perPage: 8}) {
            nodes {
              id
              participants {
                id
                gamerTag
              }
            }
          }
        }
      }
    }
    `,
    { slug },
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

export interface iSearchTournaments {
  tournaments: {
    nodes: iTournamentPeek[];
  };
}

export const searchTournaments = (name: string) =>
  client.request<iSearchTournaments>(
    gql`
    query SearchTournaments($name: String) {
      tournaments(query: {
        filter: {
        name: $name
      }
      }) {
        nodes {
          id
          name
          slug
        }
      }
    }
    `,
    { name },
  );

export interface iGetTournamentDetails {
  tournament: {
    id: number;
    name: string;
    slug: string;
    url: string;
    isRegistrationOpen: false;
    eventRegistrationClosesAt: null;
    images: {
      id: number;
      url: string;
    }[];
    owner: {
      id: number;
      slug: string;
      player: { id: number; gamerTag: string; prefix: string };
    };
    events: [
      {
        id: 1103531;
        name: string;
        state: string;
        slug: string;
        phases: {
          id: number;
          name: string;
          state: string;
          bracketType: string;
        }[];
      },
    ];
  };
}

export const getTournamentDetails = (slug: string) =>
  client.request<iGetTournamentDetails>(
    gql`
    query GetTournamentDetails($slug: String) {
      tournament(slug: $slug) {
        id
        name
        slug
        url
        isRegistrationOpen
        eventRegistrationClosesAt
        images {
          id
          url
        }
        owner {
          id
          slug
          player {
            id
            gamerTag
            prefix
          }
        }
        events {
          id
          name
          state
          slug
          phases {
            id
            name
            state
            bracketType
          }
        }
      }
    }
    `,
    { slug },
  );
