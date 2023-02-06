import { DMP } from 'models/__helpers/helpers';
import { ILaunchAddRequest, Launch } from 'types/launches.types';
import launchesModel from './launches.mongo';

const getLastFlightNumber = async () => {
  const DEFAULT_FLIGHT_NUMBER = 100;
  const lastLaunch = await launchesModel.findOne().sort('-flightNumber');

  return lastLaunch?.flightNumber || DEFAULT_FLIGHT_NUMBER;
};

const add = async (launch: ILaunchAddRequest) => {
  const lastFlightNumber = await getLastFlightNumber();

  const launchData = {
    ...launch,
    flightNumber: lastFlightNumber + 1,
  };

  const newLaunch = new Launch(launchData);

  await launchesModel.updateOne(
    {
      flightNumber: newLaunch.flightNumber,
    },
    newLaunch,
    {
      upsert: true,
    }
  );

  return newLaunch;
};

const get = () => launchesModel.find({}, DMP).sort('flightNumber');

const abort = (flightNumber: number) => {
  return launchesModel.updateOne(
    { flightNumber },
    {
      upcoming: false,
      success: false,
    }
  );
};

export default {
  get,
  add,
  abort,
};
