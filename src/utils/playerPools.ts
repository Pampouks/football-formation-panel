import type { Club, League, NationalTeam, Player, PlayerPoolType } from '../types';

export const getPlayersForPool = (poolType: PlayerPoolType, poolId: string, players: Player[], clubs: Club[]) => {
  if (poolType === 'club') return poolId ? players.filter((player) => player.clubId === poolId) : [];
  if (poolType === 'league') {
    if (!poolId) return [];
    const clubIds = new Set(clubs.filter((club) => club.leagueId === poolId).map((club) => club.id));
    return players.filter((player) => clubIds.has(player.clubId));
  }
  return poolId ? players.filter((player) => player.nationalTeamId === poolId) : players;
};

export const getPoolLabel = (poolType: PlayerPoolType, poolId: string, clubs: Club[], leagues: League[], nationalTeams: NationalTeam[]) => {
  if (poolType === 'club') return clubs.find((club) => club.id === poolId)?.name ?? 'Choose a club';
  if (poolType === 'league') return leagues.find((league) => league.id === poolId)?.name ?? 'Choose a league';
  return nationalTeams.find((team) => team.id === poolId)?.name ?? 'All national teams';
};
