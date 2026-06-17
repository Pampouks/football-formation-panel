import type { BoardMode, BoardPlayer, CameraAngle, CameraView, Club, FormationCoordinate, KitMode, KitPattern, NationalTeam, Player, PlayerPoolType } from '../types';

interface ExportBoardJsonArgs {
  mode: BoardMode;
  playerPoolType: PlayerPoolType;
  selectedPoolId: string;
  formationId: string;
  formationName: string;
  formationCoordinates: FormationCoordinate[];
  activeRoleIndex: number | null;
  cameraAngle: CameraAngle;
  cameraView: CameraView;
  cameraLocked: boolean;
  markerScale: number;
  kitHue: number;
  kitMode: KitMode;
  kitPattern: KitPattern;
  kitColor: string;
  kitSecondaryColor: string;
  customKitPattern: KitPattern;
  customKitPrimaryHue: number;
  customKitSecondaryHue: number;
  showPlayerLabels: boolean;
  pitchLineOpacity: number;
  customBoardImageUrl: string;
  customKitImageUrl: string;
  boardPlayers: BoardPlayer[];
  players: Player[];
  clubs: Club[];
  nationalTeams: NationalTeam[];
}

const safeFileName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'board';

export function exportBoardJson(args: ExportBoardJsonArgs) {
  const lineup = args.boardPlayers.map((boardPlayer) => {
    const player = args.players.find((item) => item.id === boardPlayer.playerId);
    const club = player ? args.clubs.find((item) => item.id === player.clubId) : undefined;
    const nationalTeam = player ? args.nationalTeams.find((item) => item.id === player.nationalTeamId) : undefined;
    const formationSpot = args.formationCoordinates.find((coordinate) => coordinate.role === boardPlayer.role);

    return {
      role: boardPlayer.role,
      positionOnField: { x: boardPlayer.x, y: boardPlayer.y },
      defaultFormationSpot: formationSpot ? { x: formationSpot.x, y: formationSpot.y } : null,
      player: player ? {
        id: player.id,
        name: player.name,
        preferredPosition: player.position,
        shirtNumber: player.shirtNumber,
        profileImageUrl: player.profileImageUrl ?? null,
      } : null,
      club: club ? {
        id: club.id,
        name: club.name,
        logoUrl: club.logoUrl,
        leagueId: club.leagueId,
      } : null,
      nationalTeam: nationalTeam ? {
        id: nationalTeam.id,
        name: nationalTeam.name,
        flagUrl: nationalTeam.flagUrl,
      } : null,
    };
  });

  const payload = {
    exportedBy: 'Pampouks',
    exportedAt: new Date().toISOString(),
    board: {
      mode: args.mode,
      playerPoolType: args.playerPoolType,
      selectedPoolId: args.selectedPoolId,
      formation: {
        id: args.formationId,
        name: args.formationName,
        coordinates: args.formationCoordinates,
        activeRoleIndex: args.activeRoleIndex,
      },
      camera: {
        angle: args.cameraAngle,
        view: args.cameraView,
        locked: args.cameraLocked,
      },
      style: {
        markerScale: args.markerScale,
        showPlayerLabels: args.showPlayerLabels,
        pitchLineOpacity: args.pitchLineOpacity,
        customBoardImageUrl: args.customBoardImageUrl || null,
      },
      kit: {
        mode: args.kitMode,
        pattern: args.kitPattern,
        primaryColor: args.kitColor,
        secondaryColor: args.kitSecondaryColor,
        baseHue: args.kitHue,
        customPattern: args.customKitPattern,
        customPrimaryHue: args.customKitPrimaryHue,
        customSecondaryHue: args.customKitSecondaryHue,
        customKitImageUrl: args.customKitImageUrl || null,
      },
    },
    lineup,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${safeFileName(args.formationName)}-pampouks-tactics-board.json`;
  link.click();
  URL.revokeObjectURL(url);
}
