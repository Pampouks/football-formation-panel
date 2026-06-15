export type BoardMode = 'club' | 'best';

export interface Club {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  shirtNumber: number;
  clubId: string;
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
