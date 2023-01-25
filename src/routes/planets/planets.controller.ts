import { planets } from "models/planets/planets.model";
import Responder from "routes/__helpers/Responder";
import { RouterController } from "types/common.types";
import IPlanet from "types/planets.types";

const getHttpPlanets:RouterController<IPlanet[]> = (req, res) => {
  try {
    if (!planets.length) throw new Error('Planets are empty');

    return Responder.success(res, planets);
  } catch (err: any) {
    console.error(err);

    return Responder.fail(res, [err.message]);
  }
}

export default {
  getHttpPlanets,
}