import { Router } from 'express';

import ClientsController from '@controllers/ClientsController';
import ProductsController from '@controllers/ProductsController';
import BudgetsController from '@controllers/BudgetsController';

const routes = Router();

const clientsController = new ClientsController();
const productsController = new ProductsController();
const budgetsController = new BudgetsController();

routes.get('/clients', clientsController.index);
routes.get('/clients/:id', clientsController.show);
routes.post('/clients', clientsController.create);
routes.put('/clients/:id', clientsController.update);
routes.delete('/clients/:id', clientsController.delete);

routes.get('/products', productsController.index);
routes.get('/products/:id', productsController.show);
routes.post('/products', productsController.create);
routes.put('/products/:id', productsController.update);
routes.delete('/products/:id', productsController.delete);

routes.get('/budgets', budgetsController.index);
routes.get('/budgets/:id', budgetsController.show);
routes.post('/budgets', budgetsController.create);

export default routes;
