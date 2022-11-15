import { model, Schema } from 'mongoose';

export const Category = model(
  'Category',
  new Schema({
    name: {
      required: true,
      type: String,
    },
    icon: {
      required: true,
      type: String,
    },
  })
);
