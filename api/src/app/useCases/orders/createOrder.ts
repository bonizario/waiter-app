import { Request, Response } from 'express';

import { io } from '../../../server';
import { Order } from '../../models/Order';

export async function createOrder(request: Request, response: Response) {
  try {
    const { products, table } = request.body;
    const order = await Order.create({ products, table });
    const orderDetails = await order.populate('products.product');
    io.emit('orders@new', orderDetails);
    return response.status(201).json(order);
  } catch (error) {
    console.error(error);
    return response.sendStatus(500);
  }
}
