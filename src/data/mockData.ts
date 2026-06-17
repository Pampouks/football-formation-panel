import type { Club, Formation, League, NationalTeam, Player } from '../types';

export const leagues: League[] = [
  { id: 'premier', name: 'Premier League', country: 'England' },
  { id: 'laliga', name: 'La Liga', country: 'Spain' },
  { id: 'seriea', name: 'Serie A', country: 'Italy' },
  { id: 'sandbox', name: 'Sandbox Test League', country: 'Demo' },
];

export const nationalTeams: NationalTeam[] = [
  { id: 'england', name: 'England', flagUrl: 'https://placehold.co/96x96/f8fafc/1d4ed8?text=ENG' },
  { id: 'spain', name: 'Spain', flagUrl: 'https://placehold.co/96x96/facc15/b91c1c?text=ESP' },
  { id: 'brazil', name: 'Brazil', flagUrl: 'https://placehold.co/96x96/facc15/15803d?text=BRA' },
  { id: 'france', name: 'France', flagUrl: 'https://placehold.co/96x96/1d4ed8/ffffff?text=FRA' },
  { id: 'italy', name: 'Italy', flagUrl: 'https://placehold.co/96x96/15803d/ffffff?text=ITA' },
  { id: 'germany', name: 'Germany', flagUrl: 'https://placehold.co/96x96/111827/facc15?text=GER' },
  { id: 'netherlands', name: 'Netherlands', flagUrl: 'https://placehold.co/96x96/f97316/ffffff?text=NED' },
  { id: 'norway', name: 'Norway', flagUrl: 'https://placehold.co/96x96/b91c1c/ffffff?text=NOR' },
  { id: 'poland', name: 'Poland', flagUrl: 'https://placehold.co/96x96/ffffff/b91c1c?text=POL' },
  { id: 'usa', name: 'United States', flagUrl: 'https://placehold.co/96x96/1d4ed8/ffffff?text=USA' },
  { id: 'portugal', name: 'Portugal', flagUrl: 'https://placehold.co/96x96/15803d/ef4444?text=POR' },
  { id: 'ukraine', name: 'Ukraine', flagUrl: 'https://placehold.co/96x96/1d4ed8/facc15?text=UKR' },
  { id: 'uruguay', name: 'Uruguay', flagUrl: 'https://placehold.co/96x96/38bdf8/ffffff?text=URU' },
  { id: 'algeria', name: 'Algeria', flagUrl: 'https://placehold.co/96x96/ffffff/15803d?text=ALG' },
  { id: 'testland', name: 'Testland', flagUrl: 'https://placehold.co/96x96/5eead4/07111f?text=TST' },
];

export const clubs: Club[] = [
  { id: 'arsenal', name: 'North London Reds', logoUrl: 'https://placehold.co/96x96/ef4444/ffffff?text=NLR', leagueId: 'premier' },
  { id: 'barcelona', name: 'Catalan Blaugrana', logoUrl: 'https://placehold.co/96x96/1d4ed8/facc15?text=CB', leagueId: 'laliga' },
  { id: 'milan', name: 'Milano Rossoneri', logoUrl: 'https://placehold.co/96x96/111827/ef4444?text=MR', leagueId: 'seriea' },
  { id: 'pampouks-xi', name: 'Pampouks Example XI', logoUrl: 'https://placehold.co/96x96/5eead4/07111f?text=PXI', leagueId: 'sandbox' },
];

const profile = (text: string, bg = '0f172a') => `https://placehold.co/120x120/${bg}/ffffff?text=${encodeURIComponent(text)}`;

