import type { Formation } from '../types';

interface Props { formations: Formation[]; selectedFormationId: string; onChange: (id: string) => void; }

export function FormationSelector({ formations, selectedFormationId, onChange }: Props) {
  return <label className="field">Formation<select value={selectedFormationId} onChange={(e) => onChange(e.target.value)}>{formations.map((formation) => <option key={formation.id} value={formation.id}>{formation.name}</option>)}</select></label>;
}
