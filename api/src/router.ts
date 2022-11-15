import { Router } from 'express';

import { createCategories } from './app/useCases/categories/createCategories';
import { listCategories } from './app/useCases/categories/listCategories';

export const router = Router();

router.get('/categories', listCategories);

router.post('/categories', createCategories);

router.get('/products', (request, response) => {
  return response.send('OK!');
});

router.post('/products', (request, response) => {
  return response.status(201).send('OK!');
});

router.get('/categories/:categoryId/products', (request, response) => {
  return response.send('OK!');
});

router.get('/orders', (request, response) => {
  return response.send('OK!');
});

router.post('/orders', (request, response) => {
  return response.status(201).send('OK!');
});

router.patch('/orders/:id', (request, response) => {
  return response.status(204).send('OK!');
});

router.delete('/orders/:id', (request, response) => {
  return response.status(204).send('OK!');
});
