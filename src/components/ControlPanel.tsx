import type { BoardMode, Club, League, NationalTeam, Player, PlayerPoolType } from '../types';
import { FormationSelector } from './FormationSelector';
import { PlayerSelector } from './PlayerSelector';
import { formations } from '../data/mockData';
import { getPoolLabel, getPlayersForPool } from '../utils/playerPools';

interface Props { mode: BoardMode; playerPoolType: PlayerPoolType; selectedPoolId: string; clubs: Club[]; leagues: League[]; nationalTeams: NationalTeam[]; players: Player[]; formationId: string; selectedIds: string[]; onModeChange: (mode: BoardMode) => void; onPoolTypeChange: (type: PlayerPoolType) => void; onPoolChange: (poolId: string) => void; onFormationChange: (id: string) => void; onLoadExampleTeam: () => void; onTogglePlayer: (id: string) => void; }

export function ControlPanel(props: Props) {
  const selectablePlayers = getPlayersForPool(props.playerPoolType, props.selectedPoolId, props.players, props.clubs);
  const poolLabel = getPoolLabel(props.playerPoolType, props.selectedPoolId, props.clubs, props.leagues, props.nationalTeams);
  return <aside className="selection-panel panel-card">
    <div className="segmented"><button className={props.mode === 'club' ? 'active' : ''} onClick={() => props.onModeChange('club')}>Club XI</button><button className={props.mode === 'best' ? 'active' : ''} onClick={() => props.onModeChange('best')}>Best XI</button></div>
    <div className="pool-tabs" aria-label="Player pool"><button className={props.playerPoolType === 'club' ? 'active' : ''} onClick={() => props.onPoolTypeChange('club')}>Clubs</button><button className={props.playerPoolType === 'league' ? 'active' : ''} onClick={() => props.onPoolTypeChange('league')}>Leagues</button><button className={props.playerPoolType === 'nationalTeam' ? 'active' : ''} onClick={() => props.onPoolTypeChange('nationalTeam')}>National Teams</button></div>
    {props.playerPoolType === 'club' && <label className="field">Club<select value={props.selectedPoolId} onChange={(e) => props.onPoolChange(e.target.value)}><option value="">Choose a club</option>{props.clubs.map((club) => <option key={club.id} value={club.id}>{club.name}</option>)}</select></label>}
    {props.playerPoolType === 'league' && <label className="field">League<select value={props.selectedPoolId} onChange={(e) => props.onPoolChange(e.target.value)}><option value="">Choose a league</option>{props.leagues.map((league) => <option key={league.id} value={league.id}>{league.name} · {league.country}</option>)}</select></label>}
    {props.playerPoolType === 'nationalTeam' && <label className="field">National team<select value={props.selectedPoolId} onChange={(e) => props.onPoolChange(e.target.value)}><option value="">All national teams</option>{props.nationalTeams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}</select></label>}
    <FormationSelector formations={formations} selectedFormationId={props.formationId} onChange={props.onFormationChange} />
    <div className="selection-header"><strong>Players</strong><span>{props.selectedIds.length}/11 selected</span></div>
    <p className="pool-summary">Showing {selectablePlayers.length} players from {poolLabel}.</p>
    <button className="example-button" onClick={props.onLoadExampleTeam}>Load example team</button>
    <PlayerSelector players={selectablePlayers} clubs={props.clubs} nationalTeams={props.nationalTeams} selectedIds={props.selectedIds} disabled={props.selectedIds.length >= 11} onToggle={props.onTogglePlayer} />
  </aside>;
}
