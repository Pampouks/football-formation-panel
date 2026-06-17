import type { BoardPlayer, FormationCoordinate, Player } from '../types';
import { formations } from '../data/mockData';
import { FormationSelector } from './FormationSelector';

interface Props { formationId: string; formationCoordinates: FormationCoordinate[]; boardPlayers: BoardPlayer[]; players: Player[]; activeRoleIndex: number | null; highlightedRoles: Set<string>; onFormationChange: (id: string) => void; onSpotSelect: (index: number) => void; }

export function PositionPanel(props: Props) {
  return <aside className="position-panel panel-card">
    <FormationSelector formations={formations} selectedFormationId={props.formationId} onChange={props.onFormationChange} />
    <div className="selection-header"><strong>Spots</strong><span>{props.activeRoleIndex !== null ? props.formationCoordinates[props.activeRoleIndex]?.role : 'Auto'}</span></div>
    <div className="spot-list">{props.formationCoordinates.map((coordinate, index) => {
      const boardPlayer = props.boardPlayers.find((item) => item.role === coordinate.role);
      const player = boardPlayer ? props.players.find((item) => item.id === boardPlayer.playerId) : undefined;
      return <button key={`${coordinate.role}-${index}`} className={`spot-row ${props.activeRoleIndex === index ? 'active' : ''} ${player ? 'filled' : ''} ${props.highlightedRoles.has(coordinate.role) ? 'preferred' : ''}`} onClick={() => props.onSpotSelect(index)}><strong>{coordinate.role}</strong><span>{player ? player.name.split(' ').slice(-1)[0] : 'Open'}</span></button>;
    })}</div>
  </aside>;
}
