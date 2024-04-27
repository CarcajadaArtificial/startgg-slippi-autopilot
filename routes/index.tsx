//   _  _               
//  | || |___ _ __  ___ 
//  | __ / _ \ '  \/ -_)
//  |_||_\___/_|_|_\___|
//                      
////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * ### Home page (`/`)
 *
 * @module
 */

/**
 * This function renders the home page. The home page functions as a status dashboard, here, one can see
 * logs, the current thing the autopilot is doing, current status for games, sets, phases, and 
 * tournaments. 
 * 
 * @todo 
 *  - [ ] Query start.gg for all tournament matches and display them.
 *  - [ ] Loop that detects changes in .slp files with on/off switch.
 *  - [ ] Detects characters and stage and reports it to start.gg.
 *  - [ ] Detects changes in stocks and reports it to start.gg.
 *  - [ ] At the end of the match reports the winning player.
 *  - [ ] Logger that shows the autopilot's activity.
 * 
 * @returns {JSXInternal.Element}
 */
export default function Home() {
  return (
    <div>
      <a href="/set">Go to all sets</a>
    </div>
  );
}
