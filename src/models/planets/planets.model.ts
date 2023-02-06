import fs from 'fs';
import path from 'path';

import { parse } from 'csv-parse';

import IPlanet from 'types/planets.types';
import planetsModel from './planets.mongo';

export function loadPlanets(): Promise<void> {
  return new Promise((res, rej) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanet(data.kepler_name)
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

function isHabitablePlanet(planet: IPlanet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    +planet['koi_insol'] > 0.36 &&
    +planet['koi_insol'] < 1.11 &&
    +planet['koi_prad'] < 1.6
  );
}

function savePlanet(planet: string) {
  return planetsModel.updateOne({
    name: planet
  }, {
    name: planet,
  }, {
    upsert: true
  });
}