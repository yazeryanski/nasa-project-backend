import { IPlanet, Planet } from "models/planets/planets.class";
import { planets } from "models/planets/planets.model";
import { RouterController } from "types/common";

const getPlanets:RouterController<IPlanet[]> = (req, res) => {
  res.send({
    status: true,
    data: planets.planets
  })
}

const addPlanet:RouterController<IPlanet[], {name: string}> = (req, res) => {
  try {
    const {name} = req.body;
    if (!name) throw new Error('The property name is required');

    const updatedPlanets = planets.addPlanet( new Planet(name) )

    res.send({
      status: true,
      data: updatedPlanets
    })

  } catch(err: any) {
    console.log('ERROR: ', err);

    res.send({
      status: false,
      messages: [err.message]
    })
  }
}


const removePlanet:RouterController<IPlanet[], {id: string}> = (req, res) => {
  try {
    const {id} = req.params;
    if (!id) throw new Error('the property id is required');

    const updatedPlanets = planets.removePlanet( id );
    if (!updatedPlanets) throw new Error('the planet not found');

    res.send({
      status: true,
      data: updatedPlanets
    })

  } catch(err: any) {
    console.log('ERROR: ', err);

    res.send({
      status: false,
      messages: [err.message]
    })
  }
}

export default {
  getPlanets,
  addPlanet,
  removePlanet
}