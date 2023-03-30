import { Dayjs } from "dayjs";
import settingsModel from "models/settings.model";
import { DateType } from "types/common.types";
import { ISettings } from "types/settings.type";
import DataAccessService from "./DataAccess.servcie";

export default class Settings {
  private model: DataAccessService;
  
  constructor() {
    this.model = new DataAccessService(settingsModel);
  }

  getLastSyncDate() {
    return this.model.findOne({key: 'LAST_SPACEX_SYNCH'})
    .then(result => {
      return result ? result.value : null;
    })
    .catch(() => {
      return null;
    })
  }

  setLastSpacexSyncDate(date: DateType) {
    return this.model.upsert({
      key: 'LAST_SPACEX_SYNCH'
    }, {
      key: 'LAST_SPACEX_SYNCH',
      value: date,
    })
  }
}