export const players: Player[] = [

  { id: 'x1', name: 'Theo Keeper', position: 'GK', shirtNumber: 1, clubId: 'pampouks-xi', nationalTeamId: 'testland', profileImageUrl: profile('TK', '134e4a') },
  { id: 'x2', name: 'Rico Rightback', position: 'RB', shirtNumber: 2, clubId: 'pampouks-xi', nationalTeamId: 'testland', profileImageUrl: profile('RR', '134e4a') },
  { id: 'x3', name: 'Cato Centerback', position: 'CB', shirtNumber: 4, clubId: 'pampouks-xi', nationalTeamId: 'testland', profileImageUrl: profile('CC', '134e4a') },
  { id: 'x4', name: 'Bruno Blocker', position: 'CB', shirtNumber: 5, clubId: 'pampouks-xi', nationalTeamId: 'testland', profileImageUrl: profile('BB', '134e4a') },
  { id: 'x5', name: 'Luca Leftback', position: 'LB', shirtNumber: 3, clubId: 'pampouks-xi', nationalTeamId: 'testland', profileImageUrl: profile('LL', '134e4a') },
  { id: 'x6', name: 'Milo Anchor', position: 'DM', shirtNumber: 6, clubId: 'pampouks-xi', nationalTeamId: 'testland', profileImageUrl: profile('MA', '134e4a') },
  { id: 'x7', name: 'Nico Tempo', position: 'CM', shirtNumber: 8, clubId: 'pampouks-xi', nationalTeamId: 'testland', profileImageUrl: profile('NT', '134e4a') },
  { id: 'x8', name: 'Omar Creator', position: 'AM', shirtNumber: 10, clubId: 'pampouks-xi', nationalTeamId: 'testland', profileImageUrl: profile('OC', '134e4a') },
  { id: 'x9', name: 'Pablo Winger', position: 'RW', shirtNumber: 7, clubId: 'pampouks-xi', nationalTeamId: 'testland', profileImageUrl: profile('PW', '134e4a') },
  { id: 'x10', name: 'Quinn Striker', position: 'ST', shirtNumber: 9, clubId: 'pampouks-xi', nationalTeamId: 'testland', profileImageUrl: profile('QS', '134e4a') },
  { id: 'x11', name: 'Sami Winger', position: 'LW', shirtNumber: 11, clubId: 'pampouks-xi', nationalTeamId: 'testland', profileImageUrl: profile('SW', '134e4a') },
  { id: 'a1', name: 'Aaron Ramsdale', position: 'GK', shirtNumber: 1, clubId: 'arsenal', nationalTeamId: 'england', profileImageUrl: profile('AR') },
  { id: 'a2', name: 'Ben White', position: 'RB', shirtNumber: 4, clubId: 'arsenal', nationalTeamId: 'england', profileImageUrl: profile('BW') },
  { id: 'a3', name: 'William Saliba', position: 'CB', shirtNumber: 2, clubId: 'arsenal', nationalTeamId: 'france', profileImageUrl: profile('WS') },
  { id: 'a4', name: 'Gabriel Magalhaes', position: 'CB', shirtNumber: 6, clubId: 'arsenal', nationalTeamId: 'brazil' },
  { id: 'a5', name: 'Oleksandr Zinchenko', position: 'LB', shirtNumber: 35, clubId: 'arsenal', nationalTeamId: 'ukraine', profileImageUrl: profile('OZ') },
  { id: 'a6', name: 'Declan Rice', position: 'DM', shirtNumber: 41, clubId: 'arsenal', nationalTeamId: 'england', profileImageUrl: profile('DR') },
  { id: 'a7', name: 'Martin Odegaard', position: 'AM', shirtNumber: 8, clubId: 'arsenal', nationalTeamId: 'norway', profileImageUrl: profile('MO') },
  { id: 'a8', name: 'Bukayo Saka', position: 'RW', shirtNumber: 7, clubId: 'arsenal', nationalTeamId: 'england', profileImageUrl: profile('BS') },
  { id: 'a9', name: 'Gabriel Jesus', position: 'ST', shirtNumber: 9, clubId: 'arsenal', nationalTeamId: 'brazil' },
  { id: 'a10', name: 'Gabriel Martinelli', position: 'LW', shirtNumber: 11, clubId: 'arsenal', nationalTeamId: 'brazil', profileImageUrl: profile('GM') },
  { id: 'a11', name: 'Kai Havertz', position: 'CM', shirtNumber: 29, clubId: 'arsenal', nationalTeamId: 'germany', profileImageUrl: profile('KH') },
  { id: 'b1', name: 'Marc-Andre ter Stegen', position: 'GK', shirtNumber: 1, clubId: 'barcelona', nationalTeamId: 'germany', profileImageUrl: profile('MT', '1d4ed8') },
  { id: 'b2', name: 'Jules Kounde', position: 'RB', shirtNumber: 23, clubId: 'barcelona', nationalTeamId: 'france' },
  { id: 'b3', name: 'Ronald Araujo', position: 'CB', shirtNumber: 4, clubId: 'barcelona', nationalTeamId: 'uruguay', profileImageUrl: profile('RA', '1d4ed8') },
  { id: 'b4', name: 'Pau Cubarsi', position: 'CB', shirtNumber: 33, clubId: 'barcelona', nationalTeamId: 'spain', profileImageUrl: profile('PC', '1d4ed8') },
  { id: 'b5', name: 'Alejandro Balde', position: 'LB', shirtNumber: 3, clubId: 'barcelona', nationalTeamId: 'spain' },
  { id: 'b6', name: 'Frenkie de Jong', position: 'CM', shirtNumber: 21, clubId: 'barcelona', nationalTeamId: 'netherlands', profileImageUrl: profile('FD', '1d4ed8') },
  { id: 'b7', name: 'Pedri', position: 'CM', shirtNumber: 8, clubId: 'barcelona', nationalTeamId: 'spain', profileImageUrl: profile('P', '1d4ed8') },
  { id: 'b8', name: 'Gavi', position: 'CM', shirtNumber: 6, clubId: 'barcelona', nationalTeamId: 'spain' },
  { id: 'b9', name: 'Lamine Yamal', position: 'RW', shirtNumber: 19, clubId: 'barcelona', nationalTeamId: 'spain', profileImageUrl: profile('LY', '1d4ed8') },
  { id: 'b10', name: 'Robert Lewandowski', position: 'ST', shirtNumber: 9, clubId: 'barcelona', nationalTeamId: 'poland', profileImageUrl: profile('RL', '1d4ed8') },
  { id: 'b11', name: 'Raphinha', position: 'LW', shirtNumber: 11, clubId: 'barcelona', nationalTeamId: 'brazil' },
  { id: 'm1', name: 'Mike Maignan', position: 'GK', shirtNumber: 16, clubId: 'milan', nationalTeamId: 'france', profileImageUrl: profile('MM', '111827') },
  { id: 'm2', name: 'Theo Hernandez', position: 'LB', shirtNumber: 19, clubId: 'milan', nationalTeamId: 'france', profileImageUrl: profile('TH', '111827') },
  { id: 'm3', name: 'Fikayo Tomori', position: 'CB', shirtNumber: 23, clubId: 'milan', nationalTeamId: 'england' },
  { id: 'm4', name: 'Malick Thiaw', position: 'CB', shirtNumber: 28, clubId: 'milan', nationalTeamId: 'germany', profileImageUrl: profile('MT', '111827') },
  { id: 'm5', name: 'Davide Calabria', position: 'RB', shirtNumber: 2, clubId: 'milan', nationalTeamId: 'italy' },
  { id: 'm6', name: 'Ismael Bennacer', position: 'CM', shirtNumber: 4, clubId: 'milan', nationalTeamId: 'algeria', profileImageUrl: profile('IB', '111827') },
  { id: 'm7', name: 'Tijjani Reijnders', position: 'CM', shirtNumber: 14, clubId: 'milan', nationalTeamId: 'netherlands' },
  { id: 'm8', name: 'Ruben Loftus-Cheek', position: 'AM', shirtNumber: 8, clubId: 'milan', nationalTeamId: 'england', profileImageUrl: profile('RL', '111827') },
  { id: 'm9', name: 'Christian Pulisic', position: 'RW', shirtNumber: 10, clubId: 'milan', nationalTeamId: 'usa', profileImageUrl: profile('CP', '111827') },
  { id: 'm10', name: 'Rafael Leao', position: 'LW', shirtNumber: 10, clubId: 'milan', nationalTeamId: 'portugal', profileImageUrl: profile('RL', '111827') },
  { id: 'm11', name: 'Olivier Giroud', position: 'ST', shirtNumber: 9, clubId: 'milan', nationalTeamId: 'france' },
];

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
