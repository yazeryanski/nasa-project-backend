import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

import { IPlanet, IPlanetCSV } from "types/planets.types";
import DataAccessService from "./common/DataAccess.servcie";
import planetsModel from "models/planets.model";
import { __rootdir } from 'settings';

export default class Planets {
  private data: DataAccessService<IPlanet>;

  constructor() {
    this.data = new DataAccessService<IPlanet>(planetsModel)
  }

  initPlanets() {
    return new Promise<void>((res, rej) => {
      fs.createReadStream(
        path.join(__rootdir, 'data', 'kepler_data.csv')
      )
        .pipe(
          parse({
            comment: '#',
            columns: true,
          })
        )
        .on('data', async (data) => {
          if (this.isHabitablePlanet(data)) {
            await this.addPlanet(data.kepler_name)
          }
        })
        .on('error', (err) => {
          rej(err);
        })
        .on('end', async () => {
          const planetsCount = await (await planetsModel.find()).length
          console.log(`Founded ${planetsCount} habbitable planets`)
          res();
        });
    });
  }

  addPlanet(name: string) {
    return this.data.upsert({name}, {name})
  }

  findPlanet(name: string) {
    return this.data.findOne({ name })
  }
  
  private isHabitablePlanet(planet: IPlanetCSV) {
    return (
      planet['koi_disposition'] === 'CONFIRMED' &&
      +planet['koi_insol'] > 0.36 &&
      +planet['koi_insol'] < 1.11 &&
      +planet['koi_prad'] < 1.6
    );
  }
}