import launches from 'models/launches/launches.model';
import Responder from 'routes/__helpers/Responder';
import { RouterController } from 'types/common.types';
import { ILaunch, ILaunchAddRequest, Launch } from 'types/launches.types';
import { httpAddNewLaunch_v } from './launches.validation';

const httpGetLaunches: RouterController<ILaunch[]> = (req, res) => {
  return Responder.success(res, launches);
};

const httpAddNewLaunch: RouterController<
  ILaunch,
  Partial<ILaunchAddRequest>
> = (req, res) => {
  const body = httpAddNewLaunch_v(req.body);

  const newLaunch = new Launch({
    ...body,
    flightNumber: launches[launches.length - 1]?.flightNumber + 1 || 100,
  });

  launches.push(newLaunch);
  Responder.success(res, newLaunch, 201);
};

const httpAbortLaunch: RouterController<ILaunch> = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return Responder.fail(res, ['Invalid request']);

  const abortedLaunch = launches.find((item) => item.flightNumber === id);
  if (!abortedLaunch) return Responder.fail(res, ['The launch is not found']);

  abortedLaunch.success = false;
  abortedLaunch.upcoming = false;

  return Responder.success(res, abortedLaunch);
};

export default {
  httpGetLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
