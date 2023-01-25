import fs from 'fs';
import path from 'path';

import { v4 as uuid } from 'uuid';

import { ILaunch } from 'types/launches.types';

const firstLaunch: ILaunch = {
  flightNumber: 100,
  mission: 'First Misson',
  rocket: 'Explorer IS1',
  customer: ['Yazeryan', 'NASA'],
  launchDate: new Date('December 27, 2030'),
  destination: 'MARS',
  upcoming: true,
  success: true
}

const launches: ILaunch[] = [firstLaunch];


export default launches