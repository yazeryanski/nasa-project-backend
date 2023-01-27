import dayjs from 'dayjs';
import { ILaunchAddRequest } from 'types/launches.types';

export const httpAddNewLaunch_v = (body: Partial<ILaunchAddRequest>) => {
  if (!body.mission || !body.target || !body.launchDate || !body.rocket)
    throw 'Invalid Params';

  if (!dayjs(body.launchDate).isValid())
    throw 'The launchDate property is invalid';

  return body as ILaunchAddRequest;
};
