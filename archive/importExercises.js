import mongoose from 'mongoose';
import fs from 'fs';
import csvParser from 'csv-parser';
import GymExercise from './models/gymexercises.js';

const DB_NAME = "fitnation";
const MONGO_URI = "mongodb+srv://akashtayade346:AkAsh123@cluster0.ibxp3by.mongodb.net";
// MongoDB connection
const MONGO_URL = `${MONGO_URI}/${DB_NAME}`; // Replace with your Mongo URI



mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// CSV Import Logic
const results = [];
fs.createReadStream('megaGymDataset.csv') // Replace with your CSV filename
  .pipe(csvParser())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    try {
      // Optional: Clean old data first
      await GymExercise.deleteMany({});
      
      // Insert all records
      await GymExercise.insertMany(results);
      console.log('✅ All exercises imported successfully!', GymExercise);
    } catch (err) {
      console.error('🔥 Error inserting data:', err.message);
    } finally {
      mongoose.disconnect();
    }
  });
