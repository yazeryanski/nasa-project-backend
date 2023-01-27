import { planets } from 'models/planets/planets.model';
import Responder from 'routes/__helpers/Responder';
import { RouterController } from 'types/common.types';
import IPlanet from 'types/planets.types';

const getHttpPlanets: RouterController<IPlanet[]> = (req, res) => {
  return Responder.success(res, planets);
};

export default {
  getHttpPlanets,
};
