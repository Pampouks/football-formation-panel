import type { BoardMode, CameraAngle, CameraView, Club, League, NationalTeam, Player, PlayerPoolType } from '../types';
import { CameraAngleSelector } from './CameraAngleSelector';
import { FormationSelector } from './FormationSelector';
import { PlayerSelector } from './PlayerSelector';
import { formations } from '../data/mockData';
import { getPoolLabel, getPlayersForPool } from '../utils/playerPools';

interface Props { mode: BoardMode; playerPoolType: PlayerPoolType; selectedPoolId: string; clubs: Club[]; leagues: League[]; nationalTeams: NationalTeam[]; players: Player[]; formationId: string; cameraAngle: CameraAngle; cameraView: CameraView; selectedIds: string[]; status: string; onModeChange: (mode: BoardMode) => void; onPoolTypeChange: (type: PlayerPoolType) => void; onPoolChange: (poolId: string) => void; onFormationChange: (id: string) => void; onCameraAngleChange: (angle: CameraAngle) => void; onCameraNudge: (delta: Partial<CameraView>) => void; onCameraReset: () => void; onLoadExampleTeam: () => void; onTogglePlayer: (id: string) => void; onReset: () => void; onClear: () => void; onSave: () => void; onLoad: () => void; onExport: () => void; }

export function ControlPanel(props: Props) {
  const selectablePlayers = getPlayersForPool(props.playerPoolType, props.selectedPoolId, props.players, props.clubs);
  const poolLabel = getPoolLabel(props.playerPoolType, props.selectedPoolId, props.clubs, props.leagues, props.nationalTeams);
  return <aside className="controls">
    <div><p className="eyebrow">Created by Pampouks</p><h1>Football Tactics Board</h1><p>Build a responsive XI from clubs, leagues, or national teams, then drag markers into your own shape.</p></div>
    <div className="segmented"><button className={props.mode === 'club' ? 'active' : ''} onClick={() => props.onModeChange('club')}>Club XI</button><button className={props.mode === 'best' ? 'active' : ''} onClick={() => props.onModeChange('best')}>Best XI</button></div>
    <div className="pool-tabs" aria-label="Player pool"><button className={props.playerPoolType === 'club' ? 'active' : ''} onClick={() => props.onPoolTypeChange('club')}>Clubs</button><button className={props.playerPoolType === 'league' ? 'active' : ''} onClick={() => props.onPoolTypeChange('league')}>Leagues</button><button className={props.playerPoolType === 'nationalTeam' ? 'active' : ''} onClick={() => props.onPoolTypeChange('nationalTeam')}>National Teams</button></div>
    {props.playerPoolType === 'club' && <label className="field">Club<select value={props.selectedPoolId} onChange={(e) => props.onPoolChange(e.target.value)}><option value="">Choose a club</option>{props.clubs.map((club) => <option key={club.id} value={club.id}>{club.name}</option>)}</select></label>}
    {props.playerPoolType === 'league' && <label className="field">League<select value={props.selectedPoolId} onChange={(e) => props.onPoolChange(e.target.value)}><option value="">Choose a league</option>{props.leagues.map((league) => <option key={league.id} value={league.id}>{league.name} · {league.country}</option>)}</select></label>}
    {props.playerPoolType === 'nationalTeam' && <label className="field">National team<select value={props.selectedPoolId} onChange={(e) => props.onPoolChange(e.target.value)}><option value="">All national teams</option>{props.nationalTeams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}</select></label>}
    <FormationSelector formations={formations} selectedFormationId={props.formationId} onChange={props.onFormationChange} />
    <CameraAngleSelector selectedAngle={props.cameraAngle} cameraView={props.cameraView} onChange={props.onCameraAngleChange} onNudge={props.onCameraNudge} onReset={props.onCameraReset} />
    <div className="selection-header"><strong>Players</strong><span>{props.selectedIds.length}/11 selected</span></div>
    <p className="pool-summary">Showing {selectablePlayers.length} players from {poolLabel}.</p>
    <button className="example-button" onClick={props.onLoadExampleTeam}>Load example team</button>
    <PlayerSelector players={selectablePlayers} clubs={props.clubs} nationalTeams={props.nationalTeams} selectedIds={props.selectedIds} disabled={props.selectedIds.length >= 11} onToggle={props.onTogglePlayer} />
    {props.status && <p className="status" role="status">{props.status}</p>}
    <div className="actions primary-actions"><button onClick={props.onSave}>Save</button><button onClick={props.onLoad}>Load</button><button onClick={props.onExport} disabled={!props.selectedIds.length}>Export PNG</button></div>
    <div className="actions"><button onClick={props.onReset} disabled={!props.selectedIds.length}>Reset positions</button><button className="danger" onClick={props.onClear} disabled={!props.selectedIds.length}>Clear board</button></div>
  </aside>;
}
