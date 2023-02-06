import planetsModel from 'models/planets/planets.mongo';
import { DMP } from 'models/__helpers/helpers';
import Responder from 'routes/__helpers/Responder';
import { RouterController } from 'types/common.types';
import IPlanet from 'types/planets.types';

const getHttpPlanets: RouterController<IPlanet[]> = async (req, res) => {
  return Responder.success(res, await planetsModel.find({}, DMP) );
};

export default {
  getHttpPlanets,
};
