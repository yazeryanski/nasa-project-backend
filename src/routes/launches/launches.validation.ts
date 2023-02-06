import dayjs from 'dayjs';
import { ILaunchAddRequest } from 'types/launches.types';

const getValidBody = (body: Partial<ILaunchAddRequest>) => {
  if (!body.mission || !body.target || !body.launchDate || !body.rocket)
    throw 'Invalid Params';

  if (!dayjs(body.launchDate).isValid())
    throw 'The launchDate property is invalid';

  return body as ILaunchAddRequest;
};

export default {
  getValidBody
}