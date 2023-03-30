import { DateType } from './common.types';

export interface ILaunch {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: DateType;
  target: string | null;
  customers: string[];
  upcoming: boolean;
  success: boolean;
}

export type ILaunchAddRequest = Pick<
  ILaunch,
  'mission' | 'target' | 'rocket' | 'launchDate'
>;

export interface ILaunchConstructorOps {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: DateType;
  target: string | null;
  customers?: string[];
  success?: boolean;
  upcoming?: boolean;
}

// Classes
export class Launch implements ILaunch {
  public flightNumber: number;
  public mission: string;
  public rocket: string;
  public launchDate: DateType;
  public target: string | null;
  public customers: string[];
  public success: boolean;
  public upcoming: boolean;

  private DEFAULT_COSTUMERS = ['Yazeryan', 'NASA', 'NATO'];

  constructor(options: ILaunchConstructorOps) {
    this.mission = options.mission;
    this.rocket = options.rocket;
    this.target = options.target || null;
    this.launchDate = options.launchDate;
    this.flightNumber = options.flightNumber;
    this.customers =  options.customers ?? this.DEFAULT_COSTUMERS;
    this.success = options.success ?? false;
    this.upcoming = options.upcoming ?? true;
  }
}
