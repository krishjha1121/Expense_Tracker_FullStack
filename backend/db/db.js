import mongoose from 'mongoose';

export const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Db Connected Succesfully✅');
    } catch (error) {
        console.log('DB Connection Error❌', error.message);
    }
};