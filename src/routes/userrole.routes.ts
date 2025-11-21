import express from "express";
import { assignRolesController, } from "../controllers/userrole.controller";
import { createRoleController,} from "../controllers/rolesController";

const router = express.Router();

router.post("/create", createRoleController);   // create role
router.post("/assign", assignRolesController);  // assign role to user

export default router;
