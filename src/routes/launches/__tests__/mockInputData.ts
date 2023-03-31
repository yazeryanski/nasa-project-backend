import { ILaunchAddRequest } from 'types/launches.types';

export const inputForAdding: ILaunchAddRequest = {
  mission: 'Some mission',
  launchDate: '12 feb 2000',
  rocket: 'Some Rocket',
  target: 'Kepler-62 f',
};

export const inputForAddingWithoutDate =
  {
    mission: 'Some mission',
    rocket: 'Some Rocket',
    target: 'Some planet',
    acknowledged: true,
    matchedCount: 1,
    modifiedCount: 1,
    upsertedCount: 0,
    upsertedId: null,
  };

export const inputForAddingWithInvalidDate: ILaunchAddRequest = {
  mission: 'Some mission',
  launchDate: 'INVALID',
  rocket: 'Some Rocket',
  target: 'Kepler-62 f',
};

export const inputForAddingWithMissingProps: Omit<
  ILaunchAddRequest,
  'mission'
> = {
  launchDate: 'INVALID',
  rocket: 'Some Rocket',
  target: 'Some planet',
};
