export interface IGrupaTagow {
  id: number;
  nazwaGrupy?: string | null;
}

export type NewGrupaTagow = Omit<IGrupaTagow, 'id'> & { id: null };
