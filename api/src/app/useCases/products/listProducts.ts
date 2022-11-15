import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function listProducts(_request: Request, response: Response) {
  try {
    const products = await Product.find();
    return response.json(products);
  } catch (error) {
    console.error(error);
    return response.sendStatus(500);
  }
}
