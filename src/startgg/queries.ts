import {
  gql,
  GraphQLClient,
} from "https://deno.land/x/graphql_request@v4.1.0/mod.ts";
import {
  gqlEntrant,
  gqlEvent,
  gqlOwner,
  gqlPhase,
  gqlSet,
  gqlTournament,
  sggEntrant,
  sggEvent,
  sggImage,
  sggOwner,
  sggPhase,
  sggSet,
  sggTournament,
} from "@/src/startgg/types.ts";
import { gqlImage } from "@/src/startgg/mod.ts";

const client = new GraphQLClient("https://api.start.gg/gql/alpha", {
  headers: {
    authorization: `Bearer ${Deno.env.get("STARTGG_ACCESS_KEY")}`,
  },
});

export const getSetById = (setId: string) =>
  client.request<{ set: sggSet }>(
    gql`
    query getSetById($setId: ID!) {
      set(id: $setId) {
        ${gqlSet}
      }
    }
    `,
    { setId },
  );

export interface iSearchTournaments {
  tournaments: {
    nodes: sggTournament[];
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
          ${gqlTournament}
        }
      }
    }
    `,
    { name },
  );

export interface sggSetNodes {
  sets: {
    pageInfo: {
      total: number;
    };
    nodes: sggSet[];
  };
}
export interface sggCompleteEvent {
  phases: (sggPhase & sggSetNodes)[];
  entrants: {
    nodes: sggEntrant[];
  };
}

export interface iGetTournamentDetails {
  tournament: sggTournament & {
    images: sggImage[];
    owner: sggOwner;
    events: (sggEvent & sggCompleteEvent)[];
  };
}

export const getTournamentDetails = (slug: string) =>
  client.request<iGetTournamentDetails>(
    gql`
    query GetTournamentDetails($slug: String) {
      tournament(slug: $slug) {
        ${gqlTournament}
        images {
          ${gqlImage}
        }
        owner {
          ${gqlOwner}
        }
        events {
          ${gqlEvent}
          phases {
            ${gqlPhase}
            sets(page: 1, perPage: 20, sortType: STANDARD) {
              pageInfo {
                total
              }
              nodes {
                ${gqlSet}
              }
            }
          }
          entrants(query: {page: 1, perPage: 8}) {
            nodes {
              ${gqlEntrant}
            }
          }
        }
      }
    }
    `,
    { slug },
  );
