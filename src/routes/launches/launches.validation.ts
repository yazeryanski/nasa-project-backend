import dayjs from 'dayjs';
import { ILaunchAddRequest } from 'types/launches.types';

export const httpAddNewLaunch_v = (body: Partial<ILaunchAddRequest>) => {
  if (!body.mission || !body.destination || !body.launchDate || !body.rocket)
    throw new Error('Invalid params');

  if (!dayjs(body.launchDate).isValid())
    throw new Error('The launchDate property is invalid');

  return body as ILaunchAddRequest;
};
