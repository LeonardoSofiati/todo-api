import { Router, Request, Response } from "express";
import * as ApiController from '../controllers/apiController';

const router = Router();


router.get('/todo/:id', ApiController.specificTask)
router.get('/todo', ApiController.todo);
router.post('/todo', ApiController.addTask);
router.put('/todo', ApiController.changeTaks);
router.delete('/todo/:id', ApiController.deleteTask);


export default router;