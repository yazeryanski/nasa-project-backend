import dayjs from 'dayjs';
import { IHttpRequest } from 'services/HttpRequest.service';
import Settings from 'services/common/Settings.service';
import { ILaunch } from 'types/launches.types';
import Launches from '../Launches.service';
import { SpacexLaunch } from './SpaceX.types';
import dotenv from 'dotenv';
dotenv.config();

const SPACEX_SYNCH_INTERVAL_DAYS = Number(process.env.SPACEX_SYNCH_INTERVAL_DAYS) || 30

interface SpacexResponse {
  docs: SpacexLaunch[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
}

export default class SpacexService {
  private httpRequest: IHttpRequest;
  private LaunchesService: Launches;
  private SettingsService: Settings;

  constructor(httpRequest: IHttpRequest) {
    this.httpRequest = httpRequest;
    this.LaunchesService = new Launches();
    this.SettingsService = new Settings();
  }

  public async synchData() {
    try {
      const lastSync = await this.SettingsService.getLastSyncDate();
      const lastSyncDate = dayjs(lastSync);
      console.log('LAST SPACEX SYNC WAS: ', lastSync);
      
      if (!lastSyncDate.isValid())
        throw new Error('SpaceX sync: Invalid last sync date');
      if (dayjs().diff(lastSyncDate, 'day') >= SPACEX_SYNCH_INTERVAL_DAYS)
        throw new Error(`Spacex Sync, last was more than ${SPACEX_SYNCH_INTERVAL_DAYS} days ago`);
    } catch (err) {
      console.log('ERROR: ', err);

      await this.saveLaunches();
      await this.SettingsService.setLastSpacexSyncDate(dayjs().format());
    }
  }

  private async saveLaunches() {
    const launces = await this.getLaunches();
    const promises = launces.map((launch) => this.LaunchesService.add(launch));

    await Promise.all(promises);

    console.log(`Spacex Sync: saved ${launces.length} launches`);
  }

  private async getLaunches() {
    try {
      const response = await this.httpRequest.post<SpacexResponse>(
        'launches/query',
        {
          query: {},
          options: {
            pagination: false,
            populate: ['rocket', 'payloads'],
          },
        }
      );

      const result: SpacexLaunch[] = response.data?.docs || [];

      return this.mapResponseToLaunches(result);
    } catch (e) {
      console.log('Spacex Fetch ERROR:', e);
      return [];
    }
  }

  private mapResponseToLaunches(docs: SpacexLaunch[]): ILaunch[] {
    return docs.map<ILaunch>((launch) => {
      const customers = launch.payloads.flatMap(pload => pload.customers);
      return {
        mission: launch.name,
        flightNumber: launch.flight_number,
        launchDate: launch.date_utc,
        upcoming: launch.upcoming,
        success: launch.success,
        rocket: launch.rocket.name,
        customers,
        target: null,
      };
    });
  }
}
