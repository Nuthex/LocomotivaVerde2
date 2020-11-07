export interface Treno {
  id?: number;
  origine: string;
  destinazione: string;
  corsa: number;
  partenza: Date;
  arrivo: Date;
  diretto: boolean;
  postidisponibili: number;
}
