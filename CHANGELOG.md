# Changelog

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
