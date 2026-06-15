# Football Formation Panel

Created by Pampouks.

A responsive React + TypeScript tactics board for building a Club XI, league-based XI, national-team XI, or mixed Best XI on a football pitch.

## Run locally

```bash
npm install
npm run dev
```

## Test and build

```bash
npm run test
npm run build
```

## Component structure

- `App` loads the tactics board shell.
- `TacticsBoard` owns mode, player-pool type, selected club/league/national team, selected players, formation, draggable board positions, local save/load, 3D camera-angle selection, and PNG export actions.
- `ControlPanel` groups mode, player-pool tabs, club/league/national-team selector, formation, 3D camera angles, player, reset, save/load, export, and clear controls.
- `FormationSelector` renders formation choices.
- `PlayerSelector` renders the selectable squad/player pool with club and national-team context.
- `Pitch` renders the responsive pitch, applies selectable 3D camera-angle classes, and handles smooth pointer-based dragging while keeping markers inside bounds.
- `PlayerMarker` renders draggable circular player markers with profile images in Club XI mode and club logos in Best XI mode.

Mock leagues, national teams, clubs, players, and formations live in `src/data/mockData.ts`; shared TypeScript interfaces live in `src/types/index.ts`; formation placement helpers live in `src/utils/formation.ts`.
