import mongoose from 'mongoose';

export interface IPlanet {
  name: string;
}

const scheme = new mongoose.Schema<IPlanet>({
  name: {
    type: String,
    require: true,
  },
});

export default mongoose.model<IPlanet>('Planets', scheme);
