import { describe, expect, it } from 'vitest';
import { clubs, players } from '../data/mockData';
import { getPlayersForPool } from './playerPools';

describe('player pool filtering', () => {
  it('filters players by club', () => {
    expect(getPlayersForPool('club', 'arsenal', players, clubs).every((player) => player.clubId === 'arsenal')).toBe(true);
  });

  it('filters players by league through club membership', () => {
    const premierPlayers = getPlayersForPool('league', 'premier', players, clubs);
    const premierClubIds = new Set(clubs.filter((club) => club.leagueId === 'premier').map((club) => club.id));

    expect(premierPlayers.length).toBeGreaterThan(0);
    expect(premierPlayers.every((player) => premierClubIds.has(player.clubId))).toBe(true);
  });

  it('filters players by national team and supports an all-national-teams pool', () => {
    expect(getPlayersForPool('nationalTeam', 'england', players, clubs).every((player) => player.nationalTeamId === 'england')).toBe(true);
    expect(getPlayersForPool('nationalTeam', '', players, clubs)).toHaveLength(players.length);
  });
});
