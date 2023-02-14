import planetsModel from 'models/planets.model';
import { DEFAULT_PROJECTION } from 'models/__helpers/helpers';
import Responder from 'routes/__helpers/Responder';
import { RouterController } from 'types/common.types';
import { IPlanet } from 'types/planets.types';

const get: RouterController<IPlanet[]> = async (req, res) => {
  return Responder.success(res, await planetsModel.find({}, DEFAULT_PROJECTION) );
};

export default {
  get,
};
