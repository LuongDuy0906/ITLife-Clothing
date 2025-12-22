import express from 'express';
import {allOrders, placeOrder, updateOrderStatus, userOrders} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);

orderRouter.post('/place', authUser, placeOrder);

orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;
