export type BoardMode = 'club' | 'best';
export type PlayerPoolType = 'club' | 'league' | 'nationalTeam';
export type CameraAngle = 'top' | 'broadcast' | 'isometric' | 'sideline';

export interface League {
  id: string;
  name: string;
  country: string;
}

export interface NationalTeam {
  id: string;
  name: string;
  flagUrl: string;
}

export interface Club {
  id: string;
  name: string;
  logoUrl: string;
  leagueId: string;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  shirtNumber: number;
  clubId: string;
  nationalTeamId: string;
  profileImageUrl?: string;
}

export interface FormationCoordinate {
  role: string;
  x: number;
  y: number;
}

export interface Formation {
  id: string;
  name: string;
  coordinates: FormationCoordinate[];
}

export interface BoardPlayer {
  playerId: string;
  x: number;
  y: number;
  role: string;
}
