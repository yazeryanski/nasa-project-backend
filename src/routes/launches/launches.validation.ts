import dayjs from 'dayjs';
import planetsModel from 'models/planets/planets.mongo';
import { ILaunchAddRequest } from 'types/launches.types';

const getValidBody = async (body: Partial<ILaunchAddRequest>) => {
  if (!body.mission || !body.target || !body.launchDate || !body.rocket)
    throw 'Invalid Params';

  if (await !isTargetValid(body.target) ) 
    throw 'The target planet is not habbitable';


  if (!dayjs(body.launchDate).isValid())
    throw 'The launchDate property is invalid';

  return body as ILaunchAddRequest;
};


const isTargetValid = async (target: string) => {
  const isPlanetExist = await planetsModel.findOne({name: target});

  return isPlanetExist !== null;
}

export default {
  getValidBody
}