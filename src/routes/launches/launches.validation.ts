import dayjs from 'dayjs';
import Planets from 'services/Planets.service';
import { ILaunchAddRequest } from 'types/launches.types';

const getValidBody = async (body: Partial<ILaunchAddRequest>) => {
  if (!body.mission || !body.target || !body.launchDate || !body.rocket)
    throw 'Invalid Params';

  if (await isTargetInvalid(body.target) ) 
    throw 'The target planet is not habbitable';


  if (!dayjs(body.launchDate).isValid())
    throw 'The launchDate property is invalid';

  return body as ILaunchAddRequest;
};


async function isTargetInvalid(target: string) {
  const isPlanetExist = await new Planets().findPlanet(target);
  
  return isPlanetExist == null;
}

export default {
  getValidBody
}