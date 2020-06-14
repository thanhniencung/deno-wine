import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  signInHandler,
  signUpHandler,
  profileHandler,
} from "../controller/userController.ts";
import { jwtMiddleware } from "../middleware/jwtMiddleware.ts";
import {
  addWineHandler,
  wineCateHandler,
  wineDetailHandler,
  wineListHandler,
} from "../controller/wineController.ts";
import {
  addToCartHandler,
  checkoutHandler,
  shoppingCartHandler,
} from "../controller/orderController.ts";

const router = new Router();
router
  .post("/api/user/sign-in", signInHandler)
  .post("/api/user/sign-up", signUpHandler)
  .get("/api/user/profile", jwtMiddleware, profileHandler)
  .get("/api/wine/list", wineListHandler)
  .get("/api/wine/detail/:id", wineDetailHandler)
  .get("/api/wine/cate/:id", wineCateHandler)
  .post("/api/wine/add", jwtMiddleware, addWineHandler)
  .post("/api/order/add-to-cart/:wineId", jwtMiddleware, addToCartHandler)
  .get("/api/order/shopping-cart", jwtMiddleware, shoppingCartHandler)
  .post("/api/order/checkout", jwtMiddleware, checkoutHandler);

export default router;
