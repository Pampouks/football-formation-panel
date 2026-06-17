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

## Quick testing

Use **Load example team** in the left selection panel to select the `Pampouks Example XI` mock club and place 11 test players into the current formation. This is intended as a fast smoke-test for player pools, marker rendering, dragging, save/load, export, and camera controls.

## Mock data structure

All editable demo data lives in `src/data/mockData.ts`. The TypeScript shapes are defined in `src/types/index.ts`.

### League

A league groups clubs together for the **Leagues** player pool.

```ts
interface League {
  id: string;
  name: string;
  country: string;
}
```

Example:

```ts
{ id: 'premier', name: 'Premier League', country: 'England' }
```

### NationalTeam

A national team groups players by `nationalTeamId` for the **National Teams** player pool.

```ts
interface NationalTeam {
  id: string;
  name: string;
  flagUrl: string;
}
```

Example:

```ts
{ id: 'england', name: 'England', flagUrl: 'https://placehold.co/96x96/f8fafc/1d4ed8?text=ENG' }
```

### Club / team

A club is the main team object used by the **Clubs** player pool. Each club belongs to one league through `leagueId`.

```ts
interface Club {
  id: string;
  name: string;
  logoUrl: string;
  leagueId: string;
}
```

Example:

```ts
{
  id: 'pampouks-xi',
  name: 'Pampouks Example XI',
  logoUrl: 'https://placehold.co/96x96/5eead4/07111f?text=PXI',
  leagueId: 'sandbox'
}
```

To add a new team, add one object to the `clubs` array and make sure its `leagueId` matches an existing league id.

### Player

A player belongs to one club and one national team. Club rosters are built from `clubId`; national-team rosters are built from `nationalTeamId`.

```ts
interface Player {
  id: string;
  name: string;
  position: string;
  shirtNumber: number;
  clubId: string;
  nationalTeamId: string;
  profileImageUrl?: string;
}
```

Example:

```ts
{
  id: 'x10',
  name: 'Quinn Striker',
  position: 'ST',
  shirtNumber: 9,
  clubId: 'pampouks-xi',
  nationalTeamId: 'testland',
  profileImageUrl: profile('QS', '134e4a')
}
```

To update a team roster, edit player objects so their `clubId` matches the target club id. To update national-team rosters, edit `nationalTeamId`. If `profileImageUrl` is missing, the player marker shows initials as a fallback.

### Formation

A formation maps the selected 11 players to default pitch coordinates.

```ts
interface FormationCoordinate {
  role: string;
  x: number;
  y: number;
}

interface Formation {
  id: string;
  name: string;
  coordinates: FormationCoordinate[];
}
```

Example coordinate:

```ts
{ role: 'GK', x: 50, y: 91 }
```

Coordinates are percentages from the pitch's top-left corner. Each formation should provide 11 coordinates, one for each selected player.

### BoardPlayer

A `BoardPlayer` is runtime board state, not roster data. It stores where a selected player currently sits on the pitch.

```ts
interface BoardPlayer {
  playerId: string;
  x: number;
  y: number;
  role: string;
}
```

These records are created from selected players plus the selected formation, then updated when markers are dragged.

### CameraView

Camera settings control the 3D pitch transform.

```ts
interface CameraView {
  tilt: number;
  rotation: number;
  zoom: number;
}
```

Preset camera values live in `src/utils/camera.ts`. User-adjusted camera values are saved as part of local board state.

## How the relationships work

- `League.id` links to `Club.leagueId`.
- `Club.id` links to `Player.clubId`.
- `NationalTeam.id` links to `Player.nationalTeamId`.
- `Player.id` links to `BoardPlayer.playerId`.
- `Formation.coordinates` are assigned to selected players in order.

So if you want a player to appear in a club roster, set their `clubId` to that club's `id`. If you want a player to appear in a national-team roster, set their `nationalTeamId` to that national team's `id`.


## Suggested spots and styling

- Use the ghost spots directly on the pitch to choose which formation role the next selected player should fill.
- Drag any suggested spot on the pitch to customize that role's default location; assigned players move with the customized spot, with pointer updates smoothed through animation-frame scheduling.
- Use **Board tools → Team style** to scale player icons, change the kit accent color, toggle marker labels, upload a custom board image, upload a custom player kit image, and adjust pitch line opacity.
- Use the pinned top bar to save, load, export PNG, reset positions, or clear the board from one slim action area.

## Camera controls

- Use the compact **Camera** pill inside the field panel for the current lock/status summary, then click it to expand the full camera controls.
- In the expanded camera panel, choose `Top`, `Broadcast`, `Isometric`, or `Sideline`, adjust rotate/tilt/zoom sliders, or lock the camera to prevent accidental camera changes.
- Click and hold the pitch background, then drag horizontally to rotate and vertically to change tilt.
- Drag player markers directly to move players; dragging a marker will not rotate the camera.
- Selecting players highlights matching preferred formation spots, while selecting a position highlights players whose preferred position matches that role.


## Layout

The desktop UI removes the oversized headline and uses compact working panels with reduced spacing so the pitch, selectors, tools, and player list can fit in one screen area more comfortably:

1. **Pinned top action bar** — save, load, export PNG, reset positions, clear board, and status in one slim row.
2. **Player selection panel** — Club XI / Best XI tabs, a compact club/league/nations source switcher, the active source selector, example-team loading, and the player list in its own scrollable panel.
3. **Center field panel** — the responsive pitch stays centered in a capped-width board area, with formation selection moved into the formation dropdown at the top of the field and suggested spots shown directly on the pitch.
4. **Right tools panel** — team style and board settings for marker size, kit color, marker labels, pitch line opacity, custom board upload, and custom kit upload; the camera starts as a small expandable field-panel control.

On medium screens the tools panel moves below the selection panel while the field stays beside them. On small/mobile screens the action bar stays first, followed by the field, selection, and tools panels.

## Component structure

- `App` loads the tactics board shell.
- `TacticsBoard` owns mode, player-pool type, selected club/league/national team, selected players, inline formation changes, suggested/custom formation spots, marker styling, board settings, custom board/kit uploads, draggable board positions, local save/load, camera-angle/view controls, example-team loading, and PNG export actions.
- `ControlPanel` is the compact player-selection panel for Club XI / Best XI mode, the collapsed club/league/nations source switcher, active source selector, example-team loading, and player selection.
- `BoardToolsPanel` is the right-side tools panel for marker-size and kit-color sliders, marker-label toggling, pitch line opacity, and custom board/kit uploads.
- `FormationSelector` renders formation choices.
- `PlayerSelector` renders the selectable squad/player pool with club and national-team context.
- `Pitch` renders the responsive pitch or uploaded board image, suggested formation spots, preferred-position highlights, custom spot dragging, selectable camera transforms, click-and-hold camera rotation, and animation-frame-smoothed pointer dragging while keeping markers inside bounds.
- `PlayerMarker` renders draggable circular player markers with profile images in Club XI mode and club logos in Best XI mode.

Mock leagues, national teams, clubs, players, and formations live in `src/data/mockData.ts`; shared TypeScript interfaces live in `src/types/index.ts`; formation placement helpers live in `src/utils/formation.ts`; camera presets and clamping live in `src/utils/camera.ts`.
