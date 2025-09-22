export const pxToPt = (px: number): number | null =>
  !Number.isNaN(Number(px)) ? (px * 3) / 4 : null
