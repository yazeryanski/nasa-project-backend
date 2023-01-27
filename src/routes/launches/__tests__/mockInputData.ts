import { ILaunchAddRequest } from "types/launches.types"

export const inputForAdding:ILaunchAddRequest = { 
  mission: 'Some mission',
  launchDate: '12 feb 2000',
  rocket: 'Some Rocket',
  target: 'Some planet'
}

export const inputForAddingWithoutDate:Omit<ILaunchAddRequest, 'launchDate'> = { 
  mission: 'Some mission',
  rocket: 'Some Rocket',
  target: 'Some planet'
}

export const inputForAddingWithInvalidDate:ILaunchAddRequest = { 
  mission: 'Some mission',
  launchDate: 'INVALID',
  rocket: 'Some Rocket',
  target: 'Some planet'
}

export const inputForAddingWithMissingProps:Omit<ILaunchAddRequest, 'mission'> = { 
  launchDate: 'INVALID',
  rocket: 'Some Rocket',
  target: 'Some planet'
}