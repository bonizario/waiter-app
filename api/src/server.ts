import express from 'express';
import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log('Connected to MongoDB successfully');
    const app = express();
    const PORT = 3333;

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(() => console.log('Error connecting to MongoDB'));
