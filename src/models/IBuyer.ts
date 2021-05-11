import {IState} from 'models/IState';
import {ICity} from 'models/ICity';

export interface IBuyer {
  ID: number;
  Name: string;
  ABN: string;
  Logo: string;
  Description?: string;
  State_ID: number;
  State?: IState;
  City_ID: number;
  City?: ICity;
  CreatedAt: string;
  UpdatedAt?: string;
  DeletedAt?: string;
}
