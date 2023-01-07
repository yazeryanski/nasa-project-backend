import { planets } from "models/planets/planets.model";
import { RouterController } from "types/common";
import IPlanet from "types/planets";

const getPlanets:RouterController<IPlanet[]> = (req, res) => {
  res.send({
    status: true,
    data: planets
  })
}

export default {
  getPlanets,
}