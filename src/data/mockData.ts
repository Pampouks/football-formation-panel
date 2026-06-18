import type { Club, Formation, League, NationalTeam, Player } from '../types';
import clubsData from './clubs/clubs.json';
import leaguesData from './leagues/leagues.json';
import nationalTeamsData from './nations/nations.json';
import playersData from './players/players.json';

export const leagues: League[] = leaguesData;
export const nationalTeams: NationalTeam[] = nationalTeamsData;
export const clubs: Club[] = clubsData;
export const players: Player[] = playersData;

export const formations: Formation[] = [
  { id: '433', name: '4-3-3', coordinates: [
    { role: 'GK', x: 50, y: 91 }, { role: 'LB', x: 18, y: 73 }, { role: 'LCB', x: 38, y: 76 }, { role: 'RCB', x: 62, y: 76 }, { role: 'RB', x: 82, y: 73 },
    { role: 'LCM', x: 30, y: 54 }, { role: 'CM', x: 50, y: 49 }, { role: 'RCM', x: 70, y: 54 }, { role: 'LW', x: 22, y: 25 }, { role: 'ST', x: 50, y: 18 }, { role: 'RW', x: 78, y: 25 },
  ]},
  { id: '4231', name: '4-2-3-1', coordinates: [
    { role: 'GK', x: 50, y: 91 }, { role: 'LB', x: 18, y: 73 }, { role: 'LCB', x: 38, y: 76 }, { role: 'RCB', x: 62, y: 76 }, { role: 'RB', x: 82, y: 73 },
    { role: 'LDM', x: 40, y: 58 }, { role: 'RDM', x: 60, y: 58 }, { role: 'LAM', x: 25, y: 37 }, { role: 'CAM', x: 50, y: 34 }, { role: 'RAM', x: 75, y: 37 }, { role: 'ST', x: 50, y: 18 },
  ]},
  { id: '352', name: '3-5-2', coordinates: [
    { role: 'GK', x: 50, y: 91 }, { role: 'LCB', x: 30, y: 75 }, { role: 'CB', x: 50, y: 78 }, { role: 'RCB', x: 70, y: 75 }, { role: 'LWB', x: 15, y: 53 },
    { role: 'LCM', x: 37, y: 52 }, { role: 'CM', x: 50, y: 47 }, { role: 'RCM', x: 63, y: 52 }, { role: 'RWB', x: 85, y: 53 }, { role: 'LST', x: 42, y: 20 }, { role: 'RST', x: 58, y: 20 },
  ]},
  { id: '442', name: '4-4-2', coordinates: [
    { role: 'GK', x: 50, y: 91 }, { role: 'LB', x: 18, y: 73 }, { role: 'LCB', x: 38, y: 76 }, { role: 'RCB', x: 62, y: 76 }, { role: 'RB', x: 82, y: 73 },
    { role: 'LM', x: 20, y: 47 }, { role: 'LCM', x: 40, y: 51 }, { role: 'RCM', x: 60, y: 51 }, { role: 'RM', x: 80, y: 47 }, { role: 'LST', x: 42, y: 20 }, { role: 'RST', x: 58, y: 20 },
  ]},
];
