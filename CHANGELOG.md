# Changelog

## v0.0.27

- Added an updatefor deno kv, changed the tournament id from a uuid to the
  tournament's slug. So that it's easily obtainable from anywhere.
  `islands/TournamentSearch.tsx`, `routes/api/db/tournaments/create.ts`,
  `src/db/tournaments.ts`.
- Added minor updates. `routes/index.tsx`.

## v0.0.26

- Added a fix for the sidebar links.
  `routes/tournament/[tournamentSlug]/index.tsx`
- Added a fix where the `PhaseGroup` was incomplete and not declared with the
  startgg gql standard queries and types. `src/startgg/queries.ts`,
  `src/startgg/types.ts`

## v0.0.25

- Added a view for a set in progress and an abstraction for the `PhaseView`
  component. `routes/tournament/[tournamentSlug]/index.tsx`
- Added minor fixes. `routes/index.tsx`, `src/startgg/queries.ts`

## v0.0.24

- Added the `GameStock` component for displaying a single stock image.
  `components/GameStock.tsx`

## v0.0.23

- Added standarized types, functions, and queries for startgg graphql api.
  `src/startgg/types.ts`, `src/startgg/queries.ts`
- Removed the `getAllTournamentSets()` query because it became irrelevant
  compared with `getTournamentDetails()`. `src/startgg/queries.ts`
- Added refactoring components for the tournament view page.
  `routes/tournament/[tournamentSlug]/index.tsx`.
- Added comments for deprecated routes. `routes/set/index.tsx`,
  `routes/set/next.tsx`

## v0.0.22

- Added a tournament detail page. Here one could see a bird's eve view, all
  participants, phases and sets. There is still a few minor features missing
  from the page, but that'll be for later.
  `routes/tournament/[tournamentSlug]/index.tsx`.
- Added a link to every db stored tournament detail page. `routes/index.tsx`
- Added fixes to the `getAllTournamentSets()` function and added the
  `iGetAllTournamentSets` interface.`src/startgg/queries.ts`
- Added a minor fix to the `iEvent` type. `src/startgg/types.ts`

## v0.0.21

- Added the correct interface to the `getTournamentDetails` startgg query.
  `src/startgg/queries.ts`
- Added an updated card to the stored tournaments display. `routes/index.tsx`

## v0.0.20

- Added the tourney search and db storage flow. `islands/TournamentSearch.tsx`,
  `routes/api/db/tournaments.ts`, `routes/api/startgg/searchTournaments.ts`,
  `src/db/tournaments.ts`, `src/startgg/queries.ts` , `src/startgg/types.ts`
- Added lunchbox, resin, and ulid as dependencies. `deno.json`
- Added the lunchbox plugin configuration. `fresh.config.ts`, `routes/_app.tsx`
- Added a module for managing all the request and responses types from api
  endpoints. `src/apiTypes.ts`
- Removed previous theme styles. `static/styles.css`

## v0.0.19

- Refactored the `<FloatingCard/>` and `<PlayerSection/>` components from
  `<PlayerInterface/>`.

## v0.0.18

- Added the `slippi-js` npm library.
- Added the `/slippi/cleanDirectory` and `/slippi/getCurrentGame` API endpoints.
- Added a change of phase inside the `<PlayerInterface/>` island.

## v0.0.17

- Added phases to the player interface.

## v0.0.16

- Added gradient for displaying port selection.
- Added a prevention mechanism for both players selecting the same port.

## v0.0.16

- Added floating cards to the `/set/next` page.

## v0.0.15

- Added the `<PortSelector/>` island.

## v0.0.14

- Added the `<PlayerInterface/>` island.
- Added the `classnames` module.

## v0.0.13

- Added the `/set/next` route.
- Removed the `<SetCard/>` component's function that links to
  `/set/[setId].tsx`.

## v0.0.12

- Added the `getSet()` fetching function.
- Added a set display in `/set/[setId].tsx`.

## v0.0.11

- Refactored `startgg.ts` into its own module at `/src/startgg/`.

## v0.0.10

- Added the `<SetFinished/>`, `<SetDefined/>`, and `<SetUndefined/>` components.
- Added the `isSetDefined()`, `isSetUnstarted()`, `isSetPlaying()`, and
  `isSetFinished()` set type validation functions.

## v0.0.9

- Added assets of stock images in high and low definition.

## v0.0.8

- Added assets of stage images in high and low definition.

## v0.0.7

- Added a `<SetCard/>` component.
- Updated the tournament model in the startgg module.

## v0.0.6

- Added `status` to the set data.

## v0.0.5

- Added CSS variables and link styles.
- Added links from home to `/set`.
- Added `getAllTournamentSets()` functionality to `/src/startgg.ts`.
- Added a display for all sets of a tournament in `/routes/set/index.tsx`-
- Updated styles in `/static/styles.css` and `/tailwind.config.ts`.

## v0.0.4

- Added the route `/set/index.tsx`.
- Added the `startgg/importTournament` and `startgg/updateSet` API endpoints.

## v0.0.3

- Added route documentation to `/index.tsx`.
- Added the route `/set/[setId].tsx`.
- Added an example `.env` file with start.gg key variables.

## v0.0.2

- Removed Deno Fresh showcase functionality.
