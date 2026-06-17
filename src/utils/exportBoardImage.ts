import type { BoardMode, BoardPlayer, Club, Player } from '../types';

const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = src;
});

const initials = (name: string) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

interface ExportArgs { boardPlayers: BoardPlayer[]; players: Player[]; clubs: Club[]; mode: BoardMode; formationName: string; markerScale?: number; kitColor?: string; customBoardImageUrl?: string; customKitImageUrl?: string; }

export async function exportBoardImage({ boardPlayers, players, clubs, mode, formationName, markerScale = 1, kitColor = '#ffffff', customBoardImageUrl, customKitImageUrl }: ExportArgs) {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 1700;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  if (customBoardImageUrl) {
    try {
      const boardImage = await loadImage(customBoardImageUrl);
      const scale = Math.max(width / boardImage.width, height / boardImage.height);
      const drawWidth = boardImage.width * scale;
      const drawHeight = boardImage.height * scale;
      ctx.drawImage(boardImage, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
      ctx.fillStyle = 'rgba(6, 38, 24, .28)';
      ctx.fillRect(0, 0, width, height);
    } catch {
      ctx.fillStyle = '#0b5f39';
      ctx.fillRect(0, 0, width, height);
    }
  } else {
    ctx.fillStyle = '#0b5f39';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 8; i += 1) {
      ctx.fillStyle = i % 2 ? '#0f7044' : '#0c653d';
      ctx.fillRect((width / 8) * i, 0, width / 8, height);
    }
  }

  ctx.strokeStyle = 'rgba(255,255,255,.86)';
  ctx.lineWidth = 8;
  ctx.strokeRect(34, 34, width - 68, height - 68);
  ctx.beginPath();
  ctx.moveTo(34, height / 2);
  ctx.lineTo(width - 34, height / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 145, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeRect(width * .26, 34, width * .48, height * .16);
  ctx.strokeRect(width * .26, height - 34 - height * .16, width * .48, height * .16);

  ctx.fillStyle = 'rgba(7,17,31,.76)';
  ctx.fillRect(0, 0, width, 92);
  ctx.fillStyle = '#e5eefb';
  ctx.font = 'bold 42px system-ui, sans-serif';
  ctx.fillText(`Pampouks Tactics Board · ${formationName}`, 44, 60);

  for (const boardPlayer of boardPlayers) {
    const player = players.find((item) => item.id === boardPlayer.playerId);
    if (!player) continue;
    const club = clubs.find((item) => item.id === player.clubId);
    const imageUrl = customKitImageUrl ?? (mode === 'best' ? club?.logoUrl : player.profileImageUrl);
    const x = (boardPlayer.x / 100) * width;
    const y = (boardPlayer.y / 100) * height;
    const radius = 48 * markerScale;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.clip();
    let drewImage = false;
    if (imageUrl) {
      try {
        const image = await loadImage(imageUrl);
        ctx.drawImage(image, x - radius, y - radius, radius * 2, radius * 2);
        drewImage = true;
      } catch {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }
    }
    if (customKitImageUrl && drewImage) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0,0,0,.75)';
      ctx.shadowBlur = 8;
      ctx.fillText(String(player.shirtNumber), x, y);
      ctx.shadowBlur = 0;
    }
    if (!drewImage) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(initials(player.name), x, y);
    }
    ctx.restore();
    ctx.strokeStyle = kitColor;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = kitColor;
    ctx.beginPath();
    ctx.roundRect(x - 70, y + radius + 10, 140, 44, 12);
    ctx.fill();
    ctx.fillStyle = '#07111f';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${player.shirtNumber} ${player.name.split(' ').slice(-1)[0]}`, x, y + radius + 38);
  }

  const link = document.createElement('a');
  link.download = 'pampouks-tactics-board.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}
