import { ILaunch } from 'types/launches.types';

const firstLaunch: ILaunch = {
  flightNumber: 100,
  mission: 'First Misson',
  rocket: 'Explorer IS1',
  customers: ['Yazeryan', 'NASA'],
  launchDate: new Date('December 27, 2030'),
  target: 'MARS',
  upcoming: true,
  success: true
}

const launches: ILaunch[] = [firstLaunch];


export default launches