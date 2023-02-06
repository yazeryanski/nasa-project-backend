import mongoose from 'mongoose';


export const setDbConnection = () => {
  mongoose.set('strictQuery', false);

  mongoose.connect(
    'mongodb+srv://root:Kz91LnYv9qEalPGx@cluster0.e6s9gkd.mongodb.net/?retryWrites=true&w=majority',
  );
}

