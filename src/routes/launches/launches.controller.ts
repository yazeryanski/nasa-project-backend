import dayjs from 'dayjs';

import launches from 'models/launches/launches.model';
import Responder from 'routes/__helpers/Responder';
import { RouterController } from 'types/common.types';
import { ILaunch, ILaunchAddRequest, Launch } from 'types/launches.types';
import { httpAddNewLaunch_v } from './launches.validation';

const httpGetLaunches: RouterController<ILaunch[]> = (req, res) => {
  try {
    if (!launches.length) throw new Error('Launches are empty');

    return Responder.success(res, launches);
  } catch (err: any) {
    console.error(err);

    return Responder.fail(res, [err.message]);
  }
};

const httpAddNewLaunch: RouterController<ILaunch, Partial<ILaunchAddRequest>> = (req, res) => {
  try {
    const body = httpAddNewLaunch_v(req.body);
    
    const newLaunch = new Launch({
      ...body,
      flightNumber: launches[launches.length - 1]?.flightNumber + 1 || 100
    })

    launches.push(newLaunch);
    Responder.success(res, newLaunch, 201)
  } catch (err: any) {
    console.error(err);

    return Responder.fail(res, [err.message]);
  }
}

export default {
  httpGetLaunches,
  httpAddNewLaunch
};
