import CompaniesController from '@controllers/CompaniesController';
import { Router } from 'express';

const routes = Router();

const companiesController = new CompaniesController();

routes.get('/companies', companiesController.index);
routes.get('/companies/:id', companiesController.show);
routes.post('/companies', companiesController.create);
routes.put('/companies/:id', companiesController.update);
routes.delete('/companies/:id', companiesController.delete);

export default routes;
