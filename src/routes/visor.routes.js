import { Router } from "express";
import {
  //renderVisorForm,
  renderVisor,
 
} from "../controllers/visor.controller.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();
//  
router.get("/visor", isAuthenticated, renderVisor);

export default router;
