# Football Formation Panel

Created by Pampouks.

A responsive React + TypeScript tactics board for building a Club XI or mixed Best XI on a football pitch.

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
- `TacticsBoard` owns mode, selected club, selected players, formation, draggable board positions, local save/load, and PNG export actions.
- `ControlPanel` groups mode, club, formation, player, reset, save/load, export, and clear controls.
- `FormationSelector` renders formation choices.
- `PlayerSelector` renders the selectable squad or all-player list.
- `Pitch` renders the responsive pitch and handles smooth pointer-based dragging while keeping markers inside bounds.
- `PlayerMarker` renders draggable circular player markers with profile images in Club XI mode and club logos in Best XI mode.

Mock clubs, players, and formations live in `src/data/mockData.ts`; shared TypeScript interfaces live in `src/types/index.ts`; formation placement helpers live in `src/utils/formation.ts`.
