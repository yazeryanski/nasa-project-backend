import fs from 'fs';
import path from 'path';

import { parse } from 'csv-parse';

import IPlanet from 'types/planets';

export const planets: IPlanet[] = [];

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
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          planets.push(data);
        }
      })
      .on('error', (err) => {
        rej(err);
      })
      .on('end', () => {
        console.log('Planets data successfully parsed')
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
