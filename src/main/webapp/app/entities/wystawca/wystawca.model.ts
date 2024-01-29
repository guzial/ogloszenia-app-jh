import { IUser } from 'app/entities/user/user.model';

export interface IWystawca {
  id: number;
  nazwa?: string | null;
  kontakt?: string | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewWystawca = Omit<IWystawca, 'id'> & { id: null };
