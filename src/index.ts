import App from './app';
import UserController from './api/v1/users/user.controller'
import CoffeeController from './api/v1/coffees/coffe.controller'
import OrderController from './api/v1/orders/order.controller'
import AuthController from './api/v1/auth/auth.controller'

const app = new App([new UserController(), new CoffeeController(), new OrderController(), new AuthController()]);
app.listen();
