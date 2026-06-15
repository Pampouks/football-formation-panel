# Football Formation Panel

Created by Pampouks.

A responsive React + TypeScript tactics board for building a Club XI or mixed Best XI on a football pitch.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Component structure

- `App` loads the tactics board shell.
- `TacticsBoard` owns mode, selected club, selected players, formation, and draggable board positions.
- `ControlPanel` groups mode, club, formation, player, reset, and clear controls.
- `FormationSelector` renders formation choices.
- `PlayerSelector` renders the selectable squad or all-player list.
- `Pitch` renders the responsive pitch and handles drop coordinates.
- `PlayerMarker` renders draggable circular player markers with profile images in Club XI mode and club logos in Best XI mode.

Mock clubs, players, and formations live in `src/data/mockData.ts`; shared TypeScript interfaces live in `src/types/index.ts`.
