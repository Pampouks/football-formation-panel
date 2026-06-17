export const normalizeRole = (role: string) => {
  const value = role.toUpperCase();
  if (value === 'GK') return 'GK';
  if (value.includes('CB')) return 'CB';
  if (value === 'LB' || value === 'LWB') return 'LB';
  if (value === 'RB' || value === 'RWB') return 'RB';
  if (value.includes('DM')) return 'DM';
  if (value.includes('AM')) return 'AM';
  if (value.includes('CM')) return 'CM';
  if (value === 'LW' || value === 'LM') return 'LW';
  if (value === 'RW' || value === 'RM') return 'RW';
  if (value.includes('ST')) return 'ST';
  return value;
};

export const positionMatchesRole = (position: string, role: string) => normalizeRole(position) === normalizeRole(role);
