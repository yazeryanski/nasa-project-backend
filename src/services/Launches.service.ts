import launchesModel from 'models/launches.model';
import { DEFAULT_PROJECTION } from 'models/__helpers/helpers';
import DataAccessService from 'services/DataAccess.servcie';
import {
  ILaunch,
  ILaunchAddRequest,
  ILaunchConstructorOps,
  Launch,
} from 'types/launches.types';

export default class Launches {
  private data: DataAccessService<ILaunch>;

  constructor() {
    this.data = new DataAccessService<ILaunch>(launchesModel);
  }

  async getLastFlightNumber() {
    const DEFAULT_FLIGHT_NUMBER = 100;
    const lastLaunch = await this.data.findOne().sort('-flightNumber');

    return lastLaunch?.flightNumber || DEFAULT_FLIGHT_NUMBER;
  }

  async add(launch: ILaunch | ILaunchAddRequest) {
    // If flightNumber are not exist we should give an auto incremented value
    const flightNumber =
      'flightNumber' in launch
        ? launch.flightNumber
        : await this.getLastFlightNumber();

    const launchWithFlightNumber: ILaunchConstructorOps = {
      ...launch,
      flightNumber: flightNumber,
    };

    const newLaunch = new Launch(launchWithFlightNumber)

    const response = await this.data.create(newLaunch);
    return response
  }

  getAll() {
    return this.data.find({}, DEFAULT_PROJECTION, { lean: true }, 'flightNumber');
  }

  abort(flightNumber: number) {
    return this.data.updateOne(
      {
        flightNumber,
      },
      {
        upcoming: false,
        success: false,
      }
    );
  }
}
