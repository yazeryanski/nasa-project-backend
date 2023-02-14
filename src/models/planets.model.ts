import mongoose from 'mongoose';
import { IPlanet } from 'types/planets.types';

const scheme = new mongoose.Schema<IPlanet>({
  name: {
    type: String,
    require: true,
  },
});

export default mongoose.model<IPlanet>('Planets', scheme);
