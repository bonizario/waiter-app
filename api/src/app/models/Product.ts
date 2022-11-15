import { model, Schema } from 'mongoose';

export const Product = model(
  'Product',
  new Schema({
    name: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    imagePath: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    ingredients: {
      required: true,
      type: [
        {
          name: {
            required: true,
            type: String,
          },
          icon: {
            required: true,
            type: String,
          },
        },
      ],
    },
    category: {
      required: true,
      type: Schema.Types.String,
      ref: 'Category',
    },
  })
);
