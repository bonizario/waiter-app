import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function createProduct(request: Request, response: Response) {
  try {
    const imagePath = request.file?.filename;
    const { name, description, price, category, ingredients } = request.body;
    const product = await Product.create({
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });
    return response.status(201).json(product);
  } catch (error) {
    console.error(error);
    return response.sendStatus(500);
  }
}
