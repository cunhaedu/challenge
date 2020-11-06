import { Router } from 'express';

import CompaniesController from '@controllers/CompaniesController';
import ProductsController from '@controllers/ProductsController';

const routes = Router();

const companiesController = new CompaniesController();
const productsController = new ProductsController();

routes.get('/companies', companiesController.index);
routes.get('/companies/:id', companiesController.show);
routes.post('/companies', companiesController.create);
routes.put('/companies/:id', companiesController.update);
routes.delete('/companies/:id', companiesController.delete);

routes.get('/products', productsController.index);
routes.get('/products/:id', productsController.show);
routes.post('/products', productsController.create);
routes.put('/products/:id', productsController.update);
routes.delete('/products/:id', productsController.delete);

export default routes;
