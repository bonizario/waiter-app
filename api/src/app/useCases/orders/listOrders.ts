import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function listOrders(_request: Request, response: Response) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: 1 })
      .populate('products.product');
    return response.json(orders);
  } catch (error) {
    console.error(error);
    return response.sendStatus(500);
  }
}
