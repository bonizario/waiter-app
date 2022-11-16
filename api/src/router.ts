import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';

import { createCategories } from './app/useCases/categories/createCategories';
import { listCategories } from './app/useCases/categories/listCategories';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { createProduct } from './app/useCases/products/createProducts';
import { listProducts } from './app/useCases/products/listProducts';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(_request, _file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(_request, file, callback) {
      callback(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

router.get('/categories', listCategories);

router.get('/categories/:categoryId/products', listProductsByCategory);

router.post('/categories', createCategories);

router.get('/products', listProducts);

router.post('/products', upload.single('image'), createProduct);

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
