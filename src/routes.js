import { Router } from 'express';
import userController from './app/controllers/UserControllers';
import sessionController from './app/controllers/SessionController'
import productsController from './app/controllers/ProductsController'

const routes = new Router();

routes.post('/users', userController.store)
routes.post('/sessions', sessionController.store)
routes.post('/products', productsController.store)

export default routes;
