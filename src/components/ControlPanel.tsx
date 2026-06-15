import type { BoardMode, Club, Player } from '../types';
import { FormationSelector } from './FormationSelector';
import { PlayerSelector } from './PlayerSelector';
import { formations } from '../data/mockData';

interface Props { mode: BoardMode; clubs: Club[]; players: Player[]; clubId: string; formationId: string; selectedIds: string[]; onModeChange: (mode: BoardMode) => void; onClubChange: (clubId: string) => void; onFormationChange: (id: string) => void; onTogglePlayer: (id: string) => void; onReset: () => void; onClear: () => void; }

export function ControlPanel(props: Props) {
  const selectablePlayers = props.mode === 'club' ? props.players.filter((player) => player.clubId === props.clubId) : props.players;
  return <aside className="controls">
    <div><p className="eyebrow">Created by Pampouks</p><h1>Football Tactics Board</h1><p>Build a responsive Club XI or mixed Best XI, then drag markers into your own shape.</p></div>
    <div className="segmented"><button className={props.mode === 'club' ? 'active' : ''} onClick={() => props.onModeChange('club')}>Club XI</button><button className={props.mode === 'best' ? 'active' : ''} onClick={() => props.onModeChange('best')}>Best XI</button></div>
    {props.mode === 'club' && <label className="field">Club<select value={props.clubId} onChange={(e) => props.onClubChange(e.target.value)}><option value="">Choose a club</option>{props.clubs.map((club) => <option key={club.id} value={club.id}>{club.name}</option>)}</select></label>}
    <FormationSelector formations={formations} selectedFormationId={props.formationId} onChange={props.onFormationChange} />
    <div className="selection-header"><strong>Players</strong><span>{props.selectedIds.length}/11 selected</span></div>
    <PlayerSelector players={selectablePlayers} clubs={props.clubs} selectedIds={props.selectedIds} disabled={props.selectedIds.length >= 11} onToggle={props.onTogglePlayer} />
    <div className="actions"><button onClick={props.onReset}>Reset positions</button><button className="danger" onClick={props.onClear}>Clear board</button></div>
  </aside>;
}
