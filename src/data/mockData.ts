import type { Club, Formation, Player } from '../types';

export const clubs: Club[] = [
  { id: 'arsenal', name: 'North London Reds', logoUrl: 'https://placehold.co/96x96/ef4444/ffffff?text=NLR' },
  { id: 'barcelona', name: 'Catalan Blaugrana', logoUrl: 'https://placehold.co/96x96/1d4ed8/facc15?text=CB' },
  { id: 'milan', name: 'Milano Rossoneri', logoUrl: 'https://placehold.co/96x96/111827/ef4444?text=MR' },
];

const profile = (text: string, bg = '0f172a') => `https://placehold.co/120x120/${bg}/ffffff?text=${encodeURIComponent(text)}`;

export const players: Player[] = [
  { id: 'a1', name: 'Aaron Ramsdale', position: 'GK', shirtNumber: 1, clubId: 'arsenal', profileImageUrl: profile('AR') },
  { id: 'a2', name: 'Ben White', position: 'RB', shirtNumber: 4, clubId: 'arsenal', profileImageUrl: profile('BW') },
  { id: 'a3', name: 'William Saliba', position: 'CB', shirtNumber: 2, clubId: 'arsenal', profileImageUrl: profile('WS') },
  { id: 'a4', name: 'Gabriel Magalhaes', position: 'CB', shirtNumber: 6, clubId: 'arsenal' },
  { id: 'a5', name: 'Oleksandr Zinchenko', position: 'LB', shirtNumber: 35, clubId: 'arsenal', profileImageUrl: profile('OZ') },
  { id: 'a6', name: 'Declan Rice', position: 'DM', shirtNumber: 41, clubId: 'arsenal', profileImageUrl: profile('DR') },
  { id: 'a7', name: 'Martin Odegaard', position: 'AM', shirtNumber: 8, clubId: 'arsenal', profileImageUrl: profile('MO') },
  { id: 'a8', name: 'Bukayo Saka', position: 'RW', shirtNumber: 7, clubId: 'arsenal', profileImageUrl: profile('BS') },
  { id: 'a9', name: 'Gabriel Jesus', position: 'ST', shirtNumber: 9, clubId: 'arsenal' },
  { id: 'a10', name: 'Gabriel Martinelli', position: 'LW', shirtNumber: 11, clubId: 'arsenal', profileImageUrl: profile('GM') },
  { id: 'a11', name: 'Kai Havertz', position: 'CM', shirtNumber: 29, clubId: 'arsenal', profileImageUrl: profile('KH') },
  { id: 'b1', name: 'Marc-Andre ter Stegen', position: 'GK', shirtNumber: 1, clubId: 'barcelona', profileImageUrl: profile('MT', '1d4ed8') },
  { id: 'b2', name: 'Jules Kounde', position: 'RB', shirtNumber: 23, clubId: 'barcelona' },
  { id: 'b3', name: 'Ronald Araujo', position: 'CB', shirtNumber: 4, clubId: 'barcelona', profileImageUrl: profile('RA', '1d4ed8') },
  { id: 'b4', name: 'Pau Cubarsi', position: 'CB', shirtNumber: 33, clubId: 'barcelona', profileImageUrl: profile('PC', '1d4ed8') },
  { id: 'b5', name: 'Alejandro Balde', position: 'LB', shirtNumber: 3, clubId: 'barcelona' },
  { id: 'b6', name: 'Frenkie de Jong', position: 'CM', shirtNumber: 21, clubId: 'barcelona', profileImageUrl: profile('FD', '1d4ed8') },
  { id: 'b7', name: 'Pedri', position: 'CM', shirtNumber: 8, clubId: 'barcelona', profileImageUrl: profile('P', '1d4ed8') },
  { id: 'b8', name: 'Gavi', position: 'CM', shirtNumber: 6, clubId: 'barcelona' },
  { id: 'b9', name: 'Lamine Yamal', position: 'RW', shirtNumber: 19, clubId: 'barcelona', profileImageUrl: profile('LY', '1d4ed8') },
  { id: 'b10', name: 'Robert Lewandowski', position: 'ST', shirtNumber: 9, clubId: 'barcelona', profileImageUrl: profile('RL', '1d4ed8') },
  { id: 'b11', name: 'Raphinha', position: 'LW', shirtNumber: 11, clubId: 'barcelona' },
  { id: 'm1', name: 'Mike Maignan', position: 'GK', shirtNumber: 16, clubId: 'milan', profileImageUrl: profile('MM', '111827') },
  { id: 'm2', name: 'Theo Hernandez', position: 'LB', shirtNumber: 19, clubId: 'milan', profileImageUrl: profile('TH', '111827') },
  { id: 'm3', name: 'Fikayo Tomori', position: 'CB', shirtNumber: 23, clubId: 'milan' },
  { id: 'm4', name: 'Malick Thiaw', position: 'CB', shirtNumber: 28, clubId: 'milan', profileImageUrl: profile('MT', '111827') },
  { id: 'm5', name: 'Davide Calabria', position: 'RB', shirtNumber: 2, clubId: 'milan' },
  { id: 'm6', name: 'Ismael Bennacer', position: 'CM', shirtNumber: 4, clubId: 'milan', profileImageUrl: profile('IB', '111827') },
  { id: 'm7', name: 'Tijjani Reijnders', position: 'CM', shirtNumber: 14, clubId: 'milan' },
  { id: 'm8', name: 'Ruben Loftus-Cheek', position: 'AM', shirtNumber: 8, clubId: 'milan', profileImageUrl: profile('RL', '111827') },
  { id: 'm9', name: 'Christian Pulisic', position: 'RW', shirtNumber: 10, clubId: 'milan', profileImageUrl: profile('CP', '111827') },
  { id: 'm10', name: 'Rafael Leao', position: 'LW', shirtNumber: 10, clubId: 'milan', profileImageUrl: profile('RL', '111827') },
  { id: 'm11', name: 'Olivier Giroud', position: 'ST', shirtNumber: 9, clubId: 'milan' },
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
