import express from "express";

import {

  placeOrder,
  getMyOrders,
  getOrderDetails,
  getAdminOrders,
  processOrder,
  placeOrderOnline,
  paymentVerification
 
} from "../controllers/order.js";
import {  isAuthenticated ,authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createorder", isAuthenticated,placeOrder);
router.post("/createorderonline", isAuthenticated, placeOrderOnline);
router.get("/myorders" ,isAuthenticated,getMyOrders);


router.get("/orders/:id",isAuthenticated,getOrderDetails)
router.post("/paymentverification", isAuthenticated, paymentVerification);

// Add Admin Middleware
router.get("/admin/orders", isAuthenticated, authorizeAdmin, getAdminOrders);
router.get("/admin/order/:id", isAuthenticated, authorizeAdmin, processOrder);




export default router;
