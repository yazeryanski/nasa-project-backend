import { DateType } from './common.types';

export interface ILaunch {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: DateType;
  destination: string;
  customer: string[];
  upcoming: boolean;
  success: boolean;
}

export type ILaunchAddRequest = Pick<
  ILaunch,
  'mission' | 'destination' | 'rocket' | 'launchDate'
>;

interface LaunchConstructorOps extends ILaunchAddRequest {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: DateType;
  destination: string;
}

// Classes
export class Launch implements ILaunch {
  public flightNumber: number;
  public mission: string;
  public rocket: string;
  public launchDate: DateType;
  public destination: string;
  public customer: string[];
  public success: boolean;
  public upcoming: boolean;

  constructor(options: LaunchConstructorOps) {
    this.mission = options.mission;
    this.rocket = options.rocket;
    this.destination = options.destination;
    this.launchDate = options.launchDate;
    this.flightNumber = options.flightNumber;
    (this.customer = ['Yazeryan', 'NASA', 'NATO']),
      (this.success = true),
      (this.upcoming = false);
  }
}
