import { v4 as uuid } from 'uuid';

// Interfaces
export interface IPlanet {
  name: string;
  id: string;
}

export interface IPlanetsList {
  planets: IPlanet[],
  addPlanet: (planet: IPlanet) => IPlanet[],
  removePlanet: (id: string) => IPlanet[] | false;
}


// Implementation
export class Planet implements IPlanet {
  public name: string;
  public id: string;

  constructor(name: string) {
    this.name = name;
    this.id = uuid();
  }
}

export class PlanetsList implements IPlanetsList {
  public planets: IPlanet[];
  
  constructor(initialPlanets?: IPlanet[]) {
    this.planets = initialPlanets || [];
  }

  addPlanet(planet: IPlanet) {
    try {
      this.planets = [...this.planets, planet];
      return this.planets;
    } catch(e) {
      console.log('ERROR', e);
      return this.planets;
    }
  };

  removePlanet(id: string) {
    try {
      let hasFound = false;
      this.planets = this.planets.filter(planet => {
        if (planet.id === id) {
          hasFound = true;
          // Return false to skip founded item
          return false
        }

        return true;
      })

      return hasFound ? this.planets : false;
    } catch(e) {
      console.log('ERROR', e);
      return false;
    }
  }
}