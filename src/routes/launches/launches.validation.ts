import dayjs from 'dayjs';
import { ILaunchAddRequest } from 'types/launches.types';

export const httpAddNewLaunch_v = (body: Partial<ILaunchAddRequest>) => {
  console.log(body)
  if (!body.mission || !body.target || !body.launchDate || !body.rocket)
    throw new Error('Invalid params');

  if (!dayjs(body.launchDate).isValid())
    throw new Error('The launchDate property is invalid');

  return body as ILaunchAddRequest;
};
