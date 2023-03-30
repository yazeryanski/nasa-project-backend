import mongoose from 'mongoose';
import { required } from './__helpers/mongoShorthands';

export interface ISettingsModel {
  key: string
  value: string
}

const scheme = new mongoose.Schema<ISettingsModel>({
  key: required(String),
  value: required(String)
});

export default mongoose.model<ISettingsModel>('Settings', scheme);
