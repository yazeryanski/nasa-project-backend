import { required } from "models/__helpers/mongoShorthands";
import mongoose from "mongoose";
import { ILaunch } from "types/launches.types";

const scheme = new mongoose.Schema<ILaunch>({
  flightNumber: required(Number),
  mission: required(String),
  customers: required([String]),
  launchDate: required(String),
  rocket: required(String),
  success: required(Boolean),
  target: String,
  upcoming: required(Boolean)
});

export default mongoose.model<ILaunch>('Launches', scheme);