import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function listCategories(_request: Request, response: Response) {
  try {
    const categories = await Category.find();
    return response.json(categories);
  } catch (error) {
    console.error(error);
    return response.sendStatus(500);
  }
}